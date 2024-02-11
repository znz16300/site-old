var d1 = "";
let sheet = "1";

let newsData = [];

// const keyTableNews ="1Dk0WYpOKeRoDATgzMkIkFjUcFwNAG5MRn4W7bEyzd0M"   //2024

// var keyTableNews;
// const keyTableNews ="1iE8XXyoZ9nBOnxsYUJ_Og-09LfKYQJ9emDatNQIUh3k";

// var url;
const url =
  "https://spreadsheets.google.com/feeds/list/" +
  keyTableNews +
  "/" +
  sheet +
  "/public/values?alt=json";
const urlAlt =
  "https://spreadsheets.google.com/feeds/list/" +
  keyTableNewsAlt +
  "/" +
  sheet +
  "/public/values?alt=json";

const burgerItem = document.querySelector(".header__burger");
const menu = document.querySelector(".header__nav");
const header = document.querySelector(".header");
const activeLink = document.querySelector(".list-item_active");
const modalWindow = document.querySelector(".modal__wrapper");
const cards = document.querySelector(".cards");
const arrowNext = document.querySelector(".arrow_next");
const arrowPrevious = document.querySelector(".arrow_previous");
const arrowToStart = document.querySelector(".arrow_to_start");
const arrowToEnd = document.querySelector(".arrow_to_end");
const currentPageBtn = document.querySelector(".page_number");
const navigation = document.querySelector(".pages");
const loader = document.querySelector(".loader");
let pages = [];

function changeOverflow() {
  let overflowY = document.body.style.overflowY;
  document.body.style.overflowY = overflowY != "hidden" ? "hidden" : "visible";
  document.body.style.paddingRight =
    overflowY != "hidden" ? `${getScrollbarWidth()}px` : "0";
}

function toggleMenu() {
  menu.classList.toggle("header__nav-active");
  burgerItem.classList.toggle("header__burger-active");
  header.classList.toggle("header_active");

  changeOverflow();
}

function fillModalWindow(item) {
  let petImage = document.querySelector(".modal__image img");
  petImage.setAttribute("alt", item.name);
  petImage.setAttribute("src", item.img);

  let petName = document.querySelector(".pet_info__name");
  petName.textContent = item.name;

  let petType = document.querySelector(".pet_info__type");
  petType.textContent = `${item.type} - ${item.breed}`;

  let petAbout = document.querySelector(".pet_info__about");
  // petAbout.textContent = item.description;
  let htmlText = `${item.description}<div class="imgs_on_modal">`;
  // Не показуємо перше фото в модалці. Інакше у рядку нижче цикл запускаємо від 0
  for (let i = 1; i < item["images"].length; i++) {
    if (item["images"][i].trim() === '') continue;
    htmlText += `<p ><img src="${item["images"][i]}" alt="" width="85%"></p>`;
  }
  htmlText += "</div>";

  petAbout.innerHTML = htmlText;

  let petAge = document.querySelector(".pet__info__age .value");
  petAge.textContent = item.age;

  let petInoculations = document.querySelector(
    ".pet_info__inoculations .value"
  );
  petInoculations.textContent = item.inoculations.join(", ");

  let petDiseases = document.querySelector(".pet_info__diseases .value");
  petDiseases.textContent = item.diseases.join(", ");

  let petParasites = document.querySelector(".pet_info__parasites .value");
  petParasites.textContent = item.parasites.join(", ");
}

function toggleModalWindow() {
  modalWindow.classList.toggle("modal__wrapper_active");

  changeOverflow();
}

