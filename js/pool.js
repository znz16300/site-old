http_request = new XMLHttpRequest();

http_request.onreadystatechange = function() {
    process_cellrw(http_request);
};
http_request.open('GET',
"https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_7phuDaJWPM-oZ2eb_Po4iCtGYZRmSET5l2m4kuK0wH9SqtA2ArLOcim637x2214BPXV-mGRG5cAE/pubhtml", 
true);
//http_request.setRequestHeader('Authorization','Bearer ' + strAccessToken);
http_request.send(null);

console.log(http_request);