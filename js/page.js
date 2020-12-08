function setStorage(name, value) {
    window.localStorage.setItem(name, JSON.stringify(value));
}
  
function getStorage(name, subst = null) {
    return JSON.parse(window.localStorage.getItem(name) || subst);
}
  
function delStorage(name) {
    localStorage.removeItem(name);
}
  

var d1 = "";
// let sheet = "1";
let sheet = "default";

let newsData = [];
let title_st = '';

function setPageKey(title, key){
    setStorage('keyPages', key);
    setStorage('titlePages', title);
}

//  https://docs.google.com/spreadsheets/d/e/2PACX-1vSdWcq5GQH0TNwLJKnx-MAjqzAXTxjJ7o5q5HTyN8K90bxYQS0hFWizoy-qsqzdetv5m5fHRpdqiY5p/pubhtml

let keyTableNews ="";

let url ;
const title = document.getElementById("title__id");
const text = document.getElementById("paragraphs__id");

function readPage(){
    url  = "https://spreadsheets.google.com/feeds/list/"+keyTableNews+"/"+sheet+"/public/values?alt=json"
    $.getJSON(url,
        
       function (data) {
            data = data['feed']['entry'];
            console.log(data);
            let text_tmp = "";
            for (let i=0; i<data.length;i++){
                let text = data[i]["gsx$абзац"]["$t"];
                console.log("text_tmp");


                const regex = String.fromCharCode(10);
                // '0d0a';
                text = text.replace(regex,'<br>');
                console.log(text);
                text_tmp += `<p class="default_par"> ${text} </p>`
            

                // text.innerText = text_tmp;
                
                let images = data[i]["gsx$фото"]["$t"].split(",");
                let codeImages = [] 
                let photoPath = ""
                for(let j=0; j<images.length; j++){
                    let start = images[j].indexOf('?id=') + 4;
                    let ss = images[j].substr(start);
                    codeImages.push(ss);
                    im = "http://drive.google.com/uc?export=view&id="+ss;
                    text_tmp += `<br><p class="default_par"> <img src="${im}" alt="" width = "95%"> </p>`

                }
            }
            
            text.innerHTML = text_tmp;      
        }

        
    );
    
}

window.onscroll = function() {
    var scrollElem = document.getElementById("scrollToTop");
    if (document.body.scrollTop > document.documentElement.clientHeight) {
       scrollElem.style.opacity = "1";
    } else {
        scrollElem.style.opacity = "0.5";
    }
 }

var timeOut;
function goUp() {
    // window.scrollBy(0,-2000);
    var top = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
    if(top > 0) {
       window.scrollBy(0,-20);
       timeOut = setTimeout('goUp()',20);
    } else clearTimeout(timeOut);
}

const scroolBtn = document.getElementById("scrollToTop");

scroolBtn.addEventListener("click", ()=>{
    goUp();
});

keyTableNews = getStorage('keyPages');
if (keyTableNews !== undefined){
    title_st = getStorage('titlePages');
    const title_dom = document.getElementById('title__id');
    title_dom.innerHTML = title_st;
    readPage();
}
