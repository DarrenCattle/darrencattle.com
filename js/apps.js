//apps.js

console.log('apps.js loaded');

var xhrProto = XMLHttpRequest.prototype,
    origOpen = xhrProto.open;

xhrProto.open = function (method, url) {
    this._url = url;
    return origOpen.apply(this, arguments);
};

//Start in the italian league, id 438
var url = 'http://api.football-data.org/v1/competitions/438/leagueTable';
var xmlhttp = new XMLHttpRequest();
var id_mapping = {	"Premier League": 426,
					"Bundesliga": 430,
					"La Liga": 436,
					"Serie A": 438,
					"Portugese Liga": 439
};
var id_current = 438;
var day = 1;

sendRequest(url);

xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == XMLHttpRequest.DONE) {
		var result = xmlhttp.response;
		result = JSON.parse(result);
		if(xmlhttp._url.includes("leagueTable")) {
			day = result.matchday;
			dispStanding(result);
			url = 'http://api.football-data.org/v1/competitions/' + id_current + '/fixtures?matchday=' + day;
			sendRequest(url);
		}
		if(xmlhttp._url.includes("fixtures")) {
			dispFixtures(result, day);
		}
	}
};

function sendRequest(url) {
	xmlhttp.open("GET", url);
	xmlhttp.setRequestHeader("X-Auth-Token", "e5137d9c30a84d3d9ad3d0745923aa52");
	xmlhttp.send();
	id_current = url.replace('http://api.football-data.org/v1/competitions/','').replace('/leagueTable','');
};

function dispFixtures(json) {
	var fixtures = json["fixtures"];

	var matchDiv = document.getElementById('current-day');
	matchDiv.innerHTML = 'Matchday ' + day;

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
		var d = (new Date(f.date)).toString();
		cell.innerHTML = d.substring(0,25);
		var timezone = document.getElementById('timezone');
		timezone.innerHTML = 'Time: ' + d.substring(25,60);

		/*var cell = row.insertCell();
		cell.innerHTML = f.odds.awayWin;
		var cell = row.insertCell();
		cell.innerHTML = f.odds.homeWin;
		var cell = row.insertCell();
		cell.innerHTML = f.odds.draw;*/

		var cell = row.insertCell();
		var score = f.result.goalsHomeTeam + "-" + f.result.goalsAwayTeam;
		cell.innerHTML = score.includes("null") ? 'N/A' : score;
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