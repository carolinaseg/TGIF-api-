var members
$(function () {
    fetch(url, {
        headers: new Headers({
            "X-API-Key": " qsIVvsrGO0hP9JQieXrh6THkriglbaxFbxKLimXP"
        }).then(function (response) {
    return response.json();
  }).then(function (data) {
    app.membersData = data.results[0].members;
    filter_Members()
    create_dropdown()
  }).catch(function () {
    alert("error")
  })
});