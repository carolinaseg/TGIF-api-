var app = new Vue({
  el: '#app',
  data: {
    members:[],
    memberData:[]
  }
});

if (document.title == "Attendance senate" || "Party-loyalty_senate" || "senate date") {
  url = "https://api.propublica.org/congress/v1/113/senate/members.json"
} else if (document.title == "Attendance house" || "Party-loyalty_house" || "house date") {
  url = "https://api.propublica.org/congress/v1/113/house/members.json"
}

var members

$(function () {
  fetch(url, {
    headers: new Headers({
      "X-API-Key": "qsIVvsrGO0hP9JQieXrh6THkriglbaxFbxKLimXP"
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    app.membersData = data.results[0].members;
    filter_Members()
    create_dropdown()
  }).catch(function () {
    alert("error")
  })
})

function filter_Members() {
  var checkedPartys = Array.from(document.querySelectorAll("input[name=party]:checked")).map(checkbox_Value);

  var checkedStates = document.getElementById('filterByState').value;

  app.members = app.membersData.filter(function (i) {
    return checkedPartys.indexOf(i.party) != -1 && (checkedStates == i.state || checkedStates == "All");
  })
//  var table = "";
//  for (var i = 0; i < membersFiltered.length; i++) {
//    table += "<tr><td><a href=" + membersFiltered[i].url + " > " + membersFiltered[i].first_name + " " + (membersFiltered[i].middle || " ") + " " + membersFiltered[i].last_name +
//      "</a></td>"
//    table += "<td>" + membersFiltered[i].party + "</td>"
//    table += "<td>" + membersFiltered[i].state + "</td>"
//    table += "<td>" + membersFiltered[i].seniority + "</td>"
//    table += "<td>" + membersFiltered[i].votes_with_party_pct + "%" + "</td></tr>"
//  }
//  document.getElementById("senate-data").innerHTML = table
}

function checkbox_Value(checked) {
  return checked.value;
}

function create_dropdown() {

  var statesFiltered = [];
  for (var i = 0; i < app.members.length; i++) {
    if (statesFiltered.indexOf(app.members[i].state) == -1)
      statesFiltered.push(app.members[i].state);
  }
  statesFiltered.sort()
  var statesOption = "";
  for (var i = 0; i < statesFiltered.length; i++) {
    statesOption += '<option value="' + statesFiltered[i] + '">' + statesFiltered[i] + "</option>";
  }

  document.getElementById("filterByState").innerHTML += statesOption;

}
