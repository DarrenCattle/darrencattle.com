//Darren Cattle
//implementing angular.js with football data
(function(){

	console.log('angular loaded successfully');
	//initial app instantiation
	var app = angular.module('soccerApp', []);

	var data = [];

	var italy = [	{position: 1, name: 'Juventus', points: 100},
					{position: 2, name: 'Fiorentina', points: 90},
					{position: 3, name: 'Napoli', points: 82}
				];

	var england = [	{position: 1, name: 'Leicester', points: 100},
					{position: 2, name: 'Tottenham', points: 90}
				];

	var spain = [	{position: 1, name: 'Juventus', points: 100},
					{position: 2, name: 'Fiorentina', points: 90}
				];

	/*var germany = [	{position: 1, name: 'Juventus', points: 100},
					{position: 2, name: 'Fiorentina', points: 90}
				];*/

	data.push(	{league: 'italy', current: italy},
				{league: 'england', current: england},
				{league: 'spain', current: spain}
				);

	//main array controller
	app.controller('soccerController', function($scope) {

		//update function
		this.update = function () {
			this.italy = italy;
			this.england = england;
			this.germany = germany;
			this.spain = spain;
		};

		//JSON request part
		var url = 'http://api.football-data.org/v1/competitions/438';
		var urlcomp = 'http://api.football-data.org/v1/competitions/430/leagueTable';
		var xmlhttp = new XMLHttpRequest();
		var fixtures = [];

		xmlhttp.open("GET", urlcomp);
		xmlhttp.send();

		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState == XMLHttpRequest.DONE) {
		        var result = xmlhttp.response;
		        dispJSON(result);
		        attachJSON(result);
		    }
		};

		function dispJSON(json) {
			console.log(JSON.parse(json));
			//attachJSON(JSON.parse(json));
			storeTable(JSON.parse(json));
		};

		function attachJSON(json) {
			document.getElementById("insert").innerHTML = json;
		};

		var germany = [];

		function storeTable(json) {
			var teams = json["standing"];
			for(team in teams) {
				var t = teams[team];
				germany.push({position: t.position, name: t.teamName, points: t.points});
			}
			data.push({league: 'germany', current: germany});
			//this.update();
			console.log(germany);
			console.log(data);
		};

		//start angular manipulations
		this.data = data;

		var italy, england, spain, germany;

		data.forEach( function parseData(country) {
			if(country.league==='italy') {
				italy = country.current;
			}
			if(country.league==='england') {
				england = country.current;
			}
			if(country.league==='germany') {
				germany = country.current;
			}
			if(country.league==='spain') {
				spain = country.current;
			}
		});

		this.italy = italy;
		this.england = england;
		this.germany = germany;
		this.spain = spain;

	});

})();