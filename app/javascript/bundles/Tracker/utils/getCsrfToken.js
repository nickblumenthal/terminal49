export function getCsrfToken() {
  let token, tokenElement;
  tokenElement = document.querySelector('meta[name="csrf-token"]');
  if(tokenElement) {
    return tokenElement.content
  }
  else {
    return ""
  }
}

// Ugly hack to not have to keep track of token state changes for login/logout
export function writeCsrfToken(newToken) {
  document.querySelector('meta[name="csrf-token"]').content = newToken;
}
