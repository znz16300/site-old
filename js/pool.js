// http_request = new XMLHttpRequest();

// http_request.onreadystatechange = function() {
//     process_cellrw(http_request);
// };
// http_request.open('GET',
// "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_7phuDaJWPM-oZ2eb_Po4iCtGYZRmSET5l2m4kuK0wH9SqtA2ArLOcim637x2214BPXV-mGRG5cAE/pubhtml", 
// true);
// //http_request.setRequestHeader('Authorization','Bearer ' + strAccessToken);
// http_request.send(null);

// console.log(http_request);

const { extractSheets } = require("spreadsheet-to-json");

// optional custom format cell function
const formatCell = (sheetTitle, columnTitle, value) => value.toUpperCase();

extractSheets(
  {
    // your google spreadhsheet key
    spreadsheetKey: "10mvPaSWj5GEguZ41Ahka56_VF8_0emYV30tmSIzObEU",
    // your google oauth2 credentials or API_KEY
    credentials: require("./project-fa0cf409504d.json"),
    // optional: names of the sheets you want to extract
    sheetsToExtract: ["Вчитель, урок якого відвідують", "Предмет"],
    // optional: custom function to parse the cells
    formatCell: formatCell
  },
  function(err, data) {
    console.log(data);

  }
);

