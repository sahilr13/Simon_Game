
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
// insitalising the button press start event
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})
 
// button click function
$(".btn").click(function ()
{
  var userChooseColor = $(this).attr("id");
  userClickedPattern.push(userChooseColor);

  playSound(userChooseColor);
  animatePress(userChooseColor);
  checkAnswer(userClickedPattern.length-1);
}); 

// Checking the Answer function
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else{
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function nextSequence() {
  userClickedPattern =[];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
 playSound(randomChosenColour);
}
  

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animation of button press
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");  
  setTimeout( function(){
    $("#" + currentColor).removeClass("pressed")
  },100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}