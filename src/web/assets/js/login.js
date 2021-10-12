function $jq(seletor){
    return document.querySelector(seletor);
}
function loading(status) {
    var button = $jq('.input-submit');
    
    if (status){
        button.classList.add('loading');
    } else {
        button.classList.remove('loading');
    }
}
function alterMessage(_message) {
    var message = $jq('.message .message_res');
    
    if (_message !== undefined){
        message.textContent = _message;
        message.parentElement.classList.remove('display-none');
    } else {
        message.parentElement.classList.add('display-none');
    }
    
}
function sendForm(email, senha) {
    var xhr  = new XMLHttpRequest(),
        user = {email : email , senha : senha};
    
    
    xhr.onload = function(res){
        if (res){
            afterSend(JSON.parse(res.srcElement.responseText));
        }
    }
    xhr.open('post', 'https://newsletters.e-thinkers.com.br/user/login');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(user));
}
function validateForm(event) {
    event.preventDefault();
    
    var email = $jq('.input input[name="email"]').value,
        senha = $jq('.input input[name="senha"]').value;
    
        if (email === '' || senha === ''){
            alterMessage('Preencha todos os campos');
        } else {
            alterMessage();
            loading(true);
            sendForm(email, senha);
        }
}
function afterSend(res) {
    loading(false);
    
    if(res.logged){
        createSessionUser(res.KeyUser);
        window.location.href = '/';
    } else {
        alterMessage('Login Inválido');
    }
}

function createSessionUser(KeyUser) {
    sessionStorage.setItem('KeyUser' , KeyUser);
}