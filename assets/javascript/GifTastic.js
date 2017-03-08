var topics = ['meatballs', 'pianos', 'gum'];

$(document).on('click', '#submit', function(){
	topics.push(document.getElementById("addTopic").value);
	console.log(topics);
	createButtons();
	return false;
})

function createButtons() {
		$('#topicButtons').empty();
		for (var i = 0; i < topics.length; i++) {
			var gifSpace = $("<button/>").attr({
				type: "button",
				name: "btn_"+i,
				id: 'btn_'+ i,
				class: "gameButton btn btn-default"
			});
			$(gifSpace).text(topics[i]);
			$("#topicButtons").append(gifSpace);
		}
		$('#addTopic').val('');
}

createButtons();


$(document).on('click', '.gameButton', function(){
	console.log(this.innerHTML);
	//get gifs from giphy
	getGifs(this.innerHTML);
	//add gif from giphy to the #topics div

})

function getGifs(buttonVal){
	console.log('printing button value: ' + buttonVal);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	     			buttonVal + "&api_key=dc6zaTOxFJmzC&limit=10";

 	$.ajax({
      	url: queryURL,
      	method: "GET"
    })
    .done(function(snap) {
    	console.log(snap);
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

      			$("#topics").append(gifDiv);
      		}
      	}
    })
}
