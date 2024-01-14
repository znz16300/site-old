// <<<<<<< HEAD
//     const btnKursi = document.getElementById("btnKursi");
//     console.log(66666666)
//     if (btnKursi !=null){
//         btnKursi.addEventListener('click', ()=>{
//             alert(1111)
//         })
//     }
// =======
// const shevchenko = require("shevchenko");

// const url = "http://127.0.0.1:5000/";
const url = "https://schooltools.pythonanywhere.com/";
// const url = "https://zelenskiy.pythonanywhere.com/";
const golova = 'Орсагош Оксані Валеріївні'
const zaklad = 'Куликівського ліцею'
let glData;
let teachers = new Set();

// стара таблиця
// const COL_DATA_TIME = 0
// const COL_TEACHER = 1
// const COL_TITLE = 2
// const COL_GODIN = 3
// const COL_NUM_DOCUM = 4
// const COL_DATE_DOCUM = 5
// const COL_PLATFORM = 6
// const COL_FORMA = 7
// const COL_DOCUM = 8
// const COL_PROGRAM = 9
// const COL_EMAIL = 10
// const COL_NEED_ZARAH = 11
// const COL_INCLUZ = 12
// const COL_TIP_DOCUM = 13
// const COL_PSIHO = 14
// const COL_PEDRADA = 15
// const COL_ATEST_YEAR = 16

// нова таблиця
const COL_DATA_TIME = 0
const COL_TEACHER = 2
const COL_TITLE = 3
const COL_GODIN = 4
const COL_NUM_DOCUM = 8
const COL_DATE_DOCUM = 9
const COL_PLATFORM = 10
const COL_FORMA = 11
const COL_DOCUM = 12
const COL_PROGRAM = 13
const COL_EMAIL = 1
const COL_NEED_ZARAH = 14
const COL_INCLUZ = 5
const COL_TIP_DOCUM = 7
const COL_PSIHO = 6
const COL_PEDRADA = 15
const COL_ATEST_YEAR = 16

