import { LogLevel } from '@azure/msal-browser'

export const msalConfig = {
  auth: {
    clientId: '196167c0-9c9b-4d4c-9286-e66307cdf98f',
    authority: 'https://sentimentz.ciamlogin.com/',
    redirectUri: 'http://localhost:5173',
    postLogoutRedirectUri: '/',
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: number, message: string, containsPii: boolean) => {
        if (containsPii) return
        if (level === LogLevel.Error) console.error(message)
        if (level === LogLevel.Warning) console.warn(message)
      },
    },
  },
}

export const loginRequest = {
  scopes: ['openid', 'profile', 'email'],
}
