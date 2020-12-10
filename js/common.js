function setStorage(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value));
}
  
function getStorage(name, subst = null) {
    return JSON.parse(window.localStorage.getItem(name) || subst);
}
  
function delStorage(name) {
    localStorage.removeItem(name);
}

function setPageKey(title, key){
    setStorage('keyPages', key);
    setStorage('titlePages', title);
}


function openFinInfo(){
    setPageKey(`Фінансова інформація`, '1F6QVr9WNio-_ODmnIlMTSHeSQxLOjgnd0nYB1_z0BeI');
    document.location.href = './page.html';
}
