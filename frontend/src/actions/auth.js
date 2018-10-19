import { RSAA } from 'redux-api-middleware';

export const LOGIN_REQUEST = '@@auth/LOGIN_REQUEST';
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS';
export const LOGIN_FAILURE = '@@auth/LOGIN_FAILURE';
export const TOKEN_REQUEST = '@@auth/TOKEN_REQUEST';
export const TOKEN_RECEIVED = '@@auth/TOKEN_RECEIVED';
export const TOKEN_FAILURE = '@@auth/TOKEN_FAILURE';


export const login = (username, passoword) => ({
    [RSAA]: {
        endpoint: 'api/auth/token/obtain/',
        method: 'POST',
        body: JSON.stringify({username, passoword}),
        headers: {'Content-Type': 'application/json'},
        types: [
            LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
        ]
    }
});

export const refreshAccessToken = (token) => ({
    [RSAA]: {
        endpoint: 'api/auth/token/refresh/',
        method: 'POST',
        body: JSON.stringify({refresh: token}),
        headers: {'Content-Type': 'application/json'},
        types: [
            TOKEN_REQUEST, TOKEN_RECEIVED, TOKEN_FAILURE
        ]

    }
});


export function accessToken(state) {
    if (state.access) {
        return  state.access.token
    }
}

export function refreshToken(state) {
    if (state.refresh) {
        return  state.refresh.token
    }
}

export function isAccessTokenExpired(state) {
  if (state.access && state.access.exp) {
    return 1000 * state.access.exp - (new Date()).getTime() < 5000
  }
  return true
}
export function isRefreshTokenExpired(state) {
  if (state.refresh && state.refresh.exp) {
    return 1000 * state.refresh.exp - (new Date()).getTime() < 5000
  }
  return true
}
export function isAuthenticated(state) {
  return !isRefreshTokenExpired(state)
}
export function errors(state) {
   return  state.errors
}


