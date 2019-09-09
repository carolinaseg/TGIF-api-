var myHeaders = new Headers();
myHeaders.append

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

var myRequest = new Request("", myInit);

fetch(myRequest)
.then(function(response) {
  return response.JSON();
})
.then(function(myJSON) {
  var objectURL = URL.createObjectURL(myJSON);
  myUrl.src = objectURL;
});

console.log()


qsIVvsrGO0hP9JQieXrh6THkriglbaxFbxKLimXP

