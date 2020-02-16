import Cookies from 'js-cookie'

let inHalfADay = 0.5

const TokenKey = 'User-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, {
    expires: inHalfADay
  })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