function getScrollbarWidth() {
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

function computeNumberItemsOnPage() {
  let width = window.innerWidth;
  if (width > 1279) return 8;
  else if (width > 767) return 6;
  else return 3;
}

function shuffle(array) {
  // let i = array.length, j = 0;

  // while (i--) {
  //     j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  // }

  return array;
}

function calculatePages() {
  pages = [];
  let items = [];
  let itemsOnPage = computeNumberItemsOnPage();
  let pagesCount = Math.ceil(newsData.length / itemsOnPage);
  for (let i = newsData.length - 1; i >= 0; i--) {
    items.push(i + 1);
  }
  for (let i = 0; i < pagesCount; i++) {
    pages.push(items.slice(i * itemsOnPage, (i + 1) * itemsOnPage));
  }
}

function createCardItem(item) {
  let cardItem = document.createElement("div");
  cardItem.classList.add("cards__item");
  cardItem.classList.add("shake-hard");
  cardItem.dataset.id = item.id;
  let cardItemImage = document.createElement("div");
  cardItemImage.classList.add("cards__item-image");
  let image = document.createElement("img");
  image.setAttribute("src", item.img);
  image.setAttribute("alt", item.name);
  image.setAttribute("height", "160px");
  let cardItemName = document.createElement("div");
  cardItemName.classList.add("cards__item-name");
  cardItemName.innerText = item.name;
  let button = document.createElement("button");
  button.classList.add("cards__item-button");
  button.innerText = "Читати далі...";
  cardItemImage.append(image);
  cardItem.append(cardItemImage, cardItemName, button);
  return cardItem;
}

function drawPage(pageNumber) {
  let cardContainer = document.querySelector(".cards");
  let itemNumbersForShow = pages[pageNumber - 1];
  let itemsForShow = itemNumbersForShow.map((n) =>
    createCardItem(newsData[n - 1])
  );
  cardContainer.innerHTML = "";
  cardContainer.append(...itemsForShow);
  window.scrollBy(0, -2000);
}

function changeDisableStatus(pageNumber) {
  arrowToStart.disabled = arrowPrevious.disabled =
    pageNumber == 1 ? true : false;

  arrowToEnd.disabled = arrowNext.disabled =
    pageNumber == pages.length ? true : false;
}

burgerItem.addEventListener("click", () => toggleMenu());

menu.addEventListener("click", (e) => {
  if (!e.target.closest(".header__list")) toggleMenu();
});

activeLink.addEventListener("click", (e) => {
  if (document.querySelector(".header__nav-active")) {
    e.preventDefault();
    toggleMenu();
  }
});

cards.addEventListener("click", (e) => {
  let card = e.target.closest(".cards__item");
  if (!card) return;

  let itemId = card.dataset.id;
  fillModalWindow(newsData.find((p) => p.id == itemId));
  toggleModalWindow();
});

modalWindow.addEventListener("click", (e) => {
  if (!e.target.closest(".modal") || e.target.closest(".modal_close"))
    toggleModalWindow();
});

window.addEventListener("resize", () => {
  if (pages[0].length != computeNumberItemsOnPage()) {
    calculatePages();
    currentPageBtn.textContent = 1;
    drawPage(currentPageBtn.textContent);
    changeDisableStatus(currentPageBtn.textContent);
  }
});

navigation.addEventListener("click", (e) => {
  let target = e.target.closest(".pages__paginator");
  if (!target) return;

  let direction = target.dataset.direction;

  switch (direction) {
    case "toStart":
      currentPageBtn.textContent = 1;
      break;
    case "previous":
      currentPageBtn.textContent--;
      break;
    case "next":
      currentPageBtn.textContent++;
      break;
    case "toEnd":
      currentPageBtn.textContent = pages.length;
      break;

    default:
      return;
  }

  drawPage(currentPageBtn.textContent);
  changeDisableStatus(currentPageBtn.textContent);
});

let step = 0;

window.onscroll = function () {
  var scrollElem = document.getElementById("scrollToTop");
  if (document.body.scrollTop > document.documentElement.clientHeight) {
    scrollElem.style.opacity = "1";
  } else {
    scrollElem.style.opacity = "0.5";
  }
  ScrollUpShow();
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

function openNewWin(url) {
  myWin = open(url);
}

function ScrollUpShow() {
  // const heightMainBlock2 = document.documentElement.clientHeight ;
  if (window.pageYOffset >= 200) {
    document.getElementById("scrollToTop").style.display = "block";
  } else {
    document.getElementById("scrollToTop").style.display = "none";
  }
}

// Глобальний масив для зберігання результатів
const resultsArray = [];
const resultsArrayIntegr = [];

// Функція для виклику AJAX-запиту за допомогою fetch
function ajaxRequest(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Помилка в запиті для ${url}`);
      }
      return response.json();
    })
    .then((data) => {
      // Додавання результату до глобального масиву
      resultsArray.push(data);
    })
    .catch((error) => {
      console.error(`Помилка виконання запиту для ${url}`, error);
    });
}

// Функція, яка приймає масив URL-адрес і викликає ajaxRequest для кожного
function fetchDataForUrls(urls) {
  // Створюємо масив промісів для всіх AJAX-запитів
  const promisesArray = urls.map((url) => ajaxRequest(url));

  // Повертаємо проміс, який вирішиться, коли всі AJAX-запити завершаться
  return Promise.all(promisesArray);
}

function flattenArray(nestedArray) {
  return nestedArray.reduce((flatArray, element) => {
    if (Array.isArray(element)) {
      return flatArray.concat(flattenArray(element));
    }
    return flatArray.concat(element);
  }, []);
}

function mergeArrays(arrays) {
  // Створюємо пустий масив для результатів
  let mergedArray = [];

  // Цикл для кожного масиву в основному масиві
  arrays.forEach((array) => {
    // Перевіряємо, чи є елементи в масиві
    if (array.feed && array.feed.entry && Array.isArray(array.feed.entry)) {
      // Додаємо кожен елемент з поточного масиву до об'єднаного масиву
      mergedArray = mergedArray.concat(array.feed.entry);
    }
  });

  // Створюємо новий об'єкт з результатом
  const result = { feed: { entry: mergedArray } };

  return result;
}

// const compareDates = (a, b) => {
//   const dateA = new Date(a[COL_DATE_DOCUM].split('.').reverse().join('-'));
//   const dateB = new Date(b[COL_DATE_DOCUM].split('.').reverse().join('-'));
//   return dateA - dateB;
// };

function sortByDateTime(array) {
  // Визначаємо функцію порівняння для сортування
  const compareDates = (a, b) => {
    // Розбиваємо текстові значення на компоненти
    const componentsA = a.gsx$позначкачасу.$t.split(/[. :]/);
    const componentsB = b.gsx$позначкачасу.$t.split(/[. :]/);
  
    // Створюємо об'єкти Date за розбитими компонентами
    const dateA = new Date(componentsA[2], componentsA[1] - 1, componentsA[0], componentsA[3], componentsA[4], componentsA[5]);
    const dateB = new Date(componentsB[2], componentsB[1] - 1, componentsB[0], componentsB[3], componentsB[4], componentsB[5]);
  
    // Порівнюємо дати у порядку зростання
    return dateA - dateB;
  };
  

  // Сортуємо масив за допомогою визначеної функції порівняння
  array.sort(compareDates);
  return array;
}

function setNewsData(arr) {
  let id = 0
  if (true) {
    data = arr;
    for (let i = 0; i < data.length; i++) {
      if (data[i]["gsx$названовини"]["$t"] === 'Назва новини') continue;
      if (
        data[i]["gsx$show"] !== undefined &&
        data[i]["gsx$show"]["$t"] !== ""
      ) {
        d1 = data[i];
        let images = d1["gsx$фото"]["$t"].split(/[, \n]+/);
        let codeImages = [];
        let photoPath = "";
        for (let j = 0; j < images.length; j++) {
          let start = images[j].indexOf("?id=") + 4;
          let ss = images[j].substr(start);
          if (images[j].indexOf('/') === -1) {
            photoPath = `/img-news/${images[j]}`;
          } else {
            photoPath = `${images[j]}`;
          }
          codeImages.push(photoPath);
          // codeImages.push("http://drive.google.com/uc?export=view&id="+ss);
        }

        let im = "";
        if (codeImages[0].length === 0) {
          im = "./assets/images/nophoto.png";
        } else {
          im = codeImages[0];
        }
        // nophoto.png
        id += 1;
        let newsOne = {
          id: String(id),
          name: d1["gsx$названовини"]["$t"],
          img: im,
          images: codeImages,
          type: "",
          breed: "",
          description: d1["gsx$текстновини"]["$t"],
          age: d1["gsx$позначкачасу"]["$t"],
          inoculations: ["none"],
          diseases: ["none"],
          parasites: ["none"],
        };
        newsData.push(newsOne);
        document.querySelector(".pages").style.display = "flex";
      }
    }
    calculatePages();
    drawPage(currentPageBtn.textContent);
    changeDisableStatus(currentPageBtn.textContent);
    loader.classList.add("hide-loader");
  }
}

// Функція для обробки результатів
function processResults() {
  console.log("Обробка результатів:", resultsArray);
  const mergedArray = mergeArrays(resultsArray);
  console.log("mergedArray:", mergedArray);
  const sortedArray = sortByDateTime(mergedArray.feed.entry);
  console.log("sortedArray:", sortedArray);
  setNewsData(arr=sortedArray)
  
}

const readDataFromFile = () => {
  let sortedArray = '';
  fetch('./js/news.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      setNewsData(arr=data);

    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });


  
}


const urlsToFetch = [];

for (let keyTableNews of keyTableNewsAll) {
  const keyTable = keyTableNews.key;
  const shName = keyTableNews.shName;
  urlsToFetch.push(
    `https://schooltools.pythonanywhere.com/getnews/${keyTable}/${shName}`
  );
}

readDataFromFile();

fetchDataForUrls(urlsToFetch)
  .then(() => {
    // Запускаємо функцію для обробки результатів після завершення всіх AJAX-запитів
    processResults();
  })
  .catch((error) => {
    console.error("Помилка виконання AJAX-запитів", error);
  });

