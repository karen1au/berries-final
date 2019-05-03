import cookie from 'react-cookies'
export default class Auth {
  static authenticateToken(token) {
    sessionStorage.setItem('token', token);
  }

  static setCookie(id){
    cookie.save('user_id', id, { path: '/' });    
  }

  static isUserAuthenticated() {
    return sessionStorage.getItem('token')
    
  }

  static deauthenticateToken() {
    sessionStorage.removeItem('token');
    cookie.remove('user_id', { path: '/' })
  }

  static getToken() {
    return sessionStorage.getItem('token');
  }

  static getCookie() {
    return cookie.load('user_id');
  }
}