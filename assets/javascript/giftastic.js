$(document).ready(function () {

var topics = ["kermit", "fozzie bear", "miss piggy", "gonzo", "fraggles", "abby cadabby", "big bird", "animal muppet","dr. teeth", "oscar the grouch" ];

      //AJAX QUERY ===> Set up ajax to query Giphy API and pull data into site 
      function displayGiphyInfo(event) {
        var topicName = $(this).attr("data-topics");
        console.log(topicName);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicName +
          "&api_key=GEvRmvkEVGBT1B8kIXSX2032E6Xus3aD&limit=10";
        console.log(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function (response) {
          console.log(response);
          
          //Clear the gifDiv before you go through loop again
          $("#giphy-view").empty();
          //Create a for loop to iterate through the array that is pulled from giphy
          for (var i = 0; i < topics.length; i++) {

            //Create a div to hold all the gifs
            var gifDiv = $("<div>");
            gifDiv.addClass("gifDivClass");

            //Create a heading to hold each rating as it comes through
            var ratingDiv = $("<h3>");
            ratingDiv.text("Rating: " + response.data[i].rating); //Display the rating in the DOM
            console.log(response.data[i].rating);
            gifDiv.append(ratingDiv);

            //Create an attribute for the giphy
            var imgDiv = $("<img>");
            var imgMove = (response.data[i].images.fixed_height.url);
            var imgPause = (response.data[i].images.fixed_height_still.url)
            //setting the attributes of the image
            imgDiv.attr("src", imgMove); //image is moving to start
            imgDiv.addClass ("gif"); //giving it a class
            imgDiv.attr("data-state", "animate"); //the state of the image is moving to start
            imgDiv.attr("data-still", imgPause); //pulls the stopped image and assigs to data-still
            imgDiv.attr("data-animate", imgMove); //pulls the moving image and assigns to data-animate
            // console.log(response.data[i].images.fixed_height.url);
            
            //append to the gif DIV
            gifDiv.append(imgDiv);

            $("#giphy-view").append(gifDiv); //append the whole gifDiv to giphy-view 
        }
        //create a function to check to see if the gif is moving or not
       $(".gif").on("click", function() {
        var state = $(this).attr("data-state"); //assign a variable to see what the current state is
        
        var animatedImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");
  
        if (state === "animate") { //if the state is moving
          $(this).attr("src", stillImage); //then change the src so that it's pulling the still image from the api
          $(this).attr("data-state", "still"); //change the data state to still
        } 
        else { //otherwise if the state is still...
          $(this).attr("src", animatedImage); //change the src so that it's pulling the moving image from the api
          $(this).attr("data-state", "animate"); //change the data state to animate
        }
      });
        })
      }

      //CREATE BUTTONS ==>Create buttons for the topics in the existing topics array
      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < topics.length; i++) {
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var topicBtn = $("<button>");
          // Adding a class
          topicBtn.addClass("topics");
          // Added a data-attribute
          topicBtn.attr("data-topics", topics[i]);
          // Provided the initial button text
          topicBtn.text(topics[i]);
          // Added the button to the HTML
          $("#buttons-view").append(topicBtn);
        }
      }

      //ADD BUTTONS ==> Add buttons when a new topic is entered in the form
      $("#add-topic").on("click", function (event) {
        event.preventDefault(); //Prevent default to new screen
        //Grab line of code from form box
        var topicName = $("#topics-input").val().trim();
        //Add the topicName to the original topics array
        topics.push(topicName);
        console.log(topicName);
        //Call renderButtons function to make the buttons work
        renderButtons();
      })


      // Adding click event listeners to all elements with a class of "movie"
      $(document).on("click", ".topics", displayGiphyInfo);


      renderButtons();

})