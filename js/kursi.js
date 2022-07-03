// const shevchenko = require("shevchenko");

// const url = "http://127.0.0.1:5000/";
const url = "https://schooltools.pythonanywhere.com/";
const golova = 'Орсагош Оксані Валеріївні'
const zaklad = 'КОЗ "Куликівський ЗЗСО І-ІІІ ст."'
let glData;
let teachers = new Set();

const teachList = document.getElementById("teach_id");
// const table = document.getElementById('table_id')
const teachCombo = document.getElementById("teach_id");
const divTable = document.querySelector(".table");

teachList.addEventListener("change", () => {
  divTable.innerHTML = ` <table  id="table_id" class="table"></table>`;
  const table = document.getElementById("table_id");
  let head = document.createElement("thead");
  let tBody = document.createElement("tbody");
  head.classList.add("cel_row");
  head.innerHTML = `       
            <tr>


                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Тема</div> 
                                        </div>
                                    </th>
                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Годин</div> 
                                        </div>
                                    </th>
                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Номер</div> 
                                        </div>
                                    </th>

                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Дата</div> 
                                        </div>
                                    </th>
                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Суб'єкт ПК</div> 
                                        </div>
                                    </th>
                                    <th class="cel_h" hidden>
                                        <div class="cel_div">
                                            <div class="sp_1">Форма ПК</div> 
                                        </div>
                                    </th>
                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1">Докум.</div> 
                                        </div>
                                    </th>

                                    <th class="cel_h">
                                        <div class="cel_div">
                                            <div class="sp_1 >&#2714</div> 
                                        </div>
                                    </th>
            </tr>     

    `;
  table.append(head);
  table.append(tBody);

  let buttonBlock = document.createElement("div");
  let button = document.createElement("button");
  buttonBlock.classList.add("button__block");
  button.classList.add("button__klopot");
  button.innerText = "Сформувати клопотання";
  buttonBlock.append(button);
  divTable.append(buttonBlock);

  let buttonBlock2 = document.createElement("div");
  let buttonAdd = document.createElement("button");
  buttonBlock2.classList.add("button__block");
  buttonAdd.classList.add("button__klopot");
  buttonAdd.innerText = "Додати нові курси";
  buttonBlock2.append(buttonAdd);
  divTable.append(buttonBlock2);

  let teachName = teachCombo.value;
  let dat = glData[0].data;
  let ii = 0;
  // Час уведення ${r[0]}
  for (r of dat) {
    if (teachName == r[1]) {
      let row = document.createElement("tr");

      let r88 = "";
      if (r[8] !== "") {
        let r8 = imgFromGoogleToHtml(r[8]);
        r88 = `<a class="popup_image" href="${r8}" target="_blank"><div class="td_a_img"><img class="min_img" src="./assets/icons/ospr.png"></div></a>`;
      } else {
        r88 = "";
      }
      row.setAttribute("id", "ii_" + String(ii));
      row.setAttribute("title", `Дата та час уведення: ${r[0]}`);
      row.innerHTML = `


            <td class="row__title truncate-text">${r[2]}</td>
            <td class="row__long">${r[3]}</td>
            <td class="wwrap_no">${r[4]}</td>
            <td class="row__date">${r[5]}</td>
            <td class="row__subj">${r[6]}</td>
            <td class="row__forma" hidden>${r[7]}</td>
            <td>${r88}</td>
            <td><input class="chk_clas" type="checkbox"></td>
            `;
      tBody.append(row);
    }
    ii++;
  }

  buttonAdd.addEventListener("click", ()=>{
    document.location.href ="https://docs.google.com/forms/d/e/1FAIpQLSe6ghl4Quw7gCGBwbgUz1V4GilJQrzk1NM1Hxyp79pkOI8ceg/viewform?usp=sf_link"
  })

  function fullNameToInic(s){
    let n = s.indexOf(' ')
    let prizv = s.substr(0, n)    
    s = s.substr(n+1)
    n = s.indexOf(' ')
    let nam = s.substr(0, n) 
    let fath = s.substr(n+1)    
    return prizv + ' ' + nam[0] + '.' + fath[0] +'.'
  }
  
  function fullNameToParts(s){
    let n = s.indexOf(' ')
    let prizv = s.substr(0, n)    
    s = s.substr(n+1)
    n = s.indexOf(' ')
    let nam = s.substr(0, n) 
    let fath = s.substr(n+1)  
    let gender 
    if (s.substr(-1) === 'ч') gender = 'male'; else gender = 'female'    
    return {
      gender: gender, 
      firstName: nam,
      middleName: fath,
      lastName: prizv
    };

  }

  button.addEventListener("click", () => {
    let sp = [];
    for (let i = 0; i < tBody.childNodes.length; i++) {
      const ch = tBody.childNodes[i].querySelector(".chk_clas");
      if (ch.checked) {
        let title = tBody.childNodes[i].querySelector(".row__title");
        let long = tBody.childNodes[i].querySelector(".row__long");
        let num = tBody.childNodes[i].querySelector(".wwrap_no");
        let date = tBody.childNodes[i].querySelector(".row__date");
        let subj = tBody.childNodes[i].querySelector(".row__subj");
        let forma = tBody.childNodes[i].querySelector(".row__forma");
        let rec = {
            'title': title.innerText,
            'long': long.innerText,
            'num': num.innerText,
            'date': date.innerText,
            'subj': subj.innerText,
            'forma': forma.innerText,
        }
        sp.push(rec);
      }
      //
    }
    console.log(shevchenko.inGenitive(fullNameToParts(teachCombo.value)))
    let s = shevchenko.inGenitive(fullNameToParts(teachCombo.value))
    let teachRod = s.lastName + " " + s.firstName + " " + s.middleName
    if (sp.length > 0){
      console.log(sp);
      let dat = new Date;
      console.log(formatDate(dat));
      let context = {
        'teacher':teachRod,
        // 'teacher':teachCombo.value,
        'teacherINIC':fullNameToInic(teachCombo.value),
        // 'kursi': sp,
        'golova': golova,
        'zaklad': zaklad,
        'date': formatDate(dat),
        'file': 'klopot.docx',
      }
      s = ''
      let sym = ''
      for (let i = 0; i < sp.length; i++) {
        context['title'+i] = sp[i]['title']
        if (i === sp.length-1) sym = '.'; else sym = ';'
        s += '-' + "\t" + 'від ' +sp[i]['date'] + 
          ', реєстраційний номер - ' + sp[i]['num'] +
          ', кількість годин - ' + sp[i]['long'] + 
          ', форма підвищення кваліфікації - інституційна (' + sp[i]['forma'] + ')' +
          ', навчання за програмою підвищення кваліфікації ('+sp[i]['subj'] +')'+sym+'' + "\n"
      }
      let s1, s2, p1, p2
      if (sp.length === 1){
        s1 = ''
        s2 = 'у'
        p1 = 'а'
        p2 = 'у'
      } else {
        s1 = 'и'
        s2 = 'ів'
        p1 = 'и'
        p2 = 'ів'
      }
      context['list'] = s
      context['s1'] = s1
      context['s2'] = s2
      context['p1'] = p1
      context['p2'] = p2
     
      $.ajax({
        type : "POST",
        url : url+"getFileKursi/",
        data : context,
        cache: false,
        success: function(data){
            document.location.href = url+"test/"+data+"/";
        }
    });

    } else {
      alert('Ви нічого не вибрали');
    }
    
  });
});

