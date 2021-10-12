function addFields(e, buttonAddStore){
	var span   = buttonAddStore.querySelector('span'),
		input  = buttonAddStore.querySelector('input[type="text"]'),
		submit = buttonAddStore.querySelector('input[type="submit"]'),
		target = e.target;

	if (span.classList.contains('display-none')) {
		if (target !== input && target !== submit) {
			span.classList.remove('display-none');
			input.classList.add('display-none');
			submit.classList.add('display-none');
			input.value = '';
		}
	} else {
		input.classList.remove('display-none');
		span.classList.add('display-none');
		submit.classList.remove('display-none');
	}
}

function addNewStore(){
	var xhr   	  = new XMLHttpRequest(),
		nameStore = document.querySelector('.adicionar_loja input[type="text"]').value;
	
	if (nameStore !== '') {
		setTimeout(function(){
			showModels();
		}, 500);
		xhr.open('post', 'https://newsletters.e-thinkers.com.br/loja/save/' + nameStore + '/' + getKey());
		xhr.setRequestHeader("Content-Type", "application/json");
	    xhr.send();
    }
}

function deleteStore(id){
	var xhr = new XMLHttpRequest();
	
	xhr.onload = function(){
		setTimeout(function(){
			showModels();
		}, 200);
	}
	xhr.open('delete', 'https://newsletters.e-thinkers.com.br/loja/delete/' + id);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();
}

function notification(id){
	openModal('<p style="margin-bottom: 10px;">Deseja realmente desabilitar essa loja?</p><span class="yes" onclick="EditStatusStore(' + id + ',' +  false + ')">Sim</span></p><span class="not" onclick="closeModal()">Não</span>');
}

function EditStatusStore(id, status){
	var xhr = new XMLHttpRequest();
	
		setTimeout(function(){
			showModels();
			closeModal();
		}, 1000);
		
	xhr.open('put', 'https://newsletters.e-thinkers.com.br/loja/edit/' + id + '/' + status + '/' + getKey());
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send();
}

function showBuckets(buckets, pathImg){
    var currentBucket = [],
		numberSplit;

    if (pathImg !== undefined){
		numberSplit = pathImg.split('/').length
	} else {
		numberSplit = 1;
	}
    updateTitle(numberSplit);

	if (document.querySelector('.level_up') !== null){
		document.querySelector('.level_up').setAttribute('onclick' , 'levelUp(this,' + numberSplit + ')');
	}
    buckets.forEach(function(item){
        if (currentBucket.indexOf(item.split('/')[numberSplit]) < 0) {
            currentBucket.push(item.split('/')[numberSplit]);
        }
    });

    currentBucket = currentBucket.sort();

	createElementsBuckets(currentBucket, buckets, pathImg, numberSplit);
}

function createElementsBuckets(currentBucket, buckets, pathImg, numberSplit){
	if (pathImg === undefined){
		var replacePathImg = '';
	} else {
		var replacePathImg = pathImg;
	}
	removebuckets();
	if (!(document.querySelector('.modal-back-ground').classList.contains('open'))){
		var divShowBuckets = document.createElement('div'),
			spanClose 	   = document.createElement('span'),
			spanLevel 	   = document.createElement('span'),
			h3Title 	   = document.createElement('h3');

		removeImages();

		spanClose.setAttribute('class' , 'buttonClose');
		spanClose.setAttribute('onclick' , 'closeShowBuckets(this)');
		h3Title.setAttribute('class' , 'title_bucket');
		spanLevel.setAttribute('class' , 'level_up');
		spanLevel.setAttribute('title' , 'Voltar');
		h3Title.textContent = 'Ano';
		spanClose.textContent = 'X';
		divShowBuckets.append(h3Title);
		divShowBuckets.append(spanClose);
		divShowBuckets.append(spanLevel);
		divShowBuckets.setAttribute('class' , 'show_buckets');

		currentBucket.forEach(function(item){
			var spanShowBuckets = document.createElement('span');

			spanShowBuckets.setAttribute('class' , 'bucket');
			spanShowBuckets.setAttribute('path_image' , replacePathImg);

			spanShowBuckets.textContent = item;
			spanShowBuckets.setAttribute('onclick' , 'getBuckets(this)');

			divShowBuckets.appendChild(spanShowBuckets);
		});

		openModal(divShowBuckets);

	} else {
		currentBucket.forEach(function(item){
			if(item !== '01'){
				var spanShowBuckets = document.createElement('span');
	
				spanShowBuckets.setAttribute('class' , 'bucket');
				spanShowBuckets.setAttribute('path_image' , replacePathImg);
	
				spanShowBuckets.textContent = item;
				spanShowBuckets.setAttribute('onclick' , 'getBuckets(this,' + numberSplit + ')');
	
				document.querySelector('.show_buckets').appendChild(spanShowBuckets);
			}
		});
	}
}

function removeImages() {
	if (document.querySelectorAll('.imagens_laterais div').length > 0){
		document.querySelectorAll('.imagens_laterais div').forEach(function(item){
			item.remove();
		});
	}
}

function removebuckets() {
	document.querySelectorAll('.show_buckets span').forEach(function(item){
		if(!(item.classList.contains('buttonClose')) && !(item.classList.contains('level_up'))){
			item.remove();
		}
	});
}

function getBuckets(span, numberSplit) {
	var pathImg = span.getAttribute('path_image') + '/' + span.textContent;
	downloadBuckets(pathImg, numberSplit);
}

function closeShowBuckets(close) {
	close.parentElement.remove();
	closeModal();
}

function levelUp(spanLevel, numberSplit) {
	var numberDec   = numberSplit - 1,
		currentPath = spanLevel.nextSibling.getAttribute('path_image').split('/'),
		lastIndice  = currentPath.length - 1,
		pathDec 	= '';

		currentPath.forEach(function (path, indice) {
			if (indice < lastIndice && path !== ''){
				pathDec += '/' + path;
			}
		});

	downloadBuckets(pathDec, numberDec);

	spanLevel.setAttribute('onclick' , 'levelUp(this,' + numberDec + ')');
	updateTitle(numberDec);
}

function loadingBuckets() {
	if (document.querySelector('.modal-content')!== null){
		document.querySelector('.modal-content').classList.add('loading');
	}
}

function removeLoadingBuckets() {
	document.querySelector('.modal-content').classList.remove('loading');
}

function updateTitle(numberSplit) {
	if (document.querySelector('.title_bucket') !== null){
		var titleBucket = document.querySelector('.title_bucket');

		if(numberSplit === 1){
			titleBucket.textContent = 'Ano';
		}

		if(numberSplit === 2){
			titleBucket.textContent = 'Mês';
		}
		if(numberSplit === 3){
			titleBucket.textContent = 'Dia';
		}
	}
}
function beforeLoad() {
	var butWait = document.querySelector('.show_images').classList.add('loading');
}

function afterLoad() {
	var butWait = document.querySelector('.show_images').classList.remove('loading');
}

function loadBuckets() {
	beforeLoad();
	downloadBuckets();
}