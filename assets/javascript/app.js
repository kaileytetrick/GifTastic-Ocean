
var topics = ["jellyfish", "seahorse", "octopus", "squid", "sea turtle", "lion fish",
    "parrot fish", "eagle ray", "angler fish", "whale shark", "sea anemone", "eel", "dolphin"];
var responseCopy;
var gifToggle = false;
function displayGifyInfo() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cH6c1KLJj95mTCpK06uB19DGRKVVOkcn&q=" + gif + "&limit=10&offset=0&rating=PG-13&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        $("#gif-display").html("");
        for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = response.data[i].rating;
            var gifP = $('<p class="rating-info">');
            var gifImage = $('<img class="gif-image">');
            gifImage.attr("src", response.data[i].images.fixed_height_still.url);
            gifP.text('Rated: ' + rating);
            gifDiv.append(gifP);
            gifDiv.append(gifImage);
            $("#gif-display").append(gifDiv);
        }
        responseCopy = response;
        return responseCopy;
        renderButtons();
    });
}

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var topicButton = $("<button class='btn btn-info'>");
        topicButton.addClass("gify");
        topicButton.attr("data-name", topics[i]);
        topicButton.text(topics[i]);
        $("#buttons-view").append(topicButton);
    }
}

$("#add-gify").on("click", function (event) {
    event.preventDefault();
    var gify = $("#gify-input").val().trim();
    if (gify != "") {
        topics.push(gify);
        console.log(topics)
        renderButtons();
    }
});

function swapGif() {
    var state = $(this).index();
    if (gifToggle === false) {
        $(this).find("img").attr("src", responseCopy.data[state].images.fixed_height.url);
        gifToggle = true;
    } else {
        $(this).find("img").attr("src", responseCopy.data[state].images.fixed_height_still.url);
        gifToggle = false;
    }
};

$(document).on("click", ".gify", displayGifyInfo);
$(document).on("click", ".item", swapGif);
renderButtons();

















