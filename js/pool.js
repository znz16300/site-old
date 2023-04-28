//https://stackoverflow.com/questions/20035101/why-does-my-javascript-code-receive-a-no-access-control-allow-origin-header-i
//
let idSS = '10mvPaSWj5GEguZ41Ahka56_VF8_0emYV30tmSIzObEU';
let shName = 'Відповіді форми (1)';

//let url = 'http://127.0.0.1:5000/getblock/'+idSS+'/'+shName;
let url = 'http://zelenskiy.pythonanywhere.com/getblock/'+idSS+'/'+shName;
// fetch(url,  {method: "GET"})
//   .then((response) => {
//     console.log(1111);
//     return response.json();
//    })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch(err => console.error(err));

  
  request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400){
        // data = JSON.parse(request.responseText);
        // console.log((request.responseText));
        let r = request.responseText;
        // console.log(r);
        // r = r.replace(/\\n/g, "\\n")  
        //        .replace(/\\'/g, "\\'")
        //        .replace(/\\"/g, '\\"')
        //        .replace(/\\&/g, "\\&")
        //        .replace(/\\r/g, "\\r")
        //        .replace(/\\t/g, "\\t")
        //        .replace(/\\b/g, "\\b")
        //        .replace(/\\f/g, "\\f");
        // // remove non-printable and other non-valid JSON chars
        // r = r.replace(/[\u0000-\u0019]+/g,"");
        // console.log(r);
        let data = JSON.parse(r)

        console.log(data);
        // console.log(typeof data);
    } else {
      // We reached our target server, but it returned an error
      console.log('Upps ');

    }
  };
  request.onerror = function() {
    // There was a connection error of some sort
  };
  request.send();

