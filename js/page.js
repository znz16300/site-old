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

//  https://docs.google.com/spreadsheets/d/e/2PACX-1vSdWcq5GQH0TNwLJKnx-MAjqzAXTxjJ7o5q5HTyN8K90bxYQS0hFWizoy-qsqzdetv5m5fHRpdqiY5p/pubhtml

let keyTableNews ="1F6QVr9WNio-_ODmnIlMTSHeSQxLOjgnd0nYB1_z0BeI";
var url  = "https://spreadsheets.google.com/feeds/list/"+keyTableNews+"/"+sheet+"/public/values?alt=json";
const title = document.getElementById("title__id");
const text = document.getElementById("paragraphs__id");

function readPage(){
    $.getJSON(url,
        
       function (data) {
            data = data['feed']['entry'];
            console.log(data);
            let text_tmp = "";
            for (let i=0; i<data.length;i++){
                text_tmp += `<p class="default_par"> ${data[i]["gsx$абзац"]["$t"]} </p>`
            

                // text.innerText = text_tmp;
                
                let images = data[i]["gsx$фото"]["$t"].split(",");
                let codeImages = [] 
                let photoPath = ""
                for(let j=0; j<images.length; j++){
                    let start = images[j].indexOf('?id=') + 4;
                    let ss = images[j].substr(start);
                    codeImages.push(ss);
                    im = "http://drive.google.com/uc?export=view&id="+ss;
                    text_tmp += `<p class="default_par"> <img src="${im}" alt="" width = "95%"> </p>`

                }
            }
            text.innerHTML = text_tmp;


            // for (let i=0; i<data.length;i++){
            //     console.log("============");
            //     console.log(data[i]);
            //     if (data[i]["gsx$show"]["$t"] !== ""){
            //         d1 = data[i];
            //         // console.log(d1);
            //         let images = d1["gsx$фотонеобовязково"]["$t"].split(",");
            //         let codeImages = [] 
            //         let photoPath = ""
            //         for(let j=0; j<images.length; j++){
            //             let start = images[j].indexOf('?id=') + 4;
            //             // let end  = images[j].indexOf('/edit');
            //             // let l = end - start -1;
            //             let ss = images[j].substr(start);
            //             codeImages.push(ss);
            //         }
                    
            //         let im = ""
            //         if (codeImages[0].length === 0) {
            //             im = './assets/images/docum.png';
            //         } else {
            //             im = "http://drive.google.com/uc?export=view&id="+codeImages[0]
            //         }
            //         // nophoto.png
            //         let newsOne = {
            //             "id": String(i+1),
            //             "name": d1["gsx$назвадокументу"]["$t"],
            //             "img": im,
            //             "type": d1["gsx$посиланнянадокумент"]["$t"],
            //             "breed": "",
            //             "description": d1["gsx$файлдокументу"]["$t"],
            //             "age": d1["gsx$позначкачасу"]["$t"],
            //             "inoculations": ["none"],
            //             "diseases": ["none"],
            //             "parasites": ["none"]
            //         }
            //         newsData.push(newsOne);
            //     }
                
            // }
            // // console.log(newsData);   
            // calculatePages();
            // drawPage(currentPageBtn.textContent);
            // changeDisableStatus(currentPageBtn.textContent);         
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


readPage();