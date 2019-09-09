//VUE
var app = new Vue({
    el: '#app',
    data: {
        statisticsVue: {
            "Number_of_democrats": 0,
            "Number_of_republicans": 0,
            "Number_of_independdents": 0,
            "totalPorcentsDemocrats": 0,
            "totalPorcentsRepublicans": 0,
            "totalPorcentsIdependdents": 0,
            "sumaNumbersOfParty": 0,
            "totalPorcents": 0,
            leastLoyal: [],
            mostLoyal: [],
            leastEngaged: [],
            mostEngaged: [],
        },
    }
});

//FUNCTION FETCH
if (document.title == "Attendance senate" || document.title == "Party-loyalty_senate") {
    url = "https://api.propublica.org/congress/v1/113/senate/members.json"
} else if (document.title == "Attendance house" || document.title == "Party-loyalty_house") {
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
        members = data.results[0].members
        tablaSenateGlance()
        crearTablaLastLoyal()
        crearTablaMostLoyal()
        crearTabLaLastEngaged()
        crearTablaMostEngaged()
    }).catch(function (error) {
        alert(error)
    })
})
/*NUMBER OF REPRESENTATIVES OF EACH PARTY*/
function tablaSenateGlance() {
    for (var i = 0; i < members.length; i++) {
        if (members[i].party == "D") {
            app.statisticsVue.Number_of_democrats += 1;
            app.statisticsVue.totalPorcentsDemocrats += members[i].votes_with_party_pct;
        } else if (members[i].party == "R") {
            app.statisticsVue.Number_of_republicans += 1;
            app.statisticsVue.totalPorcentsRepublicans += members[i].votes_with_party_pct;
        } else {
            app.statisticsVue.Number_of_independdents += 1;
            app.statisticsVue.totalPorcentsIdependdents += members[i].votes_with_party_pct;
        }
    }
    var suma = 0;
    for (var i = 0; i < members.length; i++) {
        suma += members[i].votes_with_party_pct;
    }
    app.statisticsVue.totalPorcents = (suma / members.length).toFixed(2);

    app.statisticsVue.totalPorcentsDemocrats = (app.statisticsVue.totalPorcentsDemocrats / app.statisticsVue.Number_of_democrats).toFixed(2);

    app.statisticsVue.totalPorcentsRepublicans = (app.statisticsVue.totalPorcentsRepublicans / app.statisticsVue.Number_of_republicans).toFixed(2);

    app.statisticsVue.totalPorcentsIdependdents = (app.statisticsVue.totalPorcentsIdependdents / app.statisticsVue.Number_of_independdents).toFixed(2);

    app.statisticsVue.sumaNumbersOfParty = (app.statisticsVue.Number_of_democrats + app.statisticsVue.Number_of_independdents + app.statisticsVue.Number_of_republicans);

    for (var i in app.statisticsVue) {
        if (isNaN(app.statisticsVue[i])) {
            app.statisticsVue[i] = 0;

        }
    }

    //    var table = ""
    //    table += "<tr><td>democrats</td><td>" + statistics.Number_of_democrats + "</td><td>" + statistics.totalPorcentsDemocrats + " % " + "</td></tr>"
    //    table += "<tr><td>Republicans</td><td>" + statistics.Number_of_republicans + "</td><td>" + statistics.totalPorcentsRepublicans + " % " + "</td></tr>"
    //    table += "<tr><td>Independdents</td><td>" + statistics.Number_of_independdents + "</td><td>" +
    //        statistics.totalPorcentsIdependdents + " % " + "</td></tr>"
    //    table += "<tr><td>Total</td><td>" + statistics.sumaNumbersOfParty + "</td><td>" + statistics.totalPorcents + " % " + "</td></tr>"
    //
    //    document.getElementById("senate-data").innerHTML = table

}

//THE 10% LEAST LOYAL MEMBERS
function crearTablaLastLoyal() {
    var leastLoyal = [];
    var numberOfMembersToRetrieve = Math.round(members.length * 0.10);
    members.sort(function (a, b) {
        return (a.votes_with_party_pct - b.votes_with_party_pct);
    });

    for (var i = 0; i < numberOfMembersToRetrieve; i++) {
        app.statisticsVue.leastLoyal.push(members[i])
    }
    for (var i = numberOfMembersToRetrieve; i < members.length; i++) {
        if (members[i].votes_with_party_pct == app.statisticsVue.leastLoyal[app.statisticsVue.leastLoyal.lenght - 1])
           app.statisticsVue.leastLoyal.push(members[i])
    }

    //    var table = ""
    //    for (var i = 0; i < leastLoyal.length; i++) {
    //        table += "<tr><td><a href=" + leastLoyal[i].url + " > " + leastLoyal[i].first_name + " " + (leastLoyal[i].middle || " ") + " " + leastLoyal[i].last_name +
    //            "</a></td>"
    //        table += "<td>" + ((leastLoyal[i].total_votes * leastLoyal[i].votes_with_party_pct) / 100).toFixed(0) + "</td>"
    //        table += "<td>" + leastLoyal[i].votes_with_party_pct + " % " + "</td>"
    //    }
    //    if (document.title == "Party-loyalty_senate" || document.title == "Party-loyalty_house") {
    //        document.getElementById("least_loyal").innerHTML = table
    //    }
}

