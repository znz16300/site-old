var d1 = "";
let sheet2 = "default";
let shName = "Відповіді форми (1)";
let title_st = "";


const title = document.getElementById("title__id");
const text = document.getElementById("paragraphs__id");

let burgerItem_1 = document.querySelector(".header__burger");
let menu_1 = document.querySelector(".header__nav");
let header_1 = document.querySelector(".header");
let activeLink_1 = document.querySelector(".list-item_active");
const loader = document.querySelector(".loader");




function changeOverflow_1() {
  let overflowY = document.body.style.overflowY;
  document.body.style.overflowY = overflowY != "hidden" ? "hidden" : "visible";
  document.body.style.paddingRight =
    overflowY != "hidden" ? `${getScrollbarWidth_1()}px` : "0";
}
function getScrollbarWidth_1() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}
function toggleMenu_1() {
  menu_1.classList.toggle("header__nav-active");
  burgerItem_1.classList.toggle("header__burger-active");
  header_1.classList.toggle("header_active");
  changeOverflow_1();
}

burgerItem_1.addEventListener("click", () => toggleMenu_1());
menu_1.addEventListener("click", (e) => {
  if (!e.target.closest(".header__list")) toggleMenu_1();
});

let step = 0;

function readPage(key) {
  //   let url  = "https://spreadsheets.google.com/feeds/list/"+key+"/"+sheet2+"/public/values?alt=json"
  shName = "Аркуш1";
  let url =
    "https://schooltools.pythonanywhere.com/getpage/" + key + "/" + shName;
  //  let url = 'https://zelenskiy.pythonanywhere.com/getpage/'+key+'/'+shName;
  //  let url = 'http://127.0.0.1:5000/getpage/'+key+'/'+shName;
  //let url = 'http://zelenskiy.pythonanywhere.com/getblock/'+key+'/'+shName;
  request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      data = JSON.parse(request.responseText);
      data = data["feed"]["entry"];
      let text_tmp = "";
      for (let i = 0; i < data.length; i++) {
        if (title_st === data[i]["gsx$розділ"]["$t"]) {
          let text = data[i]["gsx$абзац"]["$t"];
          let tip = data[i]["gsx$тип1-картки2-абзаци"]["$t"];
          let link = data[i]["gsx$кнопказпосиланням"];
          if (link !== undefined) {
            link = link["$t"];
          } else continue;
          // let link = data[i]["gsx$кнопказпосиланням"]["$t"];
          let images = data[i]["gsx$фото"]["$t"].split(",");
          let image = images[0];

          if (tip === "1") {
            document.getElementById("paragraphs__id").style.display = "flex";
            text = `
                        <div class="sect-1 shake-hard " style="text-align: center; text-decoration: none;">
                        <a href="${link}" class="a_card"  target="_blank">
                                    <div class="item1"><img
                                        width="180px"
                                     src="${image}" alt=""></div>
                                     <div class="item2">${text}</div></a>
                        </div>
                        `;
            text_tmp += `${text}`;
          } else {
            document.getElementById("paragraphs__id").style.display = "block";
            if (tip === "3") {
              text_tmp += `<div style="width:500px;padding-top: 50px; font-size: 18px; color: #545454;">${text}</div>`;
            } else {
              if (link !== "#") {
                text_tmp += `
                                <div style="line-height: 1.5; font-size: 18px;">
                                    <a href="${link}">
                                        ${text}
                                    </a>
                                </div>`;
              } else {
                text_tmp += `<div  style="line-height: 1.5; font-size: 18px;">${text}</div>`;
              }
            }
            let codeImages = [];
            let photoPath = "";

            let wImage = data[i]["gsx$ширинамалюнка"]["$t"];
            for (let j = 0; j < images.length; j++) {
              let x = images[j].indexOf("?id=");
              if (x > -1) {
                //Це якщо малюнок відправлено формою

                let start = images[j].indexOf("?id=") + 4;
                let ss = images[j].substr(start);

                im = "http://drive.google.com/uc?export=view&id=" + ss;
                if (wImage !== "") {
                  text_tmp =
                    `<img src="${im}" alt="" width = "${wImage}%">` + text_tmp;
                }
              } else {
                x = images[j].indexOf("/file/d/");
                if (false) {
                } else {
                  //Якщо малюнок по посиланню з іншого ресурсу
                  im = images[j];
                  if (wImage !== "") {
                    text_tmp =
                      `<img src="${im}" alt="" width = "${wImage}%"> ` +
                      text_tmp;
                  }
                }
              }
            }
          }
          if (tip === "3") {
            document.getElementById("paragraphs__id").style.display = "flex";
            // document.getElementById('rr').style.width[0] = 300;
          }
          const regex = String.fromCharCode(10);
        }
      }
      if (text !== null) text.innerHTML = text_tmp;
      // ScrollUpShow()
      loader.classList.add("hide-loader");
    } else {
      // We reached our target server, but it returned an error
      console.log("Upps ");
      //   if (step < 25)
      //     readPage(key);
    }
  };
  
  request.onerror = function () {
    // There was a connection error of some sort
  };
  request.send();
}

window.onscroll = function () {
  var scrollElem = document.getElementById("scrollToTop");
  if (document.body.scrollTop > document.documentElement.clientHeight) {
    scrollElem.style.opacity = "1";
  } else {
    //scrollElem.style.opacity = "0.5";
  }
};

var timeOut;
function goUp() {
  // window.scrollBy(0,-2000);
  var top = Math.max(
    document.body.scrollTop,
    document.documentElement.scrollTop
  );
  if (top > 0) {
    window.scrollBy(0, -20);
    timeOut = setTimeout("goUp()", 20);
  } else clearTimeout(timeOut);
}

const scroolBtn = document.getElementById("scrollToTop");
scroolBtn.addEventListener("click", () => {
  goUp();
});

if (true) {
  const title_ = document.getElementById("title__");

  const title_dom = document.getElementById("title__id");
  // if (title_ !== null){
  //     title_.innerText = title_st;
  //     title_dom.innerHTML = title_st;
  // }
  let strGET = window.location.search.replace("?", "").split("&");
  let par_1 = strGET[0].split("=");
  let par_2 = strGET[1].split("=");
  // const title_ = decodeURI(par_1[1])
  // const title_dom = decodeURI(par_1[1])
  title_st = decodeURI(par_1[1]);
  const keyT = par_2[1];
  if (title_ !== null) {
    title_.innerText = title_st;
    title_dom.innerHTML = title_st;
  }

  function ScrollUpShow() {
    // const heightMainBlock2 = document.documentElement.clientHeight ;
    if (window.pageYOffset >= 200) {
      document.getElementById("scrollToTop").style.display = "block";
    } else {
      document.getElementById("scrollToTop").style.display = "none";
    }
  }


    function ScrollUpShow(){
        // const heightMainBlock2 = document.documentElement.clientHeight ;        
        if (window.pageYOffset>=200){
            document.getElementById("scrollToTop").style.display ='block';   
        } else {
            document.getElementById("scrollToTop").style.display =  'none';
        }
    }

    

    readPage(keyT);
}