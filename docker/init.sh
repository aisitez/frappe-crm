#!/bin/bash
set -e

BENCH_DIR="/home/frappe/frappe-bench"

# Configure yarn to avoid IPv6 issues
yarn config set registry https://registry.npmjs.org
yarn config set network-timeout 300000
yarn config set network-concurrency 1

# Check if bench is fully valid (has site config = completed init)
if [ -f "$BENCH_DIR/sites/common_site_config.json" ] && [ -d "$BENCH_DIR/apps/frappe" ]; then
    echo "Valid bench found, ensuring node_modules..."
    cd "$BENCH_DIR"

    if [ ! -d "apps/frappe/node_modules/socket.io" ]; then
        echo "Installing frappe node_modules..."
        (cd apps/frappe && yarn install --check-files)
    fi

    if [ -d "apps/crm/frontend" ] && [ ! -d "apps/crm/frontend/node_modules" ]; then
        echo "Installing crm frontend node_modules..."
        (cd apps/crm/frontend && yarn install --check-files)
    fi

    exec bench start
fi

# Bench is missing or incomplete — start fresh
# Cannot rm the mount point itself, so clear its contents depth-first
if [ -d "$BENCH_DIR" ]; then
    echo "Clearing incomplete bench directory contents..."
    find "$BENCH_DIR" -mindepth 1 -delete 2>/dev/null || true
fi

# Fix ownership on the volume mount point so frappe user can write
sudo chown frappe:frappe "$BENCH_DIR" 2>/dev/null || chmod 777 "$BENCH_DIR" || true

echo "Creating new bench..."
bench init --skip-redis-config-generation --ignore-exist --frappe-branch version-15 frappe-bench

cd "$BENCH_DIR"

bench set-mariadb-host mariadb
bench set-redis-cache-host redis://redis:6379
bench set-redis-queue-host redis://redis:6379
bench set-redis-socketio-host redis://redis:6379

sed -i '/redis/d' ./Procfile
sed -i '/watch/d' ./Procfile

bench get-app crm --branch main

bench new-site crm.localhost \
    --force \
    --mariadb-root-password 123 \
    --admin-password admin \
    --no-mariadb-socket

bench --site crm.localhost install-app crm
bench --site crm.localhost set-config developer_mode 1
bench --site crm.localhost set-config mute_emails 1
bench --site crm.localhost set-config server_script_enabled 1
bench --site crm.localhost clear-cache

exec bench start
