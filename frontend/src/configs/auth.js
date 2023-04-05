export default {
  meEndpoint: 'http://127.0.0.1:8000/auth/check-token',
  loginEndpoint: 'http://127.0.0.1:8000/auth/login',
  registerEndpoint: 'http://127.0.0.1:8000/auth/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
