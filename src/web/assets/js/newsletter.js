var __UTM;
var __TITLE;
var __SNIPPET;
var __URL = window.location.href.split('#');
var __StoreName;
var __StoreId;
var __statusDrag;
var __linkClicked = true;
var __DATEFIRE;
var __TEMPLATES;
var __CURRENTTEMPLATE;
var textAreaValue;
var __TEMPLATESELECTED = 0;

function loadImg(elementt){
	if ((typeof elementt) === 'string') {
		var url   	  = elementt,
			qtd   	  = 1,
			inputLoad = false;
		
	} else {
		var url 	  = '',
			qtd 	  = elementt.nextSibling.querySelectorAll('td a img').length,
			inputLoad = true;
	}
	function getData(time, url, clean){
		var	div 		= document.createElement('div'),
			img 		= document.createElement('img');
		
		img.src = url;
		
		function getLoad(){
			if (url !== "") {
				div.setAttribute('ondrop' , 'drop(event)');
				div.setAttribute('ondragover' , 'allowDrop(event)');
				
				img.style.display = 'block';
				img.border = '0';
				img.setAttribute('draggable' , true);
				img.setAttribute('ondragstart' , 'drag(event, this)');
				img.setAttribute('ondragend' , 'dragEND(event, this)');
				img.setAttribute('ondblclick' , 'deleteImg(event, this)');
				
				img.onload = function(){
					sortIdImage();
					if (img.naturalWidth > 700) {
						img.setAttribute('width' , '700px');
					}
				}
				
				div.appendChild(img);
				document.querySelector('.imagens_laterais').prepend(div);
				
				setTimeout(function(){
					img.classList.add('down');
					saveSession();
					var filename   = url.split('/');
					var indiceName = filename.length - 1;
					createtitleImages(div, filename[indiceName]);
				},time);
			}
		}
		if (clean) {
			setTimeout(function(){
				getLoad();
			},100)
		} else {
			getLoad();
		}
	}
	
	if(url !== ""){
		getData(100, url, true);
	} else if(inputLoad) {
		for(var i = 0 ; i < qtd ; i++){
			if (elementt.nextSibling.querySelectorAll('td a img')[i] !== undefined) {
				url = elementt.nextSibling.querySelectorAll('td a img')[i].src;
			}
			
			getData(5, url, false);
		}
	}
	
	if (!(document.querySelector('.conteudo-imagens').classList.contains('open'))) {
		showHideImages();
	}
}

function createtitleImages(elementtAppend, titleImage){
	var label = createElementtsTable('label', '', '');
	label.textContent = titleImage;
	
	elementtAppend.appendChild(label);
}

function sortIdImage(){
	var count = 0;
	
	if (document.querySelectorAll('#root img').length > 0) {
		count += 100;
	}
	
	document.querySelectorAll('.conteudo-imagens div img').forEach(function(item){
		item.id = `img_drag_${count}`;
		count++;
	});
}

function hideInputs(){
	var dataInputs = document.querySelector('.insert_data'),
		botshowInputs = document.querySelector('.mostra_inputs');
	
	dataInputs.classList.remove('open');
	
	setTimeout(function(){
		botshowInputs.classList.add('opening');
		setTimeout(function(){
			botshowInputs.classList.add('open');
		}, 10);
	}, 600);
	
	setTimeout(function(){
		dataInputs.classList.remove('opening');
	}, 600);
}

function showInputs(){
	var dataInputs 	  = document.querySelector('.insert_data'),
		botshowInputs = document.querySelector('.mostra_inputs');
	
	dataInputs.classList.add('opening');
	botshowInputs.classList.remove('opening');
	
	setTimeout(function(){
		botshowInputs.classList.remove('open');
	}, 10);
	
	setTimeout(function(){
		dataInputs.classList.add('open');
	}, 10);
}

function showHideImages(){
	var contentImages = document.querySelector('.conteudo-imagens');
	if (contentImages.classList.contains('open')) {
		contentImages.classList.remove('open');
	} else {
		contentImages.classList.add('open');
	}
}
function showHideLinks(){
	var contentImages = document.querySelector('.conteudo-links');
	if (contentImages.classList.contains('open')) {
		contentImages.classList.remove('open');
	} else {
		contentImages.classList.add('open');
	}
}
function createElement(stringElement, elementtPrepend){
	if (elementtPrepend === '#addLine') {
		document.querySelector(elementtPrepend).innerHTML = stringElement;
	} else {
		var contentElement = document.createElement('div');
		contentElement.innerHTML = stringElement;
		document.querySelector(elementtPrepend).prepend(contentElement.children[0]);
	}
}

