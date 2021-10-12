var _ALLUSERS;

function $jq(seletor){
    return document.querySelector(seletor);
}

function $jqa(seletor){
    return document.querySelectorAll(seletor);
}

function ShowStores() {
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function(res){
        if (res){
            createModal();
            loadStores(res.srcElement.response);
            loadFilterUsers(res.srcElement.response);
        }
    }
    xhr.open('get', 'https://newsletters.e-thinkers.com.br/admin/lojas/'+getKey());
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

window.onload = ShowStores;

function createDom(element) {
    var elementDom = document.createElement(element);
    
    return elementDom;
}

function loadTrueAndFalse(field){
    var status;
    if (field){
        status = 'Sim';
    } else {
        status = 'Não';
    }
    
    return status;
}

function getDateCreated(dateCreated) {
    return dateCreated.match(/\d{4}-\d{2}-\d{2}/g);
}
function EditField(buttonEdit) {
    showHideEditFields(buttonEdit);
    changeButtons(buttonEdit);
    selectChangeUsers(buttonEdit);
}

function cancelField(buttonEdit) {
    showHideEditFields(buttonEdit);
    changeButtons(buttonEdit);
    removeselectChangeUsers(buttonEdit);
}

var intervall = setInterval(function () {
    if (_ALLUSERS === undefined){
        getAllUsers();
    } else {
        clearInterval(intervall);
    }
},500);

function getAllUsers() {
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function(res){
        if (res){
            _ALLUSERS = res.srcElement.response;
        }
    }
    xhr.open('get', 'https://newsletters.e-thinkers.com.br/users/' + getKey());
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
};

function UsersAvaibled(buttonEdit) {
    var response = JSON.parse(_ALLUSERS),
        select   = buttonEdit.parentElement.parentElement.parentElement.querySelector('td select[name="user"]');
    
    response.forEach(function (user) {
        var option = createDom('option');
        option.value = user.id;
        option.textContent = user.nome;
        
        select.appendChild(option);
    });
}

function selectChangeUsers(buttonEdit) {
    var select   = createDom('select'),
        tdSelect = buttonEdit.parentElement.parentElement.parentElement.querySelector('td:nth-child(5)');
    
    select.setAttribute('name' , 'user');
    tdSelect.appendChild(select);
    tdSelect.querySelector('span').classList.add('display-none');
    UsersAvaibled(buttonEdit);
}

function removeselectChangeUsers(buttonEdit) {
    var span   = buttonEdit.parentElement.parentElement.parentElement.querySelector('td:nth-child(5) span'),
        select = buttonEdit.parentElement.parentElement.parentElement.querySelector('td:nth-child(5) select');
    
    span.classList.remove('display-none');
    select.remove();
}

function showHideEditFields(buttonEdit) {
    var tds = buttonEdit.parentElement.parentElement.parentElement.querySelectorAll('td');
    
    tds.forEach(function (td, indice) {
        if(indice > 1 && indice < 4){
            if (buttonEdit.parentElement.classList.contains('step-one')){
                addInput(td, indice, document.querySelectorAll('.thead-lojas tr td')[indice].textContent);
            } else {
                td.querySelector('span').classList.remove('display-none');
                td.querySelector('input').remove();
            }
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

function tdEdit(id) {
    return `<span class="step-one">
                <span class="edit-loja" onclick="EditField(this)"><img src="../assets/images/note.png"></span>
                <span class="edit-loja" onclick="checkDelete(${id})"><img src="../assets/images/trash.png"></span>
            </span>
            <span class="step-two display-none">
                <span class="save" onclick="checkField(this,${id})"><img src="../assets/images/save.png"></span>
                <span class="cancel" onclick="cancelField(this)"><img src="../assets/images/cancel.png"></span>
            </span>`;
}

function loadStores(res) {
    var response = JSON.parse(res),
        tBody = $jq('.tbody-lojas');
    
    tBody.innerHTML = '';
    
    response.forEach(function (loja, indice) {
        var tr = createDom('tr');
        
        var td_id   = createDom('td');
        
        td_id.textContent = loja.id;
        tr.appendChild(td_id);
        
        var td_criacao   = createDom('td'),
            span_criacao = createDom('span');
        
        span_criacao.textContent = getDateCreated(loja.createdAt);
        td_criacao.appendChild(span_criacao);
        tr.appendChild(td_criacao);
        
        var td_nome   = createDom('td'),
            span_nome = createDom('span');
        
        span_nome.textContent = loja.nome;
        td_nome.appendChild(span_nome);
        tr.appendChild(td_nome);
        
        var td_status   = createDom('td'),
            span_status = createDom('span');
        
        span_status.textContent = loadTrueAndFalse(loja.status);
        td_status.appendChild(span_status);
        tr.appendChild(td_status);
        
        var td_usuario   = createDom('td'),
            span_usuario = createDom('span');
        
        span_usuario.textContent = loja.usuario.nome;
        td_usuario.appendChild(span_usuario);
        tr.appendChild(td_usuario);
        
        var td_editar = createDom('td')
        td_editar.innerHTML = tdEdit(loja.id);
        tr.appendChild(td_editar);
        
        tBody.appendChild(tr);
        
        tr.bgColor = (!(indice % 2))? '#dedede': '#ccc';
    });
}

function loadFilterUsers(res) {
    response    = JSON.parse(res),
        arrayUsers  = [],
        selectUsers = $jq('.filter-users');
    
    selectUsers.querySelectorAll('option').forEach(function (option) {
        if (option.value !== ''){
            option.remove();
        }
    });
    
    response.forEach(function (loja) {
        if(arrayUsers.indexOf(loja.usuario.nome) < 0)
            arrayUsers.push(loja.usuario.nome);
    });
    
    var arrayFormated = arrayUsers.sort();
    
    arrayFormated.forEach(function (user) {
        var option = createDom('option');
        option.textContent = user;
        option.value = user;
        selectUsers.appendChild(option);
    });
}

function cleanFilter() {
    allTrs = $jqa('.tbody-lojas tr');
    
    allTrs.forEach(function (tr) {
        tr.classList.remove('display-none');
    });
}

function selectUser(select) {
    if(select.value !== ''){
        filterUsers(select.value);
    } else {
        cleanFilter();
    }
}

function filterUsers(valueFilter) {
    allspansUsers = $jqa('.tbody-lojas td:nth-child(5) span');
    
    cleanFilter();
    
    allspansUsers.forEach(function (span) {
        var trParent = span.parentElement.parentElement;
        
        if(span.textContent !== valueFilter)
            trParent.classList.add('display-none');
    });
}

function checkDelete(id) {
    openModal(`<p>Deseja realmente Excluir?</p><div class='buttons-modal'><span class='yes' onclick='deleteStore(${id})'>Sim</span><span onclick='closeModal()'>Não</span></div>`);
}

function deleteStore(id) {
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function(res){
        setTimeout(function () {
            closeModal();
            ShowStores();
        }, 300);
    }
    xhr.open('delete', 'https://newsletters.e-thinkers.com.br/loja/delete/'+id+'/'+getKey());
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
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

function updateStore(id, nome, status, usuario){
    var xhr = new XMLHttpRequest();
    
    var body = {id : id , nome : nome , status : status , usuario : usuario};
    
    xhr.onload = function (){
        setTimeout(function () {
            closeModal();
            ShowStores();
        }, 300);
    }
    
    xhr.open('put', 'https://newsletters.e-thinkers.com.br/admin/loja/edit/' + getKey());
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(body));
}

function checkField(buttonSave, id) {
    var currentTR   = buttonSave.parentElement.parentElement.parentElement,
        currentName = currentTR.querySelector('td:nth-child(3)').textContent,
        newName     = currentTR.querySelector('td input[name="nome"]').value,
        newStatus   = currentTR.querySelector('td input[name="ativo"]').value,
        newUser     = currentTR.querySelector('td select[name="user"]').value;
    
    openModal(`<p>Deseja alterar ${currentName}?</p><div class='buttons-modal'><span class='yes' onclick='saveField("${id}", "${newName}", "${newStatus}", "${newUser}")'>Sim</span><span onclick='closeModal()'>Não</span></div>`);
}

function saveField(id, nome, status, usuario) {
    
    if (status === 'Sim' || status === 'sim'){
        status = 1;
    } else {
        status = 0;
    }
    
    updateStore(id, nome, status, usuario);
}