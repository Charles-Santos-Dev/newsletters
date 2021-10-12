var showSrc;

function getNewsFinalizadas(){
	var xhr    = new XMLHttpRequest(),
		url	   = window.location.href.split(/\?|&/g),
		idLoja = url[1].match(/\d{1,9}/g)[0];
	xhr.onload = function(res){
		if(JSON.parse(res.srcElement.response)){
			returnNews(JSON.parse(res.srcElement.response));
		} else {
			redirect('/login');
		}
	}
    xhr.open('get', 'https://newsletters.e-thinkers.com.br/newsfinalizadas/' + idLoja + '/' + getKey());
	xhr.send();
}

window.onload = getNewsFinalizadas;

function returnNews(allNews){
	var url 	    = window.location.href.split(/\?|&/g),
		data 	    = url[2].match(/\d{4}-\d{2}-\d{2}/g)[0],
		idNews	    = url[3].match(/\d{1,3}/g)[0],
		count,
		newsShow;
		
		allNews.forEach(function(news, indice){
			var currentData   = news.dataCriacao.match(/\d{4}-\d{2}-\d{2}/g)[0],
				currentIdNews = news.id;
			if(currentIdNews === parseInt(idNews)){
				showSrc = news.newsFinalizadas;
				newsShow = news.newsFinalizadas.replace(/<(\/)?html>/g , '').replace(/<!DOCTYPE.*>/g , '');
			}
		});
		
		document.querySelector('html').innerHTML = newsShow.replace('<head>' , `<head>
		<link rel="stylesheet" type="text/css" href="../assets/css/newsletter.css">`);
		createButtonShowSrc();
}

function createButtonShowSrc(){
	var span = document.createElement('span');

	span.id = 'show_src';
	span.textContent = 'Exibir código fonte';
	span.setAttribute('onclick' , 'showSrcWindow()');

	document.querySelector('body').prepend(span);
}

function showSrcWindow(){
	var winTemplate = window.open();

		showSrc = showSrc.replace(/amp;/g , '');

		winTemplate.document.body.innerHTML = '<pre></pre>';
		winTemplate.document.querySelector('head').innerHTML = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';
		winTemplate.document.querySelector('pre').textContent = showSrc;
}

function getKey() {
	var KeyUser = sessionStorage.getItem('KeyUser');
	
	return KeyUser;
}

function redirect(path) {
	window.location.href = path;
}