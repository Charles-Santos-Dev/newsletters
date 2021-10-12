function $jq(seletor){
    return document.querySelector(seletor);
}

function $jqa(seletor){
    return document.querySelectorAll(seletor);
}

function logout() {
    var xhr = new XMLHttpRequest(),
    ObjKeyUser = {KeyUser : getKey()};
    
    xhr.onload = function(res){
        if (res){
            clearSession();
            redirect('/login');
        }
    }
    xhr.open('post', `https://newsletters.e-thinkers.com.br/logout`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(ObjKeyUser));
}

function sessionUser() {
    var xhr        = new XMLHttpRequest(),
        ObjKeyUser = {KeyUser : getKey()};
    
    xhr.onload = function(res){
        var response = JSON.parse(res.srcElement.responseText);
        if (response){
            if (window.location.href.indexOf('admin') > -1 && !(response.permission)){
                redirect('/');
            } else {
                if(response.name){
                    currentUser(response.name);
                    $jq('body').classList.remove('display-none');
                } else {
                    clearSession();
                    redirect('/login');
                }
            }
        } else {
            redirect('/login');
        }
    }
    xhr.open('post', `https://newsletters.e-thinkers.com.br/sessionuser`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(ObjKeyUser));
}

setTimeout(function () {
    sessionUser();
}, 50);

function currentUser(res) {
    var response = res;
    $jq('.header-main .name-user').textContent = response;
}

function getKey() {
    var KeyUser = sessionStorage.getItem('KeyUser');
    
    return KeyUser;
}

function clearSession() {
    sessionStorage.removeItem('KeyUser');
}

function createSessionUser(KeyUser) {
    sessionStorage.setItem('KeyUser' , KeyUser);
}

function redirect(path) {
    window.location.href = path;
}