function formatDate(date) {

  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() % 100;
  if (yy < 10) yy = '0' + yy;

  return dd + '.' + mm + '.20' + yy;
}

function imgFromGoogleToHtml(img) {
  let start = img.indexOf("?id=") + 4;
  let ss = img.substr(start);
  return "http://drive.google.com/uc?export=view&id=" + ss;
}

function getCol(dat, numTable, name) {
  header = dat[numTable].header[0];
  for (let col = 0; col < header.length; col++) {
    if (name === header[col]) {
      return col;
    }
  }
}

function sortSet(set) {
  const entries = [];
  for (const member of set) {
    entries.push(member);
  }
  set.clear();
  for (const entry of entries.sort()) {
    set.add(entry);
  }
  return set;
}

let readKursi = () => {
  $.getJSON(url + "getmultiblock/" + key, function (data) {
    glData = data;
    let dat = glData[0].data;
    for (r of dat) {
      teachers.add(r[1]);
    }
    sortSet(teachers);
    let i = 0;
    for (t of teachers) {
      let opt = document.createElement("option");
      opt.setAttribute("id", "ii_" + String(i++));
      opt.classList.add("opt_cl");
      opt.innerText = t;
      teachList.append(opt);
    }
  });
};

// readStorage();

//TODO ---- devmode
let key = "1PrzC3ODe_HSdcn7kGxGJZBWW5vHb__uDv9U3zD-IE5E";
let sheet = "Відповіді форми (1)";

readKursi();


// https://shevchenko-js.tooleks.com/#usageExample