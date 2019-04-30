export default class AuthAdapter {
  static login (loginParams) {
    return fetch(`http://localhost:3000/user_token`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static currentUser () {
    return fetch(`${APIURL()}/cu`, {
      headers: headers()
    }).then(res => res.json())
  }
}