function appendContent(){
	var contentLinks  = `<div class="conteudo-links">
							<span class="mostra_esconde_links" onclick="showHideLinks()"></span>
							<textarea id="put_links" placeholder="Cole os links e os títulos aqui..."></textarea>
							<div class="set_images" onmouseover="addFocusImgs(this)" onmouseout="removeFocusImgs(this)">
								<input type="text" name="url" placeholder="Link da imagem" autocomplete="off"/>
								<input type="text" name="title" placeholder="Titulo da imagem" autocomplete="off"/>
								<input type="submit" name="ok" value="ok" onclick="insertAttributes(this)"/>
								<div>
									<input type="submit" name="prev" value="prev image" onclick="insertAttributes(this)"/>
									<input type="submit" name="next" value="next image" onclick="insertAttributes(this)"/>
						    	</div>
						    </div>
							<input type="submit" id="load_links" onclick="loadLinks(this)" value="carregar Links e Titulos"/>
						</div>`,
		contentImages = `<div class="conteudo-imagens">
						    <span class="mostra_esconde_imagens" onclick="showHideImages()"></span>
						    <div class="imagens_laterais"></div>
						    <div class="assemble_template">
						    	<span onclick="assembleTemplate()" class="set_template">Montar Template</span>
								<span onclick="removeImages()">Remover Imagens</span>
						    </div>
						</div>`,
		botshowInputs = `<span class="mostra_inputs" onclick="showInputs()">Mostrar campos</span>`,
		inputsData 	  = `<div class="insert_data opening open">
						    <div class="data_01">
						        <input type="text" name="title" placeholder="Digite o titulo" onclick="removeCheckedInputs(this)">
						        <input type="submit" name="ok" value="ok" onclick="alterTitleAndSnippetOrSaveSnippet(this)">
						    </div>
						    <div class="data_02">
						        <input type="text" name="snippet" placeholder="Digite o snippet" onclick="removeCheckedInputs(this)">
						        <input type="submit" name="ok" value="ok" onclick="alterTitleAndSnippetOrSaveSnippet(this)">
						    </div>
						    <div class="data_03">
						        <input type="text" name="utm" placeholder="Digite a data de disparo" onclick="removeCheckedInputs(this)">
						        <input type="submit" name="ok" value="ok" onclick="alterTitleAndSnippetOrSaveSnippet(this)">
						    </div>
						    <div class="data_04">
						    	<span class="show_images" onclick="loadBuckets()">Listar Imagens</span>
								<label>
									Carregar Imagens
						        	<input type="file" name="img" placeholder="cole a url da imagem" multiple onchange="uploadImage()"/>
						        </label>
						        <span onclick="hideInputs()">Esconder campos</span>
						    </div>
						</div>`;
	createElement(contentImages, 'body');
	createElement(contentLinks, 'body');
	createElement(botshowInputs, 'body');
	createElement(inputsData, 'body');
}

function uploadImage(){
	var input = document.querySelector('.insert_data input[name=img]'),
		files = input.files;
	
	if(files.length > 0 && files.length < 20){
		for(var i = 0 ; i < files.length ; i++){
			if (files[i].size < 100000000 && files[i].type.indexOf('image') > -1) {
				const formData = new FormData();
				formData.append('file', files[i], files[i].name);
				upload(files[i].name, formData);
			}
		}
		input.value = '';
	}
}

function createModal(){
	var modalBack 	   = document.createElement('div'),
		modalContent   = document.createElement('div');
	
	modalBack.setAttribute('class' , 'modal-back-ground');
	modalContent.setAttribute('class' , 'modal-content');
	
	modalBack.appendChild(modalContent);
	document.querySelector('body').appendChild(modalBack);
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

function createElementtsTable(typeElementt, attrElementt, valueAttr, elementtWidth){
	var elementt = document.createElement(typeElementt);
	if(attrElementt !== ""){
		elementt[attrElementt]=valueAttr;
	}
	if (typeElementt === "table") {
		elementt.cellPadding = "0";
		elementt.cellSpacing = "0";
		elementt.border = "0";
	}
	if (typeElementt === 'a') {
		elementt.setAttribute('ondrop' , 'drop(event)');
		elementt.setAttribute('ondragover' , 'allowDrop(event)');
		elementt.classList.add('empty');
	}
	if (elementtWidth !== undefined) {
		elementt.style.width = elementtWidth;
	}
	if (typeElementt === 'span') {
		elementt.setAttribute(attrElementt , valueAttr);
	}
	return elementt;
}

function addLine(){
	var tr 	  = createElementtsTable('tr', 'align', 'center'),
		td 	  = createElementtsTable('td', '', ''),
		table = createElementtsTable('table', '', ''),
		tr_2  = createElementtsTable('tr', '', ''),
		td_2  = createElementtsTable('td', '', ''),
		a 	  = createElementtsTable('a', 'target', '_blank', '700px');
	
	createButtonDelete(tr);
	
	td_2.appendChild(a);
	tr_2.appendChild(td_2);
	table.appendChild(tr_2);
	td.appendChild(table);
	tr.appendChild(td);
	
	document.querySelector('#root').appendChild(tr);
}

function loopRemove(elementts){
	elementts.forEach(function(item){
		if (item.className.indexOf('empty') === 0) {
			if (item.children.length === 1) {
				item.removeAttribute('class');
				item.removeAttribute('style');
			}
		}
		if(item.nodeName === 'DIV'){
			setTimeout(function(){
				if (item.children.length === 1) {
					item.remove();
				}
			},100);
		}
	});
}

function removeEmptyEDiv(){
	var divsLaterais = document.querySelectorAll('.imagens_laterais div'),
		tdsnotEmptys = document.querySelectorAll('#root table td a');
	
	loopRemove(divsLaterais);
	loopRemove(tdsnotEmptys);
}

function deleteTD(elementt){
	elementt.remove();
}

function criaTDS(elementt, elementtWidth){
	var td = createElementtsTable('td', '', ''),
		a  = createElementtsTable('a', 'target', '_blank', elementtWidth);
	
	td.setAttribute('ondblclick' , 'deleteTD(this)');
	
	td.appendChild(a);
	elementt.appendChild(td);
}

function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev, elementt) {
	if (elementt.getAttribute('ondragstart') !== null) {
		ev.dataTransfer.setData("text", ev.target.id);
	}
}

function drop(ev) {
	if (__statusDrag && ev.target.parentElement.nodeName !== 'DIV') {
		ev.preventDefault();
		var data = ev.dataTransfer.getData("text");
		if (data.indexOf('img_drag_') > -1) {
			if (ev.target.src === undefined) {
				ev.target.appendChild(document.getElementById(data));
			} else {
				var a    = createElementtsTable('a', 'target', '_blank');
				
				ev.target.parentElement.parentElement.appendChild(a);
				
				setTimeout(function(){
					a.appendChild(document.getElementById(data));
					a.classList.remove('empty');
				},50);
			}
		}
		removeEmptyEDiv();
	}
}

