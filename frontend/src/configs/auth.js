export default {
  meEndpoint: 'http://192.168.1.6:8000/auth/check-token',
  loginEndpoint: 'http://192.168.1.6:8000/auth/login',
  registerEndpoint: 'http://192.168.1.6:8000/auth/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
