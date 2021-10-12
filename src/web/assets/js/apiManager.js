function upload(filename, file){
    var currentStore = __StoreName.replace(/\s{1,99}/g , '_'),
        currentDateFull,
        currentDay,
        currentMounth,
        currentYear;

        if (__DATEFIRE === undefined) {
            var date   = new Date();
            var year   = date.getFullYear();
            var mounth = date.getMonth() + 1;
            var day    = date.getDate();

            currentDay    = day;
            currentMounth = mounth;
            currentYear   = year;
        } else {
            currentMounth = __DATEFIRE[1];
            currentDay = __DATEFIRE[0];
            currentYear = (__DATEFIRE[2].length === 2) ? `20${__DATEFIRE[2]}` : __DATEFIRE[2];
        }

    currentDateFull = `${currentYear}/${currentMounth}/${currentDay}`;
    
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function(res){
        var response = (res.srcElement) ? JSON.parse(res.srcElement.response) : null;
        if(response){
            loadImg(response.src);
        }
        setTimeout(function(){
            sortIdImage();
        }, 500);
    }
     xhr.open('post', `https://newsletters.e-thinkers.com.br/upload/${currentStore}/${currentDateFull}`);
    //xhr.open('post', `https://newsletters.e-thinkers.com.br//upload/${currentStore}`);

    xhr.send(file);
}

function downloadBuckets(pathImg, numberSplit){
    var xhr        = new XMLHttpRequest(),
        prefixFull = __StoreName.replace(/\s{1,99}/g , '_');

    loadingBuckets();

    if (pathImg !== undefined){
        prefixFull += pathImg;
    }

    xhr.onload = function(res){
        var response  = (res.srcElement) ? JSON.parse(res.srcElement.response) : null,
            buckets   = [],
            urlImages = [];
        response.forEach(function(item){
            buckets.push(item.Key);
            urlImages.push(item.url);
        });
        if(numberSplit < 3 || numberSplit === undefined){
            showBuckets(buckets, pathImg);
        } else {
            urlImages.forEach(function (item) {
                loadImg(item);
            });
            document.querySelector('.show_buckets').remove();
            closeModal();
        }
        removeLoadingBuckets();
        afterLoad();
    }

     xhr.open('get', `https://newsletters.e-thinkers.com.br/download/` + prefixFull);

    xhr.send();
}
