function set(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

function get(name, subst = null) {
  return JSON.parse(window.localStorage.getItem(name) || subst);
}

function del(name) {
  localStorage.removeItem(name);
}
