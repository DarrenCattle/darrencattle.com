//jquery.js
$(document).ready(function(){
	console.log('jq.js loaded');

	$('#table-current').click(function(){
		var current = $('#table-current :selected').text();
		if(current !== $('#league_name').text()) { 
			//console.log(current);
			var url = 'http://api.football-data.org/v1/competitions/' + id_mapping[current] + '/leagueTable';
			sendRequest(url);
			$('#league_name').text(current);
		}
	});

});