function sendTemplate(id, header, body, footer, topheader){
	var xhr = new XMLHttpRequest();
	
	xhr.open('post', 'https://newsletters.e-thinkers.com.br/template/add/' + id + '/' + getKey());
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify({header: header, body: body, footer: footer, topheader: topheader}));
}

function registerTemplate(header, footer, topheader){
	var body = `<center>
			        <table id="root" cellpadding="0" cellspacing="0" border="0"></table>
			        <table id="table_add_line" width="700" cellpadding="0" cellspacing="0" border="0"><tr id="addLine"><td class="adicionar_linhas" onclick="addLine()"></td></tr></table>
			        <table id="table_finalizar" width="700" cellpadding="0" cellspacing="0" border="0"><tr class="finalizar"><td><span id="botao_finalizar" onclick="finaliza()">Finalizar</span></td></tr></table>
		        </center>`,
		divAppend = document.createElement('div'),
		headerFormated,
		footerFormated,
		topheaderFormated,
		id = window.location.search.split('/')[0].match(/(?!\?id=)\d{1,99}/g)[0];

		headerFormated = `<div class="header" onmouseover="addButtonEdit(this)" onclick="editTemplate(event, this)">  <div style="font-size:1px;display:none!important;"></div>${header}</div>`;
		footerFormated = `<div class="footer" onmouseover="addButtonEdit(this)" onclick="editTemplate(event, this)">${footer}</div>`;
		topheaderFormated = topheader.replace(/<head(\s{1,99})?>/g , `<head>
			<link rel="stylesheet" type="text/css" href="../assets/css/newsletter.css">
  			<script type="text/javascript" src="newsletter.js"></script>`);

	sendTemplate(id, headerFormated, body, footerFormated, topheaderFormated);
	openModal('<p style="margin-bottom: 15px">Template Cadastrado com sucesso</p><span onclick="closeModal()">OK</span>');
	document.querySelectorAll('.input_register textarea').forEach(function(textarea){
		textarea.value = '';
	});
}

function checkRegister(){
	var head    = document.querySelector('#edit_head'),
		header  = document.querySelector('#edit_header'),
		footer  = document.querySelector('#edit_footer'),
		message = [];

		if (head.value === '' || header.value === '' || footer.value === '') {
			if (head.value === '') {
				message.push('Preencha o head');
			}
			if (header.value === '') {
				message.push('Preencha o header');
			}
			if (footer.value === '') {
				message.push('Preencha o footer');
			}
			teste = message;
			var ul   = document.createElement('ul'),
				span = document.createElement('span');
			
			message.forEach(function(item){
				var li = document.createElement('li');

				li.textContent = item;
				ul.appendChild(li);
			});

			span.textContent = 'OK';
			span.style.marginTop = '15px';
			span.setAttribute('onclick' , 'closeModal()');

			ul.appendChild(span);

			openModal(ul);
		} else {
			registerTemplate(header.value, footer.value, head.value);
		}
}

function createModal(){
	setTimeout(function(){		
		var modalBack 	   = document.createElement('div'),
			modalContent   = document.createElement('div');

			modalBack.setAttribute('class' , 'modal-back-ground');
			modalContent.setAttribute('class' , 'modal-content');

			modalBack.appendChild(modalContent);
			document.querySelector('body').appendChild(modalBack);
	}, 50);
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
		if (childrenElement.children.length > 0) {
			childrenElement.innerHTML = '';
		}
		childrenElement.appendChild(content);
	}
}

function closeModal(){
	document.querySelector('.modal-back-ground').classList.remove('open');
}

function h1NameStore(){
	if (window.location.href.indexOf('register') > -1) {
		var splitNameStore = window.location.search.split('/'),
			nameStore 	   = splitNameStore[1].replace(/_/g , ' ');
		document.querySelector('#name_loja').textContent = nameStore;
		document.querySelectorAll('.input_register textarea').forEach(function(textarea){
			if (textarea.id !== 'edit_head') {
				textarea.addEventListener('focus' , showDiv);
				textarea.addEventListener('blur' , hideDiv);
				textarea.addEventListener('input' , showTemplate);
				textarea.addEventListener('keydown' , indenter);
			}
		});
	}
}

String.prototype.insert_at=function(index, string)
{   
  return this.substr(0, index) + string + this.substr(index);
}

function indenter(){
	if(event.key === 'Tab'){
		event.preventDefault();
		var position = event.srcElement.selectionEnd,
		value = this.value;

		value = value.insert_at(position, "     ");
		this.value = value;
	}
}

function showDiv(){
	var parent 	  = this.parentElement,
		value 	  = this.value,
		className = this.id.replace('edit_' , ''),
		div    	  = document.createElement('div');

	div.setAttribute('class' , className);
	div.innerHTML = value;
	parent.appendChild(div);
}

function hideDiv(){
	var parent = this.parentElement,
		className = this.id.replace('edit_' , '');
		className = `.${className}`;
	parent.querySelector(className).remove();
}

function showTemplate(){
	var value 		 	= this.value,
		classDivShow 	= this.id.replace('edit_' , '');
		classDivShow 	= `.${classDivShow}`;
	var divShowTemplate = document.querySelector(classDivShow);

	divShowTemplate.innerHTML = value;
}
function addBreadCrumb(BreadCrumbs, seletor){
	var ul = document.createElement('ul');
	ul.setAttribute('class' , 'breadcrumbs');
	
	BreadCrumbs.forEach(function (item) {
		var li = document.createElement('li'),
			a  = document.createElement('a');
		
		a.href = item.url;
		a.textContent = item.page;
		
		li.appendChild(a);
		
		ul.appendChild(li);
	});
	
	document.querySelector(seletor).prepend(ul);
}

window.onload = function(){
	createModal();
	h1NameStore();
	addBreadCrumb([{'page' : 'inicio' , 'url' : '/'}, {'page' : 'Cadastrar' , 'url' : window.location.href}], 'body');
}