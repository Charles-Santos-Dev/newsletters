function $jq(seletor){
    return document.querySelector(seletor);
}

function $jqa(seletor){
    return document.querySelectorAll(seletor);
}

function requestUsers() {
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function(res){
        if (res){
            createModal();
            hideTds();
            loadUsers(res.srcElement.response);
        }
    }
    xhr.open('get', 'https://newsletters.e-thinkers.com.br/users/' + getKey());
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

window.onload = requestUsers;

function loadTrueAndFalse(field){
    var status;
    if (field){
        status = 'Sim';
    } else {
        status = 'Não';
    }
    
    return status;
}

function tdEdit(id) {
    return `<span class="step-one">
                <span class="edit-user" onclick="EditField(this)"><img src="../assets/images/note.png"></span>
            </span>
            <span class="step-two display-none">
                <span class="save" onclick="saveField(this,${id})"><img src="../assets/images/save.png"></span>
                <span class="cancel" onclick="cancelField(this,${id})"><img src="../assets/images/cancel.png"></span>
            </span>`;
}

function loadUsers(res) {
    var response = JSON.parse(res),
        tBody    = $jq('.tbody-users');
    
    tBody.innerHTML = '';
    
    response.forEach(function (usuario, indice) {
        var tr = document.createElement('tr');

        var td_id = document.createElement('td');
        td_id.textContent = usuario.id;
        tr.appendChild(td_id);
        
        var td_nome = document.createElement('td');
        var span_nome = document.createElement('span');
        span_nome.textContent = usuario.nome;
        td_nome.appendChild(span_nome);
        tr.appendChild(td_nome);
        
        var td_email = document.createElement('td');
        var span_email = document.createElement('span');
        span_email.textContent = usuario.email;
        td_email.appendChild(span_email);
        tr.appendChild(td_email);
        
        var td_senha = document.createElement('td');
        var span_senha = document.createElement('span');
        td_senha.setAttribute('class' , 'display-none');
        span_senha.textContent;
        td_senha.appendChild(span_senha);
        tr.appendChild(td_senha);
        
        var td_status = document.createElement('td');
        var span_status = document.createElement('span');
        span_status.textContent = loadTrueAndFalse(usuario.status);
        td_status.appendChild(span_status);
        tr.appendChild(td_status);
        
        var td_permissao = document.createElement('td');
        var span_permissao = document.createElement('span');
        span_permissao.textContent = loadTrueAndFalse(usuario.permissao);
        td_permissao.appendChild(span_permissao);
        tr.appendChild(td_permissao);
        
        var td_editar = document.createElement('td');
        td_editar.innerHTML = tdEdit(usuario.id);
        tr.appendChild(td_editar);
        
        if (usuario.lojas.length === 0){
            DeleteUser(td_editar, usuario.id);
        }
        
        var td_lojas = document.createElement('td');
        var selectLojas = document.createElement('select');
        usuario.lojas.forEach(function (loja) {
            var optionLoja = document.createElement('option');
            optionLoja.value = loja.nome;
            optionLoja.textContent = loja.nome;
            selectLojas.appendChild(optionLoja);
        });
        td_lojas.appendChild(selectLojas);
        tr.appendChild(td_lojas);
        
        tBody.appendChild(tr);
        
        tr.bgColor = (!(indice % 2))? '#dedede': '#ccc';
    });
}

function DeleteUser(td_editar, id) {
    var buttonDelete = document.createElement('span'),
        imgDelete    = document.createElement('img'),
        name         = td_editar.parentElement.querySelector('td span').textContent;
    
    buttonDelete.setAttribute('class' , 'delete-user');
    buttonDelete.setAttribute('onclick' , `openModal('<p>Deseja realmente Excluir ${name}?</p><div class="buttons-modal"><span class="yes" onclick="deleteUsers(${id})">Sim</span><span onclick="closeModal()">Não</span></div>')`);
    
    imgDelete.src = '../assets/images/trash.png';
    
    buttonDelete.appendChild(imgDelete);
    td_editar.querySelector('.step-one').appendChild(buttonDelete);
}

function showHideEditFields(buttonEdit) {
    var tds = buttonEdit.parentElement.parentElement.parentElement.querySelectorAll('td');
    
    tds.forEach(function (td, indice) {
        if(indice > 0 && indice < 6){
            if (buttonEdit.parentElement.classList.contains('step-one')){
                showTds();
                addInput(td, indice, document.querySelectorAll('.thead-users tr td')[indice].textContent);
            } else {
                hideTds();
                td.querySelector('span').classList.remove('display-none');
                td.querySelector('input').remove();
            }
        }
    });
}

function showTds() {
    $jqa('.table-uers td').forEach(function (td) {
        if (td.classList.contains('display-none')){
            td.classList.remove('display-none');
            td.setAttribute('hide' , true);
        }
    });
}

function hideTds() {
    $jqa('.table-uers td').forEach(function (td) {
        if(td.getAttribute('hide')){
            td.classList.add('display-none');
            td.removeAttribute('hide');
        }
    });
}

function addInput(td, indice, nome) {
    var input = document.createElement('input'),
        text  = td.textContent;
    
    td.querySelector('span').classList.add('display-none');
    
    input.value = text;
    input.name = nome.toLocaleLowerCase();
    
    td.appendChild(input);
    if (indice === 1){
        input.focus();
    }
    if (indice === 3){
        input.type = 'password';
        input.placeholder = 'senha';
    }
}

function changeButtons(buttonEdit) {
    var parent = buttonEdit.parentElement;
    
    if(parent.classList.contains('step-one')){
        parent.classList.add('display-none');
        parent.nextElementSibling.classList.remove('display-none');
    } else if(parent.classList.contains('step-two')){
        parent.previousElementSibling.classList.remove('display-none');
        parent.classList.add('display-none');
    }
}

function EditField(buttonEdit) {
    showHideEditFields(buttonEdit);
    changeButtons(buttonEdit);
}
function cancelField(buttonEdit) {
    showHideEditFields(buttonEdit);
    changeButtons(buttonEdit);
}

function saveField(buttonEdit, id) {
    var currenTR      = buttonEdit.parentElement.parentElement.parentElement,
        currentName   = currenTR.querySelector('td span').textContent,
        newName       = currenTR.querySelector('td input[name="nome"]').value,
        newEmail      = currenTR.querySelector('td input[name="email"]').value,
        newPassWord   = currenTR.querySelector('td input[name="senha"]').value,
        newStatus     = currenTR.querySelector('td input[name="ativo"]').value,
        newPermission = currenTR.querySelector('td input[name="admin"]').value,
        objectUser    = {id : id , name : newName , email : newEmail, password : newPassWord, status : newStatus, permission : newPermission};
    
    openModal(`<p>Alterar usuário ${currentName}?</p><div class="buttons-modal"><span class="yes" onclick='editAndSaveUser(${JSON.stringify(objectUser)})'>Sim</span><span onclick="closeModal()">Não</span></div>`);
}

function editAndSaveUser(objectUser) {
    if(objectUser.id === undefined){
        var method = 'post',
            url    = 'https://newsletters.e-thinkers.com.br/user/add/' + getKey(),
            body = {nome : objectUser.name , email : objectUser.email , senha : objectUser.password , status : objectUser.status , permissao : objectUser.permission};
    } else {
        var method = 'put',
            url    = 'https://newsletters.e-thinkers.com.br/user/edit/' + getKey(),
            body = {id: objectUser.id, nome : objectUser.name , email : objectUser.email , senha : objectUser.password , status : objectUser.status , permissao : objectUser.permission};
    }
        var xhrr = new XMLHttpRequest();
        
        if (objectUser.status.toLocaleLowerCase() === 'sim'){
            body.status = 1;
        } else {
            body.status = 0;
        }
        
        if (objectUser.permission.toLocaleLowerCase() === 'sim'){
            body.permissao = 1;
        } else {
            body.permissao = 0;
        }
        
        setTimeout(function(){
            requestUsers();
            closeModal();
            cancelNewUser();
        }, 500);
    
        xhrr.open(method, url);
        xhrr.setRequestHeader("Content-Type", "application/json");
        xhrr.send(JSON.stringify(body));
}

function addNewUser(buttonAdd) {
    if (buttonAdd.textContent === 'Adicionar'){
        $jq('.fields').classList.remove('display-none');
        $jq('.button.cancel').classList.remove('display-none');
        buttonAdd.textContent = 'Salvar';
        $jq('.fields input').focus();
    } else {
        checkFieldsSave();
    }
    buttonClick(buttonAdd);
}

function checkFieldsSave() {
    var save = true;
    
    $jqa('.fields input').forEach(function (input) {
        if(input.value === ''){
            save = false;
        }
    });
    if(save){
        var name       = $jq('.add-newuser .fields input[name="nome"]').value,
            email      = $jq('.add-newuser .fields input[name="email"]').value,
            password   = $jq('.add-newuser .fields input[name="senha"]').value,
            status     = $jq('.add-newuser .fields input[name="ativo"]').value,
            permission = $jq('.add-newuser .fields input[name="admin"]').value,
            objectUser = {name : name , email : email, password : password, status : status, permission : permission};
        
        openModal(`<p>Adicionar novo usuário?</p><div class="buttons-modal"><span class="yes" onclick='editAndSaveUser(${JSON.stringify(objectUser)})'>Sim</span><span onclick="closeModal()">Não</span></div>`);
    } else {
        openModal('<p style="margin-bottom: 15px;">Preencha todos os campos</p><span onclick="closeModal()">OK</span>');
    }
}

function cancelNewUser() {
    $jq('.button.cancel').classList.add('display-none');
    
    $jqa('.fields input').forEach(function (input) {
        input.value = '';
    });
    
    $jq('.fields').classList.add('display-none');
    $jq('.buttonadd').textContent = 'Adicionar';
}

function openModal(content){
    var modal 			= document.querySelector('.modal-back-ground'),
        childrenElement = document.querySelector('.modal-content');
    modal.classList.add('open');
    setTimeout(function(){
        childrenElement.classList.add('open');
    },10);
    if (typeof content === 'string') {
        childrenElement.innerHTML = content;
    } else {
        childrenElement.appendChild(content);
    }
}

function closeModal(){
    document.querySelector('.modal-back-ground').classList.remove('open');
    document.querySelector('.modal-content').classList.remove('open');
}

function createModal(){
    if ($jq('.modal-back-ground') === null){
        var modalBack 	   = document.createElement('div'),
            modalContent   = document.createElement('div');
        
        modalBack.setAttribute('class' , 'modal-back-ground');
        modalContent.setAttribute('class' , 'modal-content');
        
        modalBack.appendChild(modalContent);
        document.querySelector('body').appendChild(modalBack);
    }
}

function buttonClick(button) {
    button.classList.add('click');
    
    setTimeout(function () {
        button.classList.remove('click');
    },100);
}

function deleteUsers(id) {
    var xhr = new XMLHttpRequest();
    
        setTimeout(function () {
            requestUsers();
            closeModal();
        }, 500);
        
    xhr.open('delete', 'https://newsletters.e-thinkers.com.br/user/delete/' + id + '/' + getKey());
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}