function dragEND(ev, elementt){
	if (elementt.parentElement.nodeName !== 'DIV') {
		var currentTR = elementt.parentElement.parentElement.parentElement;
		
		if(currentTR.parentElement.parentElement.parentElement !== null){
			var	previousParentTR = currentTR.parentElement.parentElement.parentElement.previousSibling;
		}
		
		if(currentTR.nodeName == 'TR'){
			if (currentTR.clientWidth < 700 ) {
				criaTDS(currentTR, `${700 - currentTR.clientWidth}px`);
			}
		}
		if(currentTR.querySelectorAll('img').length < 2){
			addLine();
		}
		if (previousParentTR !== undefined && previousParentTR !== null) {
			previousParentTR.querySelectorAll('td table tr td').forEach(function(item){
				if (item.querySelectorAll('img').length < 1) {
					item.remove();
				}
			});
		}
		elementt.removeAttribute('ondragstart');
		elementt.removeAttribute('ondragend');
	}
}

function alterTitleAndSnippetOrSaveSnippet(elementt){
	var selectorTitle   = document.querySelector('title'),
		selectorSnippet = document.querySelector('div[style="font-size:1px;display:none!important;"]'),
		text  			= elementt.previousSibling.previousSibling.value,
		input 			= elementt.previousSibling.previousSibling.name;
	
	if (input === "title") {
		selectorTitle.textContent = text;
		__TITLE = text;
		elementt.previousSibling.previousSibling.classList.add('checked');
	}
	else if (input === "snippet") {
		selectorSnippet.textContent = text;
		__SNIPPET = text;
		elementt.previousSibling.previousSibling.classList.add('checked');
	}
	else {
		var dateTest = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/g;
		if(dateTest.test(text)){
			var data = text.split(/[.,\/ -]/);
			__UTM = `?utm_source=MailCRM&utm_medium=email&utm_campaign=${data[2]}-${data[1]}-${data[0]}&utm_content=${data[2]}-${data[1]}-${data[0]}`;
			__DATEFIRE = data;
			elementt.previousSibling.previousSibling.classList.add('checked');
		} else {
			openModal('<p>Digite a data em formato válido<br>Ex: (xx/xx/xxxx)</p><span onclick="closeModal()">OK</span>');
		}
	}
	saveSession();
}

function createButtonDelete(elementt){
	var spanDelete = document.createElement('span');
	spanDelete.setAttribute('class' , 'span_delete');
	spanDelete.textContent = 'X';
	spanDelete.setAttribute('onclick' , 'deleteLine(this)');
	
	elementt.prepend(spanDelete);
}

function deleteLine(elementt){
	elementt.parentElement.remove();
	if(elementt.nextSibling.querySelectorAll('td a img').length > 0)
		loadImg(elementt);
}

function deleteImg(e, elementt){
	var currentWidth = elementt.width;
	e.stopPropagation();
	if (elementt.parentElement.parentElement.className === 'imagens_laterais') {
		elementt.parentElement.remove();
	} else {
		elementt.parentElement.classList.add('empty');
		elementt.parentElement.style.width = `${currentWidth}px`;
		elementt.remove();
	}
}

function removeCheckedInputs(elementt){
	elementt.classList.remove('checked');
}

function removeAttributes(elementt, attributte){
	document.querySelectorAll(elementt).forEach(function(item){
		item.removeAttribute(attributte);
	})
}

function removeElements(elementts){
	elementts.forEach(function(item){
		document.querySelectorAll(item).forEach(function(item_2){
			item_2.remove();
		});
	});
	document.querySelectorAll('#root > tr').forEach(function(line){
		if(line.querySelectorAll('img').length === 0){
			line.remove();
		}
	})
}

function alterAllUtms(){
	document.querySelectorAll('a').forEach(function(item){
		var currentLink = item.href,
			currentUTM  = __UTM;
		
		if (currentLink.indexOf('http') > -1 && currentLink.indexOf('utm') > -1) {
			var newLink = (currentLink.indexOf('?utm') > -1) ? currentLink.split('?utm')[0] : currentLink.split('&utm')[0];
			if (newLink.indexOf('?') > -1) {
				currentUTM = currentUTM.replace('?' , '&');
			}
			item.href = newLink + currentUTM;
		}
	});
}

function validation(){
	if(__TITLE === undefined){
		openModal('<p>Preencha o Titulo</p><span onclick="closeModal()">OK</span>');
	}
	else if(__SNIPPET === undefined){
		openModal('<p>Preencha o Snippet</p><span onclick="closeModal()">OK</span>');
	}
	else if(__UTM === undefined){
		openModal('<p>Preencha a data de disparo</p><span onclick="closeModal()">OK</span>');
	}
	else{
		return true;
	}
}

