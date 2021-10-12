function showModels(){
  var xhr      = new XMLHttpRequest(),
      KeyUser  = {KeyUser : getKey()};
    
      xhr.onload = function(res){
          var response = (res.srcElement) ? JSON.parse(res.srcElement.response) : null;
          if(response){
              document.querySelector('.content-models').innerHTML = '';
              response.forEach(loadMenuItens);
              addButtonNewLoja();
              createModal();
          } else {
              redirect('/login');
          }
      }
  
  xhr.open('post', `https://newsletters.e-thinkers.com.br/lojas`);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(KeyUser));
}

function loadMenuItens(item, index) {
  if (item.status) {
    var div    = document.createElement('div'),
      span       = document.createElement('span'),
      ul 	       = document.createElement('ul'),
      li 	       = document.createElement('li'),
      li_2       = document.createElement('li'),
      a_register = document.createElement('a'),
      a_store    = document.createElement('a'),
      id         = item.id,
      name       = item.nome.replace(/\s{1,99}/g , '_');
    
    span.id = id;
    a_register.href = `register?id=${id}/${name}`;
    a_store.href = `marca/${name}?id=${id}`;
    a_store.textContent = item['nome'];
    
    li.setAttribute('class'   , 'even');
    li.setAttribute('onclick' , `notification(${id})`);
    li_2.setAttribute('class' , 'odd');
    div.setAttribute('class' , 'brand_models');
    
    span.appendChild(a_store);
    a_register.appendChild(li_2);
    ul.appendChild(li);
    ul.appendChild(a_register);
    div.appendChild(span);
    div.appendChild(ul);
    
    document.querySelector('.content-models').appendChild(div);
  }
}

function addButtonNewLoja(){
  var div    = document.createElement('div'),
    span   = document.createElement('span'),
    input  = document.createElement('input'),
    submit = document.createElement('input');
  
  div.setAttribute('class' , 'adicionar_loja');
  div.setAttribute('onclick' , 'addFields(event, this)');
  span.textContent = 'Adicionar nova Loja';
  input.setAttribute('class' , 'display-none');
  input.setAttribute('placeholder' , 'Nome da nova loja');
  submit.setAttribute('class' , 'display-none');
  input.setAttribute('type' , 'text');
  submit.setAttribute('type' , 'submit');
  submit.setAttribute('value' , 'Adicionar');
  submit.setAttribute('onclick' , 'addNewStore()');
  
  div.appendChild(input);
  div.appendChild(submit);
  div.appendChild(span);
  document.querySelector('.content-models').appendChild(div);
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
  var modalBack 	   = document.createElement('div'),
    modalContent   = document.createElement('div');
  
  modalBack.setAttribute('class' , 'modal-back-ground');
  modalContent.setAttribute('class' , 'modal-content');
  
  modalBack.appendChild(modalContent);
  document.querySelector('body').appendChild(modalBack);
}

setTimeout(function () {
  showModels();
}, 200);