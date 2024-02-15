const fs = require('fs');

function writeObjectToJsonFile(filename, objectToWrite) {
    // Перетворюємо об'єкт в рядок JSON
    const jsonData = JSON.stringify(objectToWrite, null, 2);

    // Записуємо рядок JSON у файл
    fs.writeFileSync(filename, jsonData, 'utf-8');

    console.log(`Об'єкт було успішно записано у файл ${filename}`);
}

let readTT = (s2) => {
  $.getJSON(server + "getmultiblock/" + keyZamini, function (data) {
    datePicker.value = `${year}-${padNumberWithZero(
      month
    ).slice()}-${padNumberWithZero(date)}`;
    glData = data;
    writeObjectToJsonFile('ttable.json', glData);
  });

 
};

const keyZamini = "1obSD_Q_w6ZXVAfMmJyXsGkf12VqDWjdhLDwARsd9Ujk";
const server = "https://schooltools.pythonanywhere.com/";

readTT()