const teachList = document.getElementById("teach_id");
const teachCombo = document.getElementById("teach_id");
const divTable = document.querySelector(".table");
const loader = document.querySelector(".loader");


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

  const buttonBlock = document.createElement("div");
  buttonBlock.classList.add("button__block");

  const chbBlock = document.createElement("div");
  chbBlock.classList.add("chb__klopot");

  

  const chbox = document.createElement("input");
  chbox.setAttribute("type", "checkbox");
  chbox.setAttribute("id", "checkbox");
  chbox.checked = true;

  const chboxLabel = document.createElement("label");
  chboxLabel.setAttribute("for", "checkbox");
  chboxLabel.innerText = 'приховати старі';
  chbox.addEventListener('change', () => {
    // Шукаю всі сірі рядки і роблю їх невидимими якщо вибрано
    const trGray = document.querySelectorAll('tr.gray_row');
    
    trGray.forEach(elem => {
      if (chbox.checked) {
        elem.classList.add('tr_hide');
      } else {
        elem.classList.remove('tr_hide');
      }
    })
   

  })  
  chbBlock.append(chbox, chboxLabel);
  buttonBlock.append(chbBlock);

  const btnBl2 = document.createElement("div");

  const button = document.createElement("button");  
  button.classList.add("button__klopot");
  button.setAttribute('id', 'make_klop');
  button.innerText = "Сформувати клопотання";

  divTable.append(buttonBlock);
  const buttonAdd = document.createElement("button");
  buttonAdd.classList.add("button__klopot");
  buttonAdd.setAttribute('id', 'add_kurs');
  buttonAdd.innerText = "Додати нові курси";
  
  
  btnBl2.append(button, buttonAdd);
  buttonBlock.append(btnBl2);

  const compareDates = (a, b) => {
    const dateA = new Date(a[COL_DATE_DOCUM].split('.').reverse().join('-'));
    const dateB = new Date(b[COL_DATE_DOCUM].split('.').reverse().join('-'));
    return dateA - dateB;
  };

  const teachName = teachCombo.value;
  const dat = glData[0].data;
  let ii = 0;
  const filteredArray = dat.filter(subArray => subArray[COL_TEACHER] === teachName);
  filteredArray.sort(compareDates);

  for (r of filteredArray) {


    if (true) {
    // if (teachName == r[COL_TEACHER]) {
      let row = document.createElement("tr");

      let r88 = "";
      if (r[COL_DOCUM] !== "") {
        let r8 = imgFromGoogleToHtml(r[COL_DOCUM]);
        r88 = `<a class="popup_image" href="${r[COL_DOCUM]}" target="_blank"><div class="td_a_img"><img class="min_img" src="./assets/icons/ospr.png"></div></a>`;
      } else {
        r88 = "";
      }
      row.setAttribute("id", "ii_" + String(ii));
      // console.log(r[14]);
      let pedrada = '' 
      
      if (r[COL_PEDRADA]){
        pedrada = '. Затверджено рішенням педради від ' + r[COL_PEDRADA];
      }
      if (!r[COL_ATEST_YEAR]){
        r[COL_ATEST_YEAR] = '2000';
      }
      let [day, month, year] = r[COL_DATE_DOCUM].split('.').map(Number);
      let dateKursi = new Date(year, month - 1, day);
      let dateAtest = new Date(r[COL_ATEST_YEAR], 3, 1);
      if (dateKursi < dateAtest){
        row.classList.add('gray_row')
        row.classList.add('tr_hide')
      } 
      row.setAttribute("title", `Уведено: ${r[COL_DATA_TIME]}${pedrada}`);
      row.innerHTML = `


            <td class="row__title truncate-text">${r[COL_TITLE]}</td>
            <td class="row__long">${r[COL_GODIN]}</td>
            <td class="wwrap_no">${r[COL_NUM_DOCUM]}</td>
            <td class="row__date">${r[COL_DATE_DOCUM]}</td>
            <td class="row__subj">${r[COL_PLATFORM]}</td>
            <td class="row__forma" hidden>${r[COL_FORMA]}</td>
            <td>${r88}</td>
            <td><input class="chk_clas" type="checkbox"></td>
            `;
      tBody.append(row);
    }
    ii++;
  }

  buttonAdd.addEventListener("click", ()=>{
    document.location.href ="https://docs.google.com/forms/d/e/1FAIpQLScQf3nU3fBL49wHU7Lg1KCK8RQijuGY6kbGW2TYHPO14YUI8g/viewform"
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
        const title = tBody.childNodes[i].querySelector(".row__title");
        const long = tBody.childNodes[i].querySelector(".row__long");
        const num = tBody.childNodes[i].querySelector(".wwrap_no");
        const date = tBody.childNodes[i].querySelector(".row__date");
        const subj = tBody.childNodes[i].querySelector(".row__subj");
        const forma = tBody.childNodes[i].querySelector(".row__forma");

        const date_input = tBody.childNodes[i].title
        const rec = {
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
    const s = shevchenko.inGenitive(fullNameToParts(teachCombo.value))
    const teachRod = s.lastName + " " + s.firstName + " " + s.middleName
    if (sp.length > 0){
      // console.log(sp);
      const dat = new Date;
      // console.log(formatDate(dat));
      const context = {
        'teacher':teachRod,
        // 'teacher':teachCombo.value,
        'teacherINIC':fullNameToInic(teachCombo.value),
        // 'kursi': sp,
        'golova': golova,
        'zaklad': zaklad,
        'date': formatDate(dat),
        'file': 'klopot.docx',
        'dateInput': date_input,
      }
      s = ''
      let sym = ''
      for (let i = 0; i < sp.length; i++) {
        context['title'+i] = sp[i]['title']
        if (i === sp.length-1) sym = '.'; else sym = ';'
        s += 
          '-' + "\t" + ' "' + sp[i]['title'] + '" '+ 
          'від ' +sp[i]['date'] + 
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
    // console.log(dat);
    for (r of dat) {
      teachers.add(r[COL_TEACHER]);
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
    loader.classList.add('hide-loader');
  });
};

// readStorage();

//TODO ---- devmode
// СТара таблиця
// let key = "1PrzC3ODe_HSdcn7kGxGJZBWW5vHb__uDv9U3zD-IE5E";
// Нова таблиця
const key = "1W6zD4eXSqCFW2iObVuNUyjj_hyS1aPi_tWe7Ce8dxWU";

let sheet = "Відповіді форми (1)";

readKursi();


// https://shevchenko-js.tooleks.com/#usageExample

