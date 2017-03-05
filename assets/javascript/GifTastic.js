var topics = ['meatballs', 'pianos', 'gum'];

$(document).on('click', 'submit', function(){
	topics.push(document.getElementById("addTopic").value);
})

function createButtons() {
		for (var i = 0; i < topics.length; i++) {
			var gifSpace = $("<button/>").attr({
				type: "button",
				name: "btn_"+i,
				id: "gameButton",
				class: "btn btn-default"
			});
			$(gifSpace).text(topics[i]);
			$("#topicButtons").append(gifSpace);
		}
}

createButtons();

// for(i=0; i<topics.length; i++){
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      topics + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
      	url: queryURL,
      	method: "GET"
      })
      .done(function(snap) {

      	var giphys = snap.data;

      	for (var i = 0; i < giphys.length; i++) {

      		if (giphys[i].rating !== "r") {
      			var gifDiv = $("<div class='item'>");

      			var gifImg = $("<img>").attr({
      				"data-state": "still",
      				src: giphys[i].images.fixed_height_still.url,
      				"data-animate":  giphys[i].images.fixed_height.url,
      				"data-still": giphys[i].images.fixed_height_still.url
      			});

      			gifDiv.append(gifImg);

      			$("topics").append(gifDiv);
      		}
      	}
    })
