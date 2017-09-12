var buttonSearch = document.getElementById('button-search-id');
var buttonRandom = document.getElementById('button-random-id')


// random wiki article when random button pressed
buttonRandom.addEventListener("click", function(event) {
	window.open("https://en.wikipedia.org/wiki/Special:Random");
})
// ------------------------------


// search specified article by serch input string
buttonSearch.addEventListener("click", function(event) {
	var searchQueryInputValue = document.getElementById('search-query').value;
	var searchString = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchQueryInputValue + "&limit=17&namespace=0&format=json";
	var articlesList = document.getElementById("articles-list-id");

	articlesList.innerHTML = "";

	getJSON(searchString, function(wikiArticles) {
		articlesList = document.getElementById("articles-list-id");

		for (var i = 1; i < wikiArticles.length-2; i++) {
			for (var j = 0; j < wikiArticles[i].length; j++) {
				articlesList.appendChild(addArticle(wikiArticles, i, j));
			}
		}
		
	});
});


function addArticle(data, i, j) {
	var div = document.createElement("div");

	div.className = "articles-preview";
	div.innerHTML = '<a class="articles-reference" href="' + data[i+2][j] + '">' +
			'<h1 class="articles-preview-title">' + data[i][j] + '</h1>' +
			'<p class="articles-preview-desc">' + data[i+1][j] + '</p>' +
			'</a>';
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
