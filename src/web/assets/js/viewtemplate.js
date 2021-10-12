function $jq(seletor){
    return document.querySelector(seletor);
}

function $jqa(seletor){
    return document.querySelectorAll(seletor);
}

function requestTemplates() {
    var xhr = new XMLHttpRequest(),
        id  = window.location.pathname.match(/\/\d+/g)[0].replace('/' , '');
    
    xhr.onload = function(res){
        if (res){
            loadTemplate(res.srcElement.response);
        }
    }
    xhr.open('get', 'https://newsletters.e-thinkers.com.br/template/' + id + '/' + getKey());
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

window.onload = requestTemplates;
    
    function loadTemplate(res) {
    var response = JSON.parse(res),
        content  = $jq('.content-template'),
        header   = response.header.replace('onmouseover="addButtonEdit(this)"' , '').replace('editTemplate(event, this)' , ''),
        body     = response.body,
        footer   = response.footer.replace('onmouseover="addButtonEdit(this)"' , '').replace('editTemplate(event, this)' , '');
        
    content.innerHTML = header + body + footer;
}