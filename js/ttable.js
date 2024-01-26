const urlMy = window.location.href;
// console.log(urlMy);
const keyZamini = "1obSD_Q_w6ZXVAfMmJyXsGkf12VqDWjdhLDwARsd9Ujk";
// const keyZamini = urlMy.split("id=")[1];

const server = "https://schooltools.pythonanywhere.com/";

const currentDate = new Date();
const date = currentDate.getDate();
const month = currentDate.getMonth() + 1;
const year = currentDate.getFullYear();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const dayOfWeek = currentDate.getDay();
const days = [
  "Неділя",
  "Понеділок",
  "Вівторок",
  "Середа",
  "Четвер",
  "П'ятниця",
  "Субота",
];
const dayName = days[dayOfWeek];

let timeTable = { 1: undefined, 2: undefined };
let timeTableClas = { 1: undefined, 2: undefined };

let workDaysDate = [];

let fields = {
  0: "gsx$teach",
};
let fieldsClas = {
  0: "gsx$clas",
};
let missing_teachers = [];
let allTeachers = [];
let allClases = [];
let les_count = 12;
const dWeek = {
  1: "mo",
  2: "tu",
  3: "we",
  4: "th",
  5: "fr",
  6: "st",
};

const teacherList = document.getElementById("teach_id");
const clasList = document.getElementById("clas_id");
const datePicker = document.getElementById("date_id");
const lessList = document.getElementById("less_id");
const datBlock = document.querySelector(".date_block");
const title = document.querySelector(".title");
const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");
const loader = document.querySelector(".loader");
const main = document.querySelector("main");
const alarm = document.querySelector(".alarm");
const cross = document.querySelector(".cross");
// const canvas = document.querySelector("#myCanvas");
const imgAlarm = document.querySelector(".img-alarm");

// Робимо свап
let startX;
let startY;
let distX;
let distY;
let threshold = 50;

cross.addEventListener('click', () => {
  alarm.style.top = "-100%";
})

alarm.addEventListener('click', () => {
  alarm.style.top = "-100%";
})

main.addEventListener(
  "touchstart",
  function (e) {
    let touch = e.changedTouches[0];
    startX = touch.pageX;
    startY = touch.pageY;
  },
  false
);

main.addEventListener(
  "touchmove",
  function (e) {
    e.preventDefault(); // Забороняємо прокрутку при руху пальцем
  },
  false
);

main.addEventListener(
  "touchend",
  function (e) {
    let touch = e.changedTouches[0];
    distX = touch.pageX - startX;
    distY = touch.pageY - startY;

    if (Math.abs(distX) >= threshold) {
      // Свайп вправо чи вліво
      if (distX > 0) {
        console.log("Swipe right");
        btnLeftClick();
      } else {
        console.log("Swipe left");
        btnRightClick();
      }
    }
    if (Math.abs(distY) >= threshold) {
      // Свайп вправо чи вліво
      if (distY > 0) {
        console.log("Swipe down");
        window.scrollBy(0, -500);
      } else {
        console.log("Swipe up");
        window.scrollBy(0, 500);
      }
    }
  },
  false
);

// --------------------

let day = { chZn: 0, dWeek: 0 };

function shiftDate(dateInput, step) {
  let currentDate = new Date(dateInput.value);
  currentDate.setDate(currentDate.getDate() - step);
  let previousDate = currentDate.toISOString().split("T")[0];
  dateInput.value = previousDate;
}

function refrScreen() {
  const tWD = getData(glData, "workdays")["data"];
  day = getDataByDate(tWD, datePicker.value);
  if (teacherList.value !== "") showTT(teacherList, ["week1", "week2"]);
  else showTT(clasList, ["week1 (clas)", "week2 (clas)"]);
}

const btnLeftClick = () => {
  shiftDate(datePicker, 1);
  refrScreen();
};

btnLeft.addEventListener("click", btnLeftClick);

const btnRightClick = () => {
  shiftDate(datePicker, -1);
  refrScreen();
};

btnRight.addEventListener("click", btnRightClick);

datePicker.addEventListener("change", () => {
  const tWD = getData(glData, "workdays")["data"];
  day = getDataByDate(tWD, datePicker.value);
  showTT(teacherList, ["week1", "week2"]);
});

function filterArray(inputArray, date_, name_) {
  // Використовуємо метод filter для отримання підмасиву, що задовольняє умови
  var filteredArray = inputArray.filter(function (innerArray) {
    return innerArray[1] === date_ && innerArray[6] === name_; // TODO
  });

  return filteredArray;
}

function filterArrayKlas(inputArray, date_, name_) {
  // Використовуємо метод filter для отримання підмасиву, що задовольняє умови
  var filteredArray = inputArray.filter(function (innerArray) {
    return innerArray[1] === date_ && innerArray[5] === name_; // TODO
  });

  return filteredArray;
}

function transformFullName(fullName) {
  // Розбиваємо повне ім'я на окремі частини
  var nameParts = fullName.split(" ");

  // Перевіряємо, чи є достатньо елементів для скорочення
  if (nameParts.length >= 3) {
    // Отримуємо першу літеру прізвища
    var surnameInitial = nameParts[0][0];

    // Отримуємо перші літери ім'я і по батькові
    var firstNameInitial = nameParts[1][0];
    var middleNameInitial = nameParts[2][0];

    // Формуємо скорочене ім'я
    var abbreviatedName =
      nameParts[0] + " " + firstNameInitial + "." + middleNameInitial + ".";

    return abbreviatedName;
  } else {
    // Якщо елементів недостатньо, повертаємо оригінальне ім'я
    return fullName;
  }
}

const getNameDay = (myDate) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dayOfWeekUkr = myDate.toLocaleDateString("uk-UA", options);
  return dayOfWeekUkr;
};

function timeToMinutes(timeString) {
  // Розділити час за допомогою двокрапки
  const timeArray = timeString.split(":");

  // Перетворити години та хвилини у числа
  const hours = parseInt(timeArray[0], 10);
  const minutes = parseInt(timeArray[1], 10);

  // Обчислити час в хвилинах
  const totalMinutes = hours * 60 + minutes;

  return totalMinutes;
}

function lessonIsNow(date, time) {
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const startLesson = timeToMinutes(time);
  const endLesson = startLesson + 40;
  const minuteNow = timeToMinutes(`${currentHours}:${currentMinutes}`);
  if (
    date === formattedDate &&
    minuteNow >= startLesson &&
    minuteNow <= endLesson
  ) {
    return true;
  }
  return false;
}

function showTT(listD, tables) {
  title.style.top = "-5px";
  lessList.innerHTML = "";
  const selectedOption = listD.options[listD.selectedIndex];
  if (selectedOption === undefined) return;
  const surname = selectedOption.text;
  // Шукаємо розклад вчителя
  // console.log(surname);
  let week = tables[0];
  if (day.chZn == "2") {
    week = tables[1];
  }
  const list = getData(glData, week)["data"];
  const numLessons = list[1].slice(1, 13);
  // console.log(numLessons);
  const tt = getInnerListByName(list, surname);

  // Шукаємо заміни для даного вчителя
  const date_ = datePicker.value.toString().split("-").reverse().join(".");
  const name_ = transformFullName(surname);
  const zaminiRes = filterArray(tZaminList, date_, name_);
  const zaminiResKlas = filterArrayKlas(tZaminList, date_, name_);

  // console.log(zaminiRes);

  // Визначаємо діапазон уроків
  const maxLessons = 11;
  let lList = [];

  let start = (day.dWeek - 1) * (maxLessons + 1) + 1;
  let fin = start + maxLessons;
  let s,
    mark = "";
  // if (true) {
  if (tt[3][start - 1] !== undefined) {
    if (day.chZn == 1) s = tt[3][start - 1]; // + ". Чисельник";
    else s = tt[3][start - 1]; // + ". Знаменник";
    title.innerText = s;

    const startLesson = getData(glData, "Час початку уроків").header;

    for (let i = start; i < fin; i++) {
      let lesTime = startLesson[0][(i - 1) % (maxLessons + 1)];

      if (lesTime === undefined) lesTime = "";
      let num = tt[2][i];
      if (num === undefined) num = "";
      let klas = tt[1][i];
      if (klas === undefined) klas = "";
      let subj = tt[0][i];
      if (subj === undefined) subj = "";

      let numDot = "";
      if (
        numLessons[i % (maxLessons + 1)] === "-" ||
        numLessons[i % (maxLessons + 1)] === ""
      ) {
        numDot = "";
      } else {
        numDot = `${numLessons[i % (maxLessons + 1)]}`;
      }
      if (numDot === undefined) numDot = "";
      const filteredArray = zaminiRes.filter(function (innerArray) {
        return innerArray[9] === numDot;
      });
      const filteredArrayKlas = zaminiResKlas.filter(function (innerArray) {
        return innerArray[9] === numDot;
      });

      let rowKl, rowTeach;
      // console.log(zaminiResKlas);
      if (lessonIsNow(datePicker.value, lesTime)) {
        mark = "blink";
      } else {
        mark = "";
      }

      // lList.clasList.add('blink');

      if (filteredArrayKlas.length === 0) {
        rowKl = `<div class="time ${mark}">${lesTime}</div> <div class="num">${numDot}</div> <div class="subj">${subj}</div>`;
      } else {
        rowKl = `<div class="time ${mark}">${lesTime}</div> <div class="num zamina">${numDot}</div> <div class="subj zamina">${filteredArrayKlas[0][8]} / ${filteredArrayKlas[0][6]}</div>`;
      }

      if (filteredArray.length === 0) {
        rowTeach = `<div class="time ${mark}">${lesTime}</div> <div class="num">${numDot}</div> <div class="klas">${klas}</div><div class="subj">${subj}</div>`;
      } else {
        rowTeach = `<div class="time ${mark}">${lesTime}</div> <div class="num zamina">${numDot}</div> <div class="klas zamina">${filteredArray[0][5]}</div><div class="subj zamina">${filteredArray[0][8]}</div>`;
      }

      if (tables[0].length > 5)
        //Ознака того, що розклад класу
        lList.push(rowKl);
      else {
        lList.push(rowTeach);
      }
    }
  } else {
    lessList.innerHTML = "";
    title.innerText = "Вихідний";
  }
  createListLessons(lessList, lList, "li");
  // Час затримки перед прихованням панелі у мілісекундах
  const hideTimeout = 3000;
  // Встановити таймер для приховання панелі
  setTimeout(function () {
    title.style.top = "-50px"; // Приховати панель зміщенням угору
  }, hideTimeout);
}

teacherList.addEventListener("change", () => {
  teacherList.style.width = "75%";
  clasList.style.width = "15%";
  clasList.value = "Клас";
  showTT(teacherList, ["week1", "week2"]);
});

clasList.addEventListener("change", () => {
  // Клас по центру
  teacherList.style.width = "15%";
  clasList.style.width = "75%";
  showTT(clasList, ["week1 (clas)", "week2 (clas)"]);
  teacherList.value = "Вчитель";
});

function getInnerListByName(list, surname) {
  for (var i = 0; i < list.length; i++) {
    if (list[i][0] === surname) {
      return [
        list[i].slice(1),
        list[i + 1].slice(1),
        list[1].slice(1),
        list[0].slice(1),
      ];
    }
  }
  return null;
}
function getZaminListByName(list, surname) {
  for (var i = 0; i < list.length; i++) {
    if (list[i][0] === surname) {
      return [
        list[i].slice(1),
        list[i + 1].slice(1),
        list[1].slice(1),
        list[0].slice(1),
      ];
    }
  }
  return null;
}

let glData = [];
let tZaminList = [];

function padNumberWithZero(number) {
  return number < 10 ? "0" + number : number.toString();
}

let readTT = (s2) => {
  $.getJSON(server + "getmultiblock/" + keyZamini, function (data) {
    console.log("Завантажено з сервера");
    glData = data;
    startApp();
    refresh();
    mapHide();
  });
};

function getDayOfWeekUkr(dateString) {
  // Розділяємо рядок на компоненти дати
  const dateComponents = dateString.split(".");

  // Створюємо об'єкт Date з компонентами дати
  const myDate = new Date(
    `${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`
  );

  // Отримуємо день тижня українською мовою
  const options = { weekday: "long" };
  const dayOfWeekUkr = myDate.toLocaleDateString("uk-UA", options);

  return dayOfWeekUkr;
}

function capitalizeFirstLetter(inputString) {
  if (inputString.length === 0) {
    return inputString; // Перевірка на пустий рядок
  }

  // Формуємо рядок з першою великою літерою та рештою рядка
  const resultString =
    inputString.charAt(0).toUpperCase() + inputString.slice(1);

  return resultString;
}

const startApp = () => {
  // showTT(listD, tables);

  if (datePicker.value === "") {
    datePicker.value = `${year}-${padNumberWithZero(
      month
    ).slice()}-${padNumberWithZero(date)}`;
  }

  // title.innerText = capitalizeFirstLetter(getDayOfWeekUkr(datePicker.value));

  let tNow = teacherList.value;
  if (tNow === "") tNow = "Вчитель...";
  const tList = getFirstNonEmptyElements(getData(glData, "week1")["data"])
    .sort(customCompare)
    .filter((item) => item !== "text");
  createList(teacherList, tList, "option");
  teacherList.value = tNow;

  // Читаємо список класів
  tNow = clasList.value;
  if (tNow === "") tNow = "Клас ...";
  const cList = getFirstNonEmptyElements(
    getData(glData, "week1 (clas)")["data"]
  ).filter((item) => item !== "text");
  createList(clasList, cList, "option");
  clasList.value = tNow;

  // Визначаємо чисельник чи знаменник для вказаної дати
  const tWD = getData(glData, "workdays")["data"];
  day = getDataByDate(tWD, datePicker.value);
  tZaminList = getData(glData, "missingbook")["data"];
  loader.classList.add("hide-loader");


};

function getDataByDate(list, date) {
  let dateIndex = list[0].indexOf(date);
  if (dateIndex === -1) {
    return null;
  } else {
    return { chZn: list[2][dateIndex], dWeek: list[1][dateIndex] };
  }
}

function getData(tables, table) {
  var result = tables.find(function (item) {
    return item.templFile === table;
  });
  if (result) {
    return { header: result.header, data: result.data };
  }
  return null;
}

function getFirstNonEmptyElements(lists) {
  return lists
    .map((innerList) => innerList[0])
    .filter((element) => element !== "")
    .filter((element) => element !== undefined);
}

function createList(node, list, tag, class_="") {
  if (tag === "option") {
    node.innerHTML = `<${tag} disabled selected hidden>Оберіть</${tag}>`;
  }
  node.innerHTML += list
    .map((row) => `<${tag} class="${class_}">${row}</${tag}>`)
    .join("");
  node.value = "Оберіть";
}

function createListLessons(node, list, tag, class_="") {
  let s = '';
  node.innerHTML += list
    .map((row) => {
      const elementClass = class_ ? ` ${class_}` : ''; // Якщо class_ не порожній, додаємо його до класу
      const blinkClass = row.includes('blink') ? ' blink' : ''; // Додаємо клас blink, якщо 'blink' знаходиться в тексті

      return `<${tag} class="${elementClass}${blinkClass}">${row}</${tag}>`;
    })
    .join("");
  node.value = "Оберіть";
}

let alarmData;

const loadAlarm = () => {
  const url = 'https://ubilling.net.ua/aerialalerts/?source=dunai';
  // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
  fetch(url)

    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alarmData = data;
      console.log(alarmData);

    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};
const loadDataFromJsonFile = () => {
  fetch("./js/ttable.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      glData = data;
      console.log("Отримано дані:", glData);
      startApp();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
};

const customAlphabet = "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя";

function customCompare(a, b) {
  const minLength = Math.min(a.length, b.length);

  for (let i = 0; i < minLength; i++) {
    const charA = a[i].toLowerCase(); // Перетворення у нижній регістр
    const charB = b[i].toLowerCase(); // Перетворення у нижній регістр

    const indexA = customAlphabet.indexOf(charA);
    const indexB = customAlphabet.indexOf(charB);

    if (indexA !== indexB) {
      return indexA - indexB;
    }
  }

  return a.length - b.length;
}

// const context = canvas.getContext('2d');

function refresh() {
  setTimeout(function () {
    console.log('Refresh');
    // alarm.style.top = "50%";
    // alarm.innerHTML = `
    // <img 
    //     id="alarm-map" 
    //     " 
    //     src="https://ubilling.net.ua/aerialalerts/?map=webp">
    //     <div class="cross">&#10005;</div>
    // `;
    const timestamp = new Date().getTime();
    imgAlarm.src = "https://ubilling.net.ua/aerialalerts/?map=webp?" + timestamp;


    // imgAlarm.onload = function() {
    //   var x = 100;
    //   var y = 50;
    //   getPixelColor(imgAlarm, 145, 90);
  // };

    // loadAlarm();
    // const context = canvas.getContext('2d');
    // const img = document.querySelector('#alarm-map')
    // img.onload = function() {
    //   // Завантаження малюнка з тега <img> в канвас
    //   context.drawImage(img, 0, 0, canvas.width, canvas.height);
    //   // Отримання кольору пікселя
    //   const pixelColor = getPixelColor(370, 173);
    //   console.log('Color of the pixel at (370, 173):', pixelColor);
    
    // };
    refrScreen();
    refresh();
    mapShow();
  }, 30000);
}

function mapShow() {
  alarm.style.top = "50%";
  mapHide();
}

function mapHide() {
  setTimeout(function () {
    alarm.style.top = "-200%";
  }, 5000);  
}



function getPixelColor(img, x, y) {

  // Створення canvas для отримання контексту
  // var canvas = document.createElement("canvas");
  // var context = canvas.getContext("2d");

  // Встановлення розмірів canvas в розміри зображення
  // canvas.width = img.width;
  // canvas.height = img.height;

  // Малювання зображення на canvas
  // context.drawImage(img, 0, 0, img.width, img.height);

  // Отримання координати пікселя (наприклад, (x, y) = (100, 50))

  // Отримання даних пікселя на заданих координатах
  var pixelData = context.getImageData(x, y, 1, 1).data;

  // Отримання кольору у форматі RGBA
  var color = "rgba(" + pixelData[0] + ", " + pixelData[1] + ", " + pixelData[2] + ", " + (pixelData[3] / 255) + ")";

  // Виведення кольору в консоль або кудись інде
  console.log("Color at (" + x + ", " + y + "): " + color);
}

loadDataFromJsonFile();
readTT();



// http://127.0.0.1:5509/ttable.html?id=1obSD_Q_w6ZXVAfMmJyXsGkf12VqDWjdhLDwARsd9Ujk
// https://wiki.ubilling.net.ua/doku.php?id=aerialalertsapi