function finaliza(){
	if (validation()) {
		removeElements(['.breadcrumbs', '#div_edit', '#id_template', '.edit_section', '.conteudo-links', '#table_finalizar', '#table_add_line', '#addLine', '.finalizar' , '.insert_data', '.mostra_inputs', '.conteudo-imagens',
			'link[href="../assets/css/newsletter.css"]', 'script', '.span_delete', '.modal-back-ground']);
		alterAllUtms();
		
		removeAttributes('.header', 'onmouseover');
		removeAttributes('.header', 'onclick');
		removeAttributes('.footer', 'onmouseover');
		removeAttributes('.footer', 'onclick');
		removeAttributes('.header', 'class');
		removeAttributes('.footer', 'class');
		removeAttributes('#root table td a', 'class');
		removeAttributes('#root table td', 'class');
		removeAttributes('#root table td a', 'ondrop');
		removeAttributes('#root table td a img', 'ondragend');
		removeAttributes('#root table td a img', 'skip');
		removeAttributes('#root table td a', 'ondragover');
		removeAttributes('#root table td a img', 'draggable');
		removeAttributes('#root table td a img', 'ondragstart');
		removeAttributes('#root table td a img', 'id');
		removeAttributes('#root table td a img', 'ondblclick');
		removeAttributes('#root table td', 'ondblclick');
		removeAttributes('#root table td a img', 'onmouseover');
		removeAttributes('#root table td a img', 'class');
		removeAttributes('#root', 'id');
		
		var winTemplate = window.open(),
			headerPage  = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "https://www.w3.org/TR/html4/loose.dtd">
							<html>`,
			contentPage = document.querySelector('html').innerHTML,
			contentFull = `${headerPage}${contentPage}</html>`;
		
		saveNews(contentFull, __StoreId);
		
		winTemplate.document.body.innerHTML = '<pre></pre>';
		winTemplate.document.querySelector('head').innerHTML = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
		winTemplate.document.querySelector('pre').textContent = contentFull;
		winTemplate.document.querySelector('pre').textContent = winTemplate.document.querySelector('pre').textContent.replace(/amp;/g , '');
		
	}
}

function getNameStore(storeName){
	__StoreName = storeName;
}

function chooseTemplate(){
	var id = window.location.search.match(/(?!\?id=)\d+/g)[0],
		xhr = new XMLHttpRequest();
	
	__StoreId = id;
	
	xhr.onload = function(res){
		var response = (res.srcElement) ? JSON.parse(res.srcElement.response) : null;
		createModal();
		if(response){
			if (response.templates.length > 0) {
				var templates 	  = response.templates,
					contentTemplate = '',
					contentFull   = '',
					head		  = `<head>
										<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
										<title>Escolha o Template</title>
										<link rel="stylesheet" type="text/css" href="../assets/css/newsletter.css">
									</head>`,
					divTemplates,
					header,
					footer;
				
				__TEMPLATES = response.templates;
				
				var nameStore = window.location.pathname.split('/')[2].replace('/' , '').replace(/\_/g , ' ');
				getNameStore(nameStore);
				
				if (templates.length > 1) {
					templates.forEach(function(item, indice){
						header = item.header.replace(/onmouseover="addButtonEdit\(this\)" onclick="editTemplate\(event, this\)"/g , '').replace(/<span class=".*">.*<\/span>/g , '');
						footer = item.footer.replace(/onmouseover="addButtonEdit\(this\)" onclick="editTemplate\(event, this\)"/g , '').replace(/<span class=".*">.*<\/span>/g , '');
						
						contentTemplate += '<div class="choose_template" onclick="selecTemplate(' + indice + ')">' + header + footer + '<span id="id_template">' + item.id + '</span></div>';
					});
					document.querySelector('html').innerHTML = head +  '<body><div class="carousel"><h1>Escolha o Template</h1><span class="button_prev" onclick="carousel(this)"></span><div class="transition" style="width: ' + window.innerWidth * templates.length + 'px">' + contentTemplate + '</div><span class="button_next" onclick="carousel(this)"></span></div><body>';
					addBreadCrumb([{'page' : 'inicio' , 'url' : '/'}, {'page' : 'Templates' , 'url' : window.location.href}], 'body');
				} else {
					addBreadCrumb([{'page' : 'inicio' , 'url' : '/'}, {'page' : __StoreName , 'url' : window.location.href}], 'body');
					selecTemplate(0);
					__CURRENTTEMPLATE = __TEMPLATES[0].id;
					setTimeout(function(){
						loadSession();
					}, 100);
				}
			} else {
				openModal('<p style="margin-bottom: 10px;">Essa loja não possui template cadastrado</p><span class="ok"><a href="/">OK</a></span>');
			}
		} else {
			redirect('/login')
		}
	}
	xhr.open('get', `https://newsletters.e-thinkers.com.br/loja/${id}/` + getKey());
	
	xhr.send();
}

window.onload = chooseTemplate;

function selecTemplate(identify){
	var contentFull = __TEMPLATES[identify].topheader + '<body style="padding:0;">' + __TEMPLATES[identify].header + __TEMPLATES[identify].body + __TEMPLATES[identify].footer + '</body>';
	document.querySelector('html').innerHTML = contentFull+'<input id="id_template" type="hidden" value="' + __TEMPLATES[identify].id + '"/>';
	addBreadCrumb([{'page' : 'inicio' , 'url' : '/'}, {'page' : __StoreName , 'url' : window.location.href}], 'body');
	appendContent();
	addLine();
	__CURRENTTEMPLATE = __TEMPLATES[identify].id;
	setTimeout(function(){
		loadSession();
	}, 100);
	setTimeout(function(){
		getNewsFinalizadas();
		addButtonResetHtml();
		createModal();
	}, 150);
}

function slide(namebutton){
	var divTransition = document.querySelector('.transition'),
		qtd 		  = divTransition.children.length,
		value;
	
	if (namebutton === 'prev') {
		value = 100 / qtd;
	} else {
		value = -(100 / qtd);
	}
	value = value.toFixed(1);
	value = parseFloat(value);
	
	var	final = -((qtd - 1) * value),
		transition;
	
	if (divTransition.style.transform === '') {
		if (namebutton === 'prev') {
			__TEMPLATESELECTED = qtd - 1;
			transition = -((value) * (qtd - 1));
		} else {
			__TEMPLATESELECTED++;
			transition = value;
		}
	} else {
		transition = divTransition.style.transform.match(/-?\d{1,4}\.?(\d{1,9})?%\,/g);
		transition = parseFloat(transition[0].replace('%,' , '')).toFixed(1);
		transition = parseFloat(transition);
		
		if (transition === 0) {
			if (namebutton === 'prev') {
				__TEMPLATESELECTED = qtd - 1;
				transition = -((value) * (qtd - 1));
			} else {
				__TEMPLATESELECTED++;
				transition = value;
			}
		} else if(transition === (-final)){
			if (namebutton === 'prev') {
				__TEMPLATESELECTED--;
				transition += (value);
			} else {
				__TEMPLATESELECTED = 0;
				transition = 0;
			}
		} else {
			if (namebutton === 'prev') {
				__TEMPLATESELECTED--;
			} else {
				__TEMPLATESELECTED++;
			}
			transition += (value);
		}
	}
	divTransition.style.transform = 'translate(' + transition + '%,' + '0';
}

function carousel(seletor){
	if (seletor.className === 'button_prev') {
		slide('prev');
	} else {
		slide('next');
	}
}

function insertAttributes(elementt){
	var sectionHover   = document.querySelector('.set_images');
	
	if (sectionHover.classList.contains('hovered')) {
		var fieldUrl   = document.querySelector('.conteudo-links .set_images input[name="url"]'),
			fieldTitle = document.querySelector('.conteudo-links .set_images input[name="title"]'),
			url   	   = fieldUrl.value,
			title 	   = fieldTitle.value,
			imgAlter   = document.querySelector('#root img:not(.edit_images)');
		
		if(confereSkips()){
			removeSkips();
		}
		
		if(imgAlter !== null){
			if (elementt === undefined || elementt.name === 'ok') {
				var hrefEdit   = imgAlter.parentElement,
					currentUTM = __UTM;
				
				if (currentUTM === undefined) {
					currentUTM = '?utm';
				}
				
				if (url.indexOf('?') > -1) {
					currentUTM = currentUTM.replace('?' , '&');
				}
				
				fullUrl = url + currentUTM;
				
				if (url !== '') {
					hrefEdit.href = fullUrl;
					hrefEdit.classList.add('checked');
					fieldUrl.value = '';
					fieldTitle.value = '';
				} else {
					hrefEdit.removeAttribute('href');
					hrefEdit.classList.remove('checked');
				}
				if (title !== '') {
					imgAlter.alt = title;
					imgAlter.title = title;
					fieldUrl.value = '';
					fieldTitle.value = '';
				} else {
					imgAlter.removeAttribute('alt');
					imgAlter.removeAttribute('title');
				}
				imgAlter.setAttribute('skip' , true);
			} else if(elementt.name === 'next'){
				imgAlter.setAttribute('skip' , true);
			} else {
				var allItems = document.querySelectorAll('#root img'),
					currentItem;
				allItems.forEach(function(item, index){
					if (imgAlter === item) {
						currentItem = index - 1;
					}
				});
				if (currentItem > -1) {
					allItems[currentItem].removeAttribute('skip');
				} else {
					var lastItem = allItems.length - 1;
					allItems.forEach(function(item, index){
						if (index !== lastItem) {
							item.setAttribute('skip' , true);
						}
					});
				}
			}
			removeFocusImgs();
			addFocusImgs();
		}
	}
	saveSession();
}

function addFocusImgs(elementt){
	var allImages  = document.querySelectorAll('#root img'),
		currentImg = [],
		count 	   = 0;
	
	document.querySelector('.set_images').classList.add('hovered');
	
	allImages.forEach(function(item, index){
		item.classList.add('edit_images');
		if (item.getAttribute('skip') === null) {
			currentImg.push(index);
		}
	});
	if(currentImg.length > 0){
		allImages[currentImg[0]].classList.remove('edit_images');
		if (count === 0) {
			scrollPage(allImages[currentImg[0]].id);
			count++;
		}
	}
}

function scrollPage(idElement){
	window.location.href = `${__URL[0]}#${idElement}`;
}

function confereSkips(){
	var allImages  = document.querySelectorAll('#root img'),
		lastItem   = allImages.length - 1,
		currentItem;
	
	if (allImages.length > 0) {
		allImages.forEach(function(item, index){
			if (index === lastItem) {
				currentItem = item;
			}
		});
		
		if (currentItem.getAttribute('skip')) {
			return true;
		}
	}
}

function removeFocusImgs(elementt){
	document.querySelector('.set_images').classList.remove('hovered');
	
	document.querySelectorAll('#root table td a img').forEach(function(item, index){
		item.classList.remove('edit_images');
	});
}

function removeSkips(){
	document.querySelectorAll('#root img').forEach(function(item){
		item.removeAttribute('skip');
	});
	addFocusImgs();
}

document.addEventListener('keydown' , function(e){
	var sectionHover = document.querySelector('.set_images');
	
	if (e.keyCode === 17) {
		__linkClicked = false;
		document.querySelectorAll('.conteudo-links ul li.odd').forEach(function(item){
			item.classList.add('link');
		});
	}
	
	if (e.keyCode === 13 && sectionHover.classList.contains('hovered')) {
		insertAttributes();
		removeFocusImgs();
		addFocusImgs();
	}
});

document.addEventListener('keyup' , function(e){
	__linkClicked = true;
	document.querySelectorAll('.conteudo-links ul li.odd').forEach(function(item){
		item.classList.remove('link');
	});
});

function saveSession(){
	var html = document.querySelector('html'),
		content = html.innerHTML;
	
	localStorage.setItem('content' , content);
	setTimeout(function(){
		localStorage.setItem('title' , __TITLE);
		localStorage.setItem('snippet' , __SNIPPET);
		localStorage.setItem('utm' , __UTM);
		localStorage.setItem('storeName' , __StoreName);
		localStorage.setItem('data' , document.querySelector('.insert_data .data_03 input[type="text"]').value);
		localStorage.setItem('currentTemplate' , __CURRENTTEMPLATE);
	}, 50);
}

function loadSession(){
	var html = document.querySelector('html'),
		content = localStorage.getItem('content');
	
	if (content !== null) {
		if(__StoreName === localStorage.getItem('storeName') && __CURRENTTEMPLATE === parseInt(localStorage.getItem('currentTemplate'))){
			html.innerHTML = content;
			loadPropriety();
			deleteSpans();
			setTimeout(function(){
				addSpans();
				removeFocusImgs();
			}, 50);
		} else {
			resetSession();
		}
	}
}

function resetSession(){
	localStorage.removeItem('content');
	localStorage.removeItem('title');
	localStorage.removeItem('snippet');
	localStorage.removeItem('utm');
	localStorage.removeItem('storeName');
	localStorage.removeItem('data');
	localStorage.removeItem('currentTemplate');
}

function deleteSpans(){
	document.querySelectorAll('span.span_delete').forEach(function(item){
		item.remove();
	});
}

function addSpans(){
	document.querySelectorAll('#root tr[align="center"]').forEach(function(item){
		createButtonDelete(item);
	});
}

function loadPropriety(){
	var selectorTitle   = document.querySelector('title'),
		selectorSnippet = document.querySelector('div[style="font-size:1px;display:none!important;"]'),
		currentTitle    = localStorage.getItem('title'),
		currentSnippet  = localStorage.getItem('snippet'),
		currentUTM 	    = localStorage.getItem('utm');
	
	__DATEFIRE 	    = localStorage.getItem('data').split(/[.,\/ -]/);
	
	if (currentTitle !== 'undefined') {
		var inputTitle = document.querySelector('.insert_data input[name="title"]');
		
		selectorTitle.textContent = currentTitle;
		__TITLE = currentTitle;
		inputTitle.value = __TITLE;
		inputTitle.classList.add('checked');
	}
	
	if (currentSnippet !== 'undefined') {
		var inputSnippet = document.querySelector('.insert_data input[name="snippet"]');
		
		selectorSnippet.textContent = currentSnippet;
		__SNIPPET = currentSnippet;
		inputSnippet.value = __SNIPPET;
		inputSnippet.classList.add('checked');
	}
	if (currentUTM !== 'undefined') {
		var inputUtm = document.querySelector('.insert_data input[name="utm"]');
		
		__UTM = currentUTM;
		inputUtm.value = localStorage.getItem('data');
		inputUtm.classList.add('checked');
	}
}
function loadLinks(elementt){
	if (document.querySelector('#put_links') !== null) {
		if (document.querySelector('#put_links').value !== '') {
			var textArea  = document.querySelector('#put_links'),
				textValue = textArea.value,
				allUrls   = [],
				allTitles = [],
				allItems  = textValue.split(/[\n|\n\r]/g);
			
			allItems.forEach(function(item){
				if(item !== ''){
					if (/(http?(s)?:\/\/[^\s]+)/g.test(item)) {
						allUrls.push(item);
					} else {
						allTitles.push(item);
					}
				}
			});
			appendLinks(textArea, allUrls, allTitles);
			elementt.value = 'Recarregar';
		}
	} else {
		var textarea = createElementtsTable('textarea', 'id', 'put_links');
		textarea.setAttribute('placeholder' , 'Cole os links e os títulos aqui...');
		document.querySelector('.conteudo-links').prepend(textarea);
		elementt.value = "carregar Links e Titulos";
		elementt.parentElement.querySelector('ul').remove();
	}
	saveSession();
}

function appendLinks(textArea, allUrls, allTitles){
	var ul = createElementtsTable('ul', '', ''),
		appendParent = textArea.parentElement;
	
	ul.setAttribute('onmouseover' , 'addFocusImgs(this)');
	ul.setAttribute('onmouseout' , 'removeFocusImgs(this)');
	appendParent.prepend(ul);
	
	if (allUrls.length >= allTitles.length) {
		allUrls.forEach(function(item, indice){
			var li   = createElementtsTable('li', '', ''),
				li_2 = createElementtsTable('li', '', '');
			
			li.setAttribute('class' , 'odd');
			li_2.setAttribute('class' , 'even');
			li.setAttribute('onclick' , 'insertAttributesClick(this)');
			li_2.setAttribute('onclick' , 'insertAttributesClick(this)');
			li.setAttribute('onmousedown' , 'deleteLinkTitle(event, this)');
			li_2.setAttribute('onmousedown' , 'deleteLinkTitle(event, this)');
			
			li.textContent = item;
			if (allTitles[indice] !== undefined) {
				li_2.textContent = allTitles[indice].replace('>' , '');
				ul.appendChild(li_2);
			}
			
			ul.appendChild(li);
		});
	} else {
		allTitles.forEach(function(item, indice){
			var li   = createElementtsTable('li', '', ''),
				li_2 = createElementtsTable('li', '', '');
			
			li.setAttribute('class' , 'odd');
			li_2.setAttribute('class' , 'even');
			li.setAttribute('onclick' , 'insertAttributesClick(this)');
			li_2.setAttribute('onclick' , 'insertAttributesClick(this)');
			li.setAttribute('onmousedown' , 'deleteLinkTitle(event, this)');
			li_2.setAttribute('onmousedown' , 'deleteLinkTitle(event, this)');
			
			li_2.textContent = item.replace('>' , '');
			ul.appendChild(li_2);
			if (allUrls[indice] !== undefined) {
				li.textContent = allUrls[indice];
				ul.appendChild(li);
			}
		});
	}
	
	textArea.remove();
	saveSession();
}

function insertAttributesClick(elementt){
	var currenText = elementt.textContent,
		imgAlter   = document.querySelector('#root img:not(.edit_images)');
	
	if (__linkClicked) {
		if(confereSkips()){
			removeSkips();
		}
		
		if(imgAlter !== null){
			var currentUTM = __UTM;
			
			if (currentUTM === undefined) {
				currentUTM = '?utm';
			}
			
			if (elementt.classList.contains('even')) {
				imgAlter.alt = currenText;
				imgAlter.title = currenText;
			} else {
				if (currenText.indexOf('?') > -1) {
					currentUTM = currentUTM.replace('?' , '&');
				}
				var fullUrl = currenText + currentUTM;
				imgAlter.parentElement.href = fullUrl;
				imgAlter.parentElement.classList.add('checked');
				imgAlter.setAttribute('skip' , true);
				removeFocusImgs();
				addFocusImgs();
			}
			elementt.remove();
			saveSession();
		}
	} else {
		if (elementt.classList.contains('odd')) {
			window.open(currenText);
		}
	}
}
document.addEventListener('dragstart' , function(e){
	if(e.target.id.indexOf('img_drag_') > -1){
		__statusDrag = true;
	} else {
		__statusDrag = false;
	}
});

function deleteLinkTitle(event, elementt){
	if (event.button === 1) {
		elementt.remove();
	}
}

function assembleTemplate(){
	var allImages 	 	= document.querySelectorAll('.imagens_laterais div img'),
		arrayImages  	= [],
		arrayNumbers 	= [],
		arrayImagesSort = [],
		count 			= 0,
		status 			= true,
		qtdImages 		= allImages.length,
		arrayNumbersSort;
	
	allImages.forEach(function(item){
		var url = item.src;
		
		if (!(/\d{1,5}\.jpg|\d{1,5}\.png|\d{1,5}\.gif/g.test(url))) {
			status = false;
		}
	});
	
	if (qtdImages === 0) {
		status = false;
	}
	
	if (status) {
		allImages.forEach(function(item){
			var url  = item.src,
				name = url.split('/'),
				qtd  = name.length - 1;
			
			var currentname = name[qtd];
			var endOfString = currentname.match(/\d{1,5}\.jpg|\d{1,5}\.png|\d{1,5}\.gif/g);
			var numberImage = endOfString[0].match(/\d{1,5}/g);
			
			arrayNumbers.push(numberImage[0]);
		});
		
		arrayNumbersSort = arrayNumbers.sort();
		
		var interval = setInterval(function(){
			allImages.forEach(function(item){
				var url  = item.src,
					name = url.split('/'),
					qtd  = name.length - 1;
				
				var currentname = name[qtd];
				var endOfString = currentname.match(/\d{1,5}\.jpg|\d{1,5}\.png|\d{1,5}\.gif/g);
				var numberImage = endOfString[0].match(/\d{1,5}/g);
				if (arrayNumbersSort[count] === numberImage[0]) {
					arrayImagesSort.push(item);
					count++;
					if (allImages.length === arrayImagesSort.length) {
						clearInterval(interval);
						insertContent(arrayImagesSort, allImages);
					}
				}
				
			});
		}, 5);
	} else {
		openModal('<p style="margin-bottom: 10px;">As imagens devem estar ordenadas<br>Ex: (01.jpg - 02.jpg - 03.jpg)</p><span onclick="closeModal()">OK</span>');
	}
}

function insertContent(arrayImagesSort, allImages){
	var currentItem = 0,
		widthImages = 0,
		count 		= 0,
		countTDS 	= [],
		qtdLines,
		allLines,
		sizeItens   = 0,
		nextItem,
		add 		= false,
		i 			= 0;
	
	if (arrayImagesSort[0].naturalWidth < 690) {
		openModal('<p style="margin-bottom: 10px;">A primeira imagem deve preencher a linha inteira<br></p><span onclick="closeModal()">OK</span>');
	} else {
		arrayImagesSort.forEach(function(item, indice){
			allImages[indice].parentElement.remove();
			if (item.naturalWidth <= 700) {
				widthImages += item.naturalWidth;
			} else {
				widthImages += 700;
			}
			
			if (item.naturalWidth >= 700) {
				sizeItens = 700;
				add = true;
			} else {
				sizeItens += item.naturalWidth;
			}
			if (sizeItens >= 700) {
				i = 1;
				sizeItens = 0;
			} else {
				i++;
				var nextIndice = indice + 1;
				nextItem   = arrayImagesSort[nextIndice];
				if ((sizeItens + nextItem.naturalWidth) >= 700) {
					add = true;
				} else {
					add = false;
				}
			}
			if (add && item !== nextItem) {
				countTDS.push(i);
			}
		});
		
		qtdLines = widthImages / 700 - 1;
		
		while(count < qtdLines){
			addLine();
			count++;
		}
		
		allLines = document.querySelectorAll('#root table td a.empty');
		
		allLines.forEach(function(item, indice){
			var currentTR = item.parentElement.parentElement,
				qtdTds 	  = countTDS[indice];
			
			if (qtdTds > 1) {
				var widthTD = 700 / qtdTds;
				
				item.style.width = `${widthTD}px`;
				
				for(var ii = 1 ; ii < qtdTds ; ii++){
					criaTDS(currentTR, `${widthTD}px`);
				}
			}
		});
		
		allLines = document.querySelectorAll('#root table td a.empty');
		
		allLines.forEach(function(item, indice){
			item.appendChild(arrayImagesSort[indice]);
			item.classList.remove('empty');
			item.style.width = '';
		});
		saveSession();
	}
}

function editTemplate(event, section) {
	if (event.target.className.indexOf('edit_section') > -1) {
		if(document.querySelector('#div_edit') === null){
			var textarea  = document.createElement('textarea'),
				divEdit   = document.createElement('div'),
				spanClose = document.createElement('span'),
				spanSave  = document.createElement('span'),
				textTable;
			
			divEdit.id = 'div_edit';
			divEdit.appendChild(textarea);
			divEdit.appendChild(spanClose);
			divEdit.appendChild(spanSave);
			spanClose.setAttribute('class' , 'span_close');
			spanSave.setAttribute('class' , 'span_save');
			spanClose.textContent = 'X';
			spanSave.textContent = 'Save';
			textarea.addEventListener('input' , alterFields);
			spanClose.addEventListener('click' , function(){
				this.parentElement.remove();
				if (document.querySelector('.edit_template') !== null) {
					document.querySelector('.edit_template').classList.remove('edit_template');
				}
			});
			spanSave.addEventListener('click' , function(){
				saveTemplate();
				if (document.querySelector('.edit_template') !== null) {
					document.querySelector('.edit_template').classList.remove('edit_template');
				}
			});
			
			if(event.target.className === 'edit_section'){
				var lastIndice = section.children.length - 1
				textTable = section.children[lastIndice].innerHTML;
				if (document.querySelector('.edit_template') !== null) {
					document.querySelector('.edit_template').classList.remove('edit_template');
				}
				section.classList.add('edit_template');
				
				section.prepend(divEdit);
			} else if(event.target.className === 'edit_section head'){
				textTable = document.querySelector('head').innerHTML;
				if (document.querySelector('.edit_template') !== null) {
					document.querySelector('.edit_template').classList.remove('edit_template');
				}
				document.querySelector('.header').prepend(divEdit);
			}
			textarea.value = textTable;
		}
	}
}

function alterFields(){
	textAreaValue = this.value;
	if (document.querySelector('.edit_template') !== null) {
		var parent = this.parentElement.parentElement;
		var	lastItem = parent.children.length - 1;
		parent.children[lastItem].innerHTML = this.value;
	}
}

function saveTemplate() {
	var statusTemplate = document.querySelector('.edit_template');
	
	if(statusTemplate !== null){
		var saveElement = document.querySelector('.edit_template');
	} else {
		var saveElement = document.querySelector('head');
	}
	
	var id = document.querySelector('#id_template').value;
	
	if (statusTemplate !== null) {
		saveElement.classList.remove('edit_template');
		var paramName = saveElement.className;
		
	} else {
		var paramName = 'topheader';
	}
	
	document.querySelector('#div_edit').remove();
	
	if(statusTemplate !== null){
		var valueSave = saveElement.innerHTML.replace(/<span.*<\/?span>/g , '');
		textAreaValue = undefined;
	} else {
		if (textAreaValue !== undefined) {
			if (!(/newsletter.css/g.test(textAreaValue)) && !(/newsletter.js/g.test(textAreaValue))) {
				var valueSave = `<link rel="stylesheet" type="text/css" href="../assets/css/newsletter.css">
				<script type="text/javascript" src="newsletter.js"></script>
				${textAreaValue}`;
			} else if (!(/newsletter.css/g.test(textAreaValue))) {
				var valueSave = '<link rel="stylesheet" type="text/css" href="../assets/css/newsletter.css">' + textAreaValue;
			} else if (!(/newsletter.js/g.test(textAreaValue))) {
				var valueSave = '<script type="text/javascript" src="newsletter.js"></script>' + textAreaValue;
			} else {
				var valueSave = textAreaValue;
			}
			saveElement.innerHTML = valueSave;
		}
	}
	if (valueSave !== undefined) {
		var xhr = new XMLHttpRequest();
		xhr.onload = function(res){
			openModal('<p style="margin-bottom: 15px;">Template Salvo</p><span onclick="closeModal()">OK</span>');
		}
		xhr.open('put', 'https://newsletters.e-thinkers.com.br/template/'+id+'/'+paramName+'/'+getKey());
		xhr.setRequestHeader("Content-Type", "application/json");
		if (statusTemplate !== null) {
			xhr.send(JSON.stringify({text: '<div class="'+paramName+'" onmouseover="addButtonEdit(this)" onclick="editTemplate(event, this)">'+valueSave+'</div>'}));
		} else {
			xhr.send(JSON.stringify({text: '<head>'+valueSave+'</head>'}));
		}
	}
}

function addButtonEdit(sectionEdit){
	if (sectionEdit.querySelector('span.edit_section') === null) {
		if (sectionEdit.className === 'header') {
			var span_2 = document.createElement('span');
			span_2.setAttribute('class' , 'edit_section head');
			span_2.textContent = 'Edite o head';
			
			sectionEdit.prepend(span_2);
		}
		var span = document.createElement('span');
		span.classList.add('edit_section');
		span.textContent = `Edite o ${sectionEdit.className}`;
		
		sectionEdit.prepend(span);
	}
}

function saveNews(template, id){
	var xhr = new XMLHttpRequest();
	xhr.open('post', 'https://newsletters.e-thinkers.com.br/newsfinalizadas/add/' + id + '/' + getKey());
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.send(JSON.stringify({text: template}));
}

function getNewsFinalizadas(parameterName){
	var xhr = new XMLHttpRequest();
	xhr.onload = function(res){
		if (res) {
			addSelectShowNews(JSON.parse(res.srcElement.response));
		}
	}
	xhr.open('get', 'https://newsletters.e-thinkers.com.br/newsfinalizadas/' + __StoreId + '/' + getKey());
	xhr.send();
}

function addButtonResetHtml() {
	if(document.querySelector('#reset_html') !== null){
		document.querySelector('#reset_html').remove();
	}
	var buttonReset = document.createElement('span');
	buttonReset.id = 'reset_html';
	buttonReset.textContent = 'Limpar conteúdo';
	buttonReset.setAttribute('onclick' , 'resetHtml()');
	
	document.querySelector('tr.finalizar td').appendChild(buttonReset);
}

function addSelectShowNews(allnews){
	if(document.querySelector('#ver_news') !== null){
		document.querySelector('#ver_news').remove();
	}
	var select 		  = document.createElement('select'),
		optionDefault = document.createElement('option'),
		currentData   = [];
	
	optionDefault.value = '';
	optionDefault.textContent = 'News Finalizadas';
	optionDefault.selected = 'selected';
	select.id = 'ver_news';
	select.setAttribute('onchange' , 'openNews(this)');
	
	setTimeout(function(){
		allnews.forEach(function(dataSelects){
			var optionData = document.createElement('option'),
				idNews 	   = dataSelects.id,
				dataModify = dataSelects.dataCriacao.match(/(^\d{4}-\d{2}-\d{2})/g);
			
			optionData.textContent = dataModify[0] + '-news-' + idNews;
			optionData.value = window.location.origin + '/news?idLoja=' + __StoreId + '&data=' + dataModify[0] + '&news=' + idNews;
			
			select.appendChild(optionData);
			
			currentData.push(dataModify[0]);
		});
	},200);
	
	select.appendChild(optionDefault);
	document.querySelector('tr.finalizar td').appendChild(select);
}

function openNews(select){
	if(select.value !== ''){
		window.open(select.value);
	}
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

function resetHtml() {
	resetSession();
	window.location.reload();
}

function getKey() {
	var KeyUser = sessionStorage.getItem('KeyUser');
	
	return KeyUser;
}

function redirect(path) {
	window.location.href = path;
}