//THE 10% MOST LOYAL MEMBERS
function crearTablaMostLoyal() {
    var mostLoyal = [];
    var numberOfMembersToRetrieve = Math.round(members.length * 0.10);
    members.sort(function (a, b) {
        return (b.votes_with_party_pct - a.votes_with_party_pct);
    });

    for (var i = 0; i < numberOfMembersToRetrieve; i++) {
        app.statisticsVue.mostLoyal.push(members[i])
    }
    for (var i = numberOfMembersToRetrieve; i < members.length; i++) {
        if (members[i].votes_with_party_pct == app.statisticsVue.mostLoyal[app.statisticsVue.mostLoyal.lenght - 1])
            app.statisticsVue.mostLoyal.push(members[i])
    }
    //    var table2 = ""
    //    for (var i = 0; i < mostLoyal.length; i++) {
    //        table2 += "<tr><td><a href=" + mostLoyal[i].url + " > " + mostLoyal[i].first_name + " " + (mostLoyal[i].middle || " ") + " " + mostLoyal[i].last_name +
    //            "</a></td>"
    //        table2 += "<td>" + ((mostLoyal[i].total_votes * mostLoyal[i].votes_with_party_pct) / 100).toFixed(0) + "</td>"
    //        table2 += "<td>" + mostLoyal[i].votes_with_party_pct + " % " + "</td>"
    //    }
    //    if (document.title == "Party-loyalty_senate" || document.title == "Party-loyalty_house") {
    //        document.getElementById("most_loyal").innerHTML = table2
    //    }
}

//THE 10% LEAST ENGAGED MEMBERS
function crearTabLaLastEngaged() {
    var leastEngaged = [];
    var numberOfMembersToRetrieve = Math.round(members.length * 0.10)
    members.sort(function (a, b) {
        return (b.missed_votes_pct - a.missed_votes_pct);
    });
    for (var i = 0; i < numberOfMembersToRetrieve; i++) {
        app.statisticsVue.leastEngaged.push(members[i])
    }
    for (var i = numberOfMembersToRetrieve; i < members.length; i++) {
        if (members[i].missed_votes_pct == app.statisticsVue.leastEngaged[app.statisticsVue.leastEngaged.lenght - 1])
            app.leastEngaged.push(members[i])
    }

    //    var table3 = ""
    //    for (var i = 0; i < leastEngaged.length; i++) {
    //        table3 += "<tr><td><a href=" + leastEngaged[i].url + " > " + leastEngaged[i].first_name + " " + (leastEngaged[i].middle || " ") + " " + leastEngaged[i].last_name +
    //            "</a></td>"
    //        table3 += "<td>" + leastEngaged[i].missed_votes + "</td>"
    //        table3 += "<td>" + leastEngaged[i].missed_votes_pct + " % " + "</td>"
    //    }
    //    if (document.title == "Attendance senate" || document.title == "Attendance house") {
    //        document.getElementById("least_engaged").innerHTML = table3
    //    }
}
//THE 10% MOST ENGAGED MEMBERS
function crearTablaMostEngaged() {
    var mostEngaged = [];
    var numberOfMembersToRetrieve = Math.round(members.length * 0.10)
    members.sort(function (a, b) {
        return (a.missed_votes_pct - b.missed_votes_pct);
    });

    for (var i = 0; i < numberOfMembersToRetrieve; i++) {
        app.statisticsVue.mostEngaged.push(members[i])
    }
    for (var i = numberOfMembersToRetrieve; i < members.length; i++) {
        if (members[i].missed_votes_pct == app.statisticsVue.mostEngaged[app.statisticsVue.mostEngaged.lenght - 1])
            app.mostEngaged.push(members[i])
    }
    //    var table4 = ""
    //    for (var i = 0; i < mostEngaged.length; i++) {
    //        table4 += "<tr><td><a href=" + mostEngaged[i].url + " > " + mostEngaged[i].first_name + " " + (mostEngaged[i].middle || " ") + " " + mostEngaged[i].last_name +
    //            "</a></td>"
    //        table4 += "<td>" + mostEngaged[i].missed_votes + "</td>"
    //        table4 += "<td>" + mostEngaged[i].missed_votes_pct + " % " + "</td>"
    //    }
    //    if (document.title == "Attendance senate" || document.title == "Attendance house") {
    //        document.getElementById("most_engaged").innerHTML = table4
    //    }
}
    