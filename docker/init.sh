#!/bin/bash
set -e

BENCH_DIR="/home/frappe/frappe-bench"

# Stub yarn so bench init doesn't fail on npm network timeouts.
# node_modules are pre-copied into the volume by the host.
REAL_YARN=$(which yarn)
sudo mv "$REAL_YARN" "${REAL_YARN}.real" 2>/dev/null || true
sudo tee "$REAL_YARN" > /dev/null << 'STUB'
#!/bin/bash
echo "[yarn-stub] Skipping: yarn $@"
exit 0
STUB
sudo chmod +x "$REAL_YARN"

# Restore real yarn immediately — we only need the stub during bench init
restore_yarn() {
    sudo mv "${REAL_YARN}.real" "$REAL_YARN" 2>/dev/null || true
}

# Check if bench is already fully set up
if [ -f "$BENCH_DIR/sites/common_site_config.json" ] && [ -d "$BENCH_DIR/apps/frappe" ]; then
    echo "Valid bench found, starting..."
    restore_yarn
    cd "$BENCH_DIR"
    exec bench start
fi

# Start fresh — clear any incomplete bench
if [ -d "$BENCH_DIR" ]; then
    echo "Clearing incomplete bench directory contents..."
    find "$BENCH_DIR" -mindepth 1 -delete 2>/dev/null || true
fi

sudo chown frappe:frappe "$BENCH_DIR" 2>/dev/null || chmod 777 "$BENCH_DIR" || true

echo "Creating new bench..."
bench init --skip-redis-config-generation --skip-assets --ignore-exist --frappe-branch version-15 frappe-bench

cd "$BENCH_DIR"

bench set-mariadb-host mariadb
bench set-redis-cache-host redis://redis:6379
bench set-redis-queue-host "redis://redis:6379?health_check_interval=30"
bench set-redis-socketio-host redis://redis:6379

sed -i '/redis/d' ./Procfile
sed -i '/watch/d' ./Procfile
# Pin the dev server to the site so it works regardless of the Host header sent by the browser.
# bench --site is a global option (parent command), not a serve subcommand option.
sed -i 's|^web: bench serve|web: bench --site crm.localhost serve|' ./Procfile
# Wrap worker in a restart loop so a Redis idle-timeout (Docker NAT drops idle TCP
# connections after ~5 min) doesn't cascade-kill web + socketio via honcho.
sed -i 's|^worker:.*|worker: bash -c '"'"'while true; do bench worker; sleep 1; done'"'"' 1>> logs/worker.log 2>> logs/worker.error.log|' ./Procfile

# Link CRM app: /crm-src/crm/ contains hooks.py, modules.txt, fcrm/, api/, etc.
echo "Linking CRM app into bench apps..."
ln -sfn /crm-src/crm "$BENCH_DIR/apps/crm"

# Install CRM Python package (pyproject.toml is at repo root)
"$BENCH_DIR/env/bin/pip" install --quiet -e /crm-src

# Register CRM in bench apps list (printf ensures newline before crm)
printf '\ncrm\n' >> "$BENCH_DIR/sites/apps.txt"

echo "Creating site crm.localhost..."
bench new-site crm.localhost \
    --force \
    --mariadb-root-password 123 \
    --admin-password admin \
    --no-mariadb-socket

bench --site crm.localhost install-app crm
bench --site crm.localhost set-config developer_mode 1
bench --site crm.localhost set-config mute_emails 1
bench --site crm.localhost set-config server_script_enabled 1

# Brand: replace Frappe splash/favicon with SentimentAI logo
cp /crm-src/crm/public/images/logo.png "$BENCH_DIR/apps/frappe/frappe/public/images/frappe-framework-logo.png"
cp /crm-src/crm/public/images/logo.svg "$BENCH_DIR/apps/frappe/frappe/public/images/frappe-favicon.svg"
cp /crm-src/crm/public/images/logo.png "$BENCH_DIR/apps/frappe/frappe/public/images/frappe-logo.png"
bench --site crm.localhost mariadb --execute "INSERT INTO tabSingles (doctype,field,value) VALUES ('Website Settings','splash_image','/assets/crm/images/logo.svg') ON DUPLICATE KEY UPDATE value='/assets/crm/images/logo.svg'"

bench --site crm.localhost clear-cache

echo "Building Frappe frontend assets..."
bench build --app frappe --production

restore_yarn

echo "Setup complete — starting bench..."
exec bench start
