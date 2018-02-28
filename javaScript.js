//---- gify api key VGcL2A00UMsYG4SCg45dBgVfB9Osg0NG
//http://api.giphy.com/v1/gifs/search?api_key=VGcL2A00UMsYG4SCg45dBgVfB9Osg0NG&q=paul+rudd



//------Array for al topics
var topics = ["1900", "1910", "1920", "1930", "1940", "1950", "1960", "1970", "1980", "1990", "2000", "2010",];

//Function to create buttons inside html for each string in topics array
function renderButtons (){
    //first clear the topics div so that we dont get duplicates of buttons
    $("#topics-div").empty();
    //For loop to run through full lenght of array
    for (var i = 0; i < topics.length; i++) {
        //create empty button var
        var button = $("<button class='btn'>");
        //give it the class of topic
        button.addClass("topic")
        //give it the value of relatid topic by attributing the title index of button
        button.attr("data-topic", topics[i]);
        //set the text for button to be topic index
        button.text(topics[i]);
        //add it to the topic div in html
        $("#topics-div").append(button);
    }

}

renderButtons();
// listen to click on add topic button in search section 
$("#add-topic").on("click", function(event){
    event.preventDefault()
    //store the value that user input in the topic-input form
    var search = $("#topic-input").val()
    //push the value to topics array
    topics.push(search);
    console.log(topics);
    //call the renderbuttons function so that new button is created. 
    renderButtons();
})

// Function to listen what topic button was pressed, then pass the value of the button into var topic. 
function getTopic() {
    $("#gif-div").empty();
    var topic = $(this).attr("data-topic");
    var topicQuery = "http://api.giphy.com/v1/gifs/search?api_key=VGcL2A00UMsYG4SCg45dBgVfB9Osg0NG&q=" + topic;

    $.ajax({
        method: "get",
        url: topicQuery
    }).then(function(response){
        console.log(topicQuery)
        console.log(response)
        for (var i = 0; i < response.data.length; i++) {
            console.log(response.data[i].title);
            var gifHolder = $("<div class='col-md-4'>");
            var rating = $("<p class='text-warning'>").text("Rating: " + response.data[i].rating);
            var gifImg = $("<img class='gifimg'>").attr("src", response.data[i].images.fixed_width_still.url);
            gifHolder.append(rating, gifImg);
            $("#gif-div").append(gifHolder);

        }
    });
   
    
   
}
//listen to cklivks on al objects with .topic class on page. 
$(document).on("click", ".topic", getTopic);


//toggle between playing and pausing when gif is clicked
$(document).on("click", ".gifimg", function(){
        
    var src = $(this).attr("src");
    //if gif is playing, stop it on click
    if($(this).hasClass("playing")) {
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"));
        $(this).removeClass("playing");
    } else {
        $(this).addClass("playing");
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"));
    }
})