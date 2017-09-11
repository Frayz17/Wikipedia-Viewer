var buttonSearch = document.getElementById('button-search-id');
var buttonRandom = document.getElementById('button-random-id')
// var searchQueryInput = document.getElementById('search-query-id');
// var searchQueryInputValue;


// random wiki article when random button pressed
buttonRandom.addEventListener("click", function(event) {
	window.open("https://en.wikipedia.org/wiki/Special:Random");
})
// ------------------------------


// search specified article by serch input string
buttonSearch.addEventListener("click", function(event) {
	var searchQueryInputValue = document.getElementById('search-query').value;
	var searchString = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchQueryInputValue + "&limit=3&namespace=0&format=json";

	getJSON(searchString, function(wikiArticles) {
		console.log(wikiArticles);
		var articlesList = document.getElementById("articles-list-id");

		for (var i = 1; i < wikiArticles.length-1; i++) {
			for (var j = 0; j < wikiArticles[i].length; j++) {
				articlesList.appendChild(addArticle(wikiArticles, i, j));
			}
		}
		
	});
});


function addArticle(data, i, j) {
	var div = document.createElement("div");

	div.className = "articles-preview";
	div.innerHTML = '<h1 class="articles-preview-title">' + data[i][j] + '</h1>' +
			'<p class="articles-preview-desc">' + data[i][j] + '</p>';
	return div;
}

function getJSON(path, callback) {
	var httpRequest = new XMLHttpRequest();
	
	httpRequest.onload = function() {
		if (httpRequest.status >= 200 && httpRequest.status < 400) {
			var data = JSON.parse(httpRequest.responseText);
				if (callback) {
					callback(data);
				}
		}
	};
	
	httpRequest.open('GET', path, true);
	httpRequest.send();
}



// "/w/api.php?action=opensearch&format=json&search=java"
// "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=java"