function $jq(seletor){
    return document.querySelector(seletor);
}

function $jqa(seletor){
    return document.querySelectorAll(seletor);
}

function requestTemplates() {
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function(res){
        if (res){
            loadTemplates(res.srcElement.response);
            createModal();
        }
    }
    xhr.open('get', 'https://newsletters.e-thinkers.com.br/admin/lojas/templates/' + getKey());
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

window.onload = requestTemplates;

function createDom(element) {
    var elementDom = document.createElement(element);
    
    return elementDom;
}

function loadTemplates(res) {
    var response = JSON.parse(res),
        tBody = $jq('.tbody-templates');
    
    tBody.innerHTML = '';
    
    response.forEach(function (loja, indiceloja) {
        loja.templates.forEach(function (template, indicetemplate) {
            var tr = createDom('tr');
    
            var td_id   = createDom('td'),
                span_id = createDom('span');
    
            span_id.textContent = template.id;
            td_id.appendChild(span_id);
    
            tr.appendChild(td_id);
            
            var td_criacao   = createDom('td'),
                span_criacao = createDom('span');
    
            span_criacao.textContent = template.createdAt.match(/\d{4}-\d{2}-\d{2}/g);
            td_criacao.appendChild(span_criacao);
            
            tr.appendChild(td_criacao);
            
            var td_loja   = createDom('td'),
                span_loja = createDom('span'),
                a_loja    = createDom('a');
    
            a_loja.textContent = loja.nome;
            a_loja.href = '/admin/template/' + template.id;
            a_loja.target = '_blank';
            span_loja.appendChild(a_loja);
            td_loja.appendChild(span_loja);
            
            tr.appendChild(td_loja);
    
            var td_remove   = createDom('td'),
                img_remove  = createDom('img'),
                span_remove = createDom('span');
    
            img_remove.src = '../assets/images/trash.png';
            span_remove.appendChild(img_remove);
            span_remove.setAttribute('onclick' , `checkTemplate(${template.id})`);
            td_remove.appendChild(span_remove);
            
            tr.appendChild(td_remove);
            
            tr.bgColor = (!(indiceloja % 2))? '#dedede': '#ccc';
            tBody.appendChild(tr);
        });
    
    });
}

function checkTemplate(id) {
    openModal(`<p>Excluir template?</p><div class="buttons-modal"><span class="yes" onclick="removeTemplate(${id})">Sim</span><span onclick="closeModal()">Não</span></div>`);
}

function removeTemplate(id) {
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function(res){
        if (res){
            setTimeout(function () {
                closeModal();
                requestTemplates();
            }, 300);
        }
    }
    xhr.open('delete', 'https://newsletters.e-thinkers.com.br/template/' + id);
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