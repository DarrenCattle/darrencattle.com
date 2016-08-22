//apps.js

console.log('apps.js loaded');

var xhrProto = XMLHttpRequest.prototype,
    origOpen = xhrProto.open;

xhrProto.open = function (method, url) {
    this._url = url;
    return origOpen.apply(this, arguments);
};

//'http://api.football-data.org/v1/competitions/430';
var url = 'http://api.football-data.org/v1/competitions/438/leagueTable';
var xmlhttp = new XMLHttpRequest();
var id_mapping = {	"Premier League": 426,
					"Bundesliga": 430,
					"La Liga": 436,
					"Serie A": 438,
					"Portugese Liga": 439
};
var id_current = 438;

sendRequest(url);

xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == XMLHttpRequest.DONE) {
		var result = xmlhttp.response;
		result = JSON.parse(result);
		//console.log(result);
		if(xmlhttp._url.includes("leagueTable")) {
			dispStanding(result);
			url = 'http://api.football-data.org/v1/competitions/' + id_current + '/fixtures?matchday=1';
			sendRequest(url);
		}
		if(xmlhttp._url.includes("fixtures")) {
			dispFixtures(result);
		}
	}
};

function sendRequest(url) {
	xmlhttp.open("GET", url);
	xmlhttp.setRequestHeader("X-Auth-Token", "e5137d9c30a84d3d9ad3d0745923aa52");
	xmlhttp.send();
	id_current = url.replace('http://api.football-data.org/v1/competitions/','').replace('/leagueTable','');
}

function dispFixtures(json) {
	var fixtures = json["fixtures"];
	var myTableDiv = document.getElementById('matches');
	myTableDiv.innerHTML = '';

	for(fixture in fixtures) {
		var f = fixtures[fixture];

		var row = myTableDiv.insertRow();

		var cell = row.insertCell();
		cell.innerHTML = f.homeTeamName;
		var cell = row.insertCell();
		cell.innerHTML = f.awayTeamName;
		var cell = row.insertCell();
		cell.innerHTML = (new Date(f.date)).toString().replace('GMT-0700 (Pacific Daylight Time)','');
		var cell = row.insertCell();
		cell.innerHTML = f.odds.awayWin;
		var cell = row.insertCell();
		cell.innerHTML = f.odds.homeWin;
		var cell = row.insertCell();
		cell.innerHTML = f.odds.draw;
	}
};

function dispStanding(json) {
	var teams = json["standing"];
	var myTableDiv = document.getElementById('standing');
	myTableDiv.innerHTML = '';

	for(team in teams) {
		var t = teams[team];

		var row = myTableDiv.insertRow();

		var cell = row.insertCell();
		cell.innerHTML = t.position;
		var cell = row.insertCell();
		cell.innerHTML = t.teamName;
		var cell = row.insertCell();
		cell.innerHTML = t.points;
	}
};