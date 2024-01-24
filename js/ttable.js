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

let day = { chZn: 0, dWeek: 0 };

function shiftDate(dateInput, step) {
  let currentDate = new Date(dateInput.value);
  currentDate.setDate(currentDate.getDate() - step);
  let previousDate = currentDate.toISOString().split("T")[0];
  dateInput.value = previousDate;
}

btnLeft.addEventListener("click", () => {
  shiftDate(datePicker, 1);
  const tWD = getData(glData, "workdays")["data"];
  day = getDataByDate(tWD, datePicker.value);
  if (teacherList.value !== "") showTT(teacherList, ["week1", "week2"]);
  else showTT(clasList, ["week1 (clas)", "week2 (clas)"]);
});

btnRight.addEventListener("click", () => {
  shiftDate(datePicker, -1);
  const tWD = getData(glData, "workdays")["data"];
  day = getDataByDate(tWD, datePicker.value);
  if (teacherList.value !== "") showTT(teacherList, ["week1", "week2"]);
  else showTT(clasList, ["week1 (clas)", "week2 (clas)"]);
});

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

function showTT(listD, tables) {
  lessList.innerHTML = '<li value=""></li>';
  const selectedOption = listD.options[listD.selectedIndex];
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
  let s;
  // if (true) {
  if (tt[3][start - 1] !== undefined) {
    if (day.chZn == 1) s = tt[3][start - 1] + ". Чисельник";
    else s = tt[3][start - 1] + ". Знаменник";
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
      if (filteredArrayKlas.length === 0) {
        rowKl = `<div class="time">${lesTime}</div> <div class="num">${numDot}</div> <div class="subj">${subj}</div>`;
      } else {
        rowKl = `<div class="time">${lesTime}</div> <div class="num zamina">${numDot}</div> <div class="subj zamina">${filteredArrayKlas[0][8]} / ${filteredArrayKlas[0][6]}</div>`;
      }

      if (filteredArray.length === 0) {
        rowTeach = `<div class="time">${lesTime}</div> <div class="num">${numDot}</div> <div class="klas">${klas}</div><div class="subj">${subj}</div>`;
      } else {
        rowTeach = `<div class="time">${lesTime}</div> <div class="num zamina">${numDot}</div> <div class="klas zamina">${filteredArray[0][5]}</div><div class="subj zamina">${filteredArray[0][8]}</div>`;
      }

      if (tables[0].length > 5)
        //Ознака того, що розклад класу
        lList.push(rowKl);
      else {
        lList.push(rowTeach);
      }
    }
  } else {
    lessList.innerHTML = '';
    title.innerText = 'Вихідний';

  }
  createList(lessList, lList, "li");
}

teacherList.addEventListener("change", () => {
  clasList.value = "";
  showTT(teacherList, ["week1", "week2"]);
});
clasList.addEventListener("change", () => {
  teacherList.value = "";
  showTT(clasList, ["week1 (clas)", "week2 (clas)"]);
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
  });
};

const startApp = () => {
  if (datePicker.value === "") {
    datePicker.value = `${year}-${padNumberWithZero(
      month
    ).slice()}-${padNumberWithZero(date)}`;
  }
  const tList = getFirstNonEmptyElements(getData(glData, "week1")["data"])
    .sort(customCompare)
    .filter((item) => item !== "text");
  createList(teacherList, tList, "option");
  // Читаємо список класів
  const cList = getFirstNonEmptyElements(
    getData(glData, "week1 (clas)")["data"]
  ).filter((item) => item !== "text");
  createList(clasList, cList, "option");
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

function createList(node, list, tag) {
  if (tag === "option") {
    node.innerHTML = `<${tag} disabled selected hidden>Оберіть</${tag}>`;
  }
  node.innerHTML += list.map((row) => `<${tag}>${row}</${tag}>`).join("");
  node.value = "Оберіть";
}

// async function loadDataFromJsonFile() {
//   try {
//       // Задайте шлях до вашого JSON файлу
//       const jsonFilePath = './js/ttable.json';

//       // Використовуйте fetch для завантаження даних з JSON файлу
//       const response = await fetch(jsonFilePath);

//       if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       // Отримайте об'єкт з JSON даних
//       glData = await response.json();
//       console.log('Отримано дані:', jsonObject);
//       startApp();
//       // Тепер ви можете використовувати отриманий об'єкт
//       console.log('Отримано дані:', jsonObject);

//       // Ваш код обробки даних тут

//   } catch (error) {
//       console.error('Помилка при завантаженні даних:', error.message);
//   }
// }

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

loadDataFromJsonFile();

readTT();

// http://127.0.0.1:5509/ttable.html?id=1obSD_Q_w6ZXVAfMmJyXsGkf12VqDWjdhLDwARsd9Ujk
