//jobs.js
$(document).ready(function(){

	console.log('jobs.js loaded');

	var joblist = [	'Software Developer',
					'Software Engineer',
					'Product Manager',
					'Graphic Designer',
					'User Experience Designer',
					'Business Analyst',
					'Security Consultant',
					'Architectural Consultant',
					'Architectural Designer',
					'Energy Analyst',
					'Sustainability Engineer',
					'Solar Home Designer',
					'Video Game Developer',
					'Product Designer',
					'HVAC Engineer',
					'Structural Engineer',
					'Disc Golf Course Designer',
					'Stadium Designer',
					'Board Game Designer',
					'Theory Crafter',
					'Valuable Asset',
	];

	function shuffleArray(arr) {
		//Fisher-Yates shuffle, destructured
		for(var a = arr.length-1; a >= 0 ; a--) {
			var b = Math.floor(Math.random() * a);
			[arr[a],arr[b]]=[arr[b],arr[a]];
		}
		return arr;
	}

	function fillJobs(jobs) {
		var div = $('#jobs');
		var fill = '';
		jobs.forEach(function dispJob(job) {
			fill+='<button style="margin: 4px" class="btn btn-primary"><a class="a-button" href="https://www.google.com/search?q='+job+'">'+job+'</a></button>';
		});
		div.html(fill);
	};

	fillJobs(shuffleArray(joblist));
});

