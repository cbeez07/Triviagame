// pseudocode: object with question and answers including the right answer.

// variables: correct answers, wrong answers, unanswered.

// create a start button that dissapears after being clicked*
// have a timer that starts when the button is pressed and appears at the top of the page*
// the question appears with the answers below it. (maybe in a random order)*
// if they click the right answer correct goes up by one, if wrong the wrong answers goes up by one.*
// after the click a page appears telling you if the answer is correct or wrong. with a sentence saying the correct answer.*
// after so many seconds the next trivia question appears.*
// when all questions have been answered, final page comes up saying how many questions were right, wrong, and unanswered.*
// complete styling.
// finish readme
// attach to profile

var triviaQuestions = [{
    question: "What was the mother's name?",
    correctAnswer: "Tracy McConnell",
    wrongAnswer: ["Robnin Scherbatsky", "Lily Aldrin", "Heather Mosby"],
    image: "assets/images/question_one.jpg"
  },
  {
    question: "What game does Barney like to play?",
    correctAnswer: "Laser Tag",
    wrongAnswer: ["Bridge", "Basketball", "Baseball"],
    image: "assets/images/question_two.jpg"
  },
  {
    question: "Where did Marshall go to Law School?",
    correctAnswer: "Columbia Law School",
    wrongAnswer: ["Cornell Law School", "Brooklyn Law School", "Albany Law School"],
    image: "assets/images/question_three.jpeg"
  },
  {
    question: "What color was the instrument that Ted stole for Robin?",
    correctAnswer: "Blue",
    wrongAnswer: ["Red", "Pink", "Gold"],
    image: "assets/images/question_four.png"
  },
  {
    question: "What tattoo did Ted get?",
    correctAnswer: "Butterfly",
    wrongAnswer: ["Anchor", "Picture of Barney", "Eagle"],
    image: "assets/images/question_five.png"
  },
  {
    question: "What did Barney have to wear after losing a bet to Marshall?",
    correctAnswer: "Ducky Tie",
    wrongAnswer: ["Ducky T-shirt", "No Suits for a year", "Cowboy Hat"],
    image: "assets/images/question_six.jpg"
  },
  {
    question: "Which character is Scooter married to in real life?",
    correctAnswer: "Barney",
    wrongAnswer: ["Lily", "Robin", "Marshall"],
    image: "assets/images/question_seven.jpg"
  },
  {
    question: "What happened to Barney when he first dated Robin?",
    correctAnswer: "Got fat",
    wrongAnswer: ["Lost his hair", "Got hit by a bus", "Ran a marathon"],
    image: "assets/images/question_eight.jpeg"
  },
  {
    question: "Who left Ted at the alter?",
    correctAnswer: "Stella",
    wrongAnswer: ["Victoria", "Robin", "Tracy"],
    image: "assets/images/question_nine.png"
  },
  {
    question: "What was Robin's something old at the wedding?",
    correctAnswer: "Locket",
    wrongAnswer: ["Ring", "Scotch", "Lighthouse"],
    image: "assets/images/question_ten.jpg"
  }
];

var clickAnswers = [];
var correctAnswers = 0;
var wrongAnswers = 0;
var unAnswered = 0;
var gameTime;
var count = 0;
var timer = 20;
var selectedAnswer;
var originalState;

$('#start').on('click', function(){
  console.log("one");
  startGame();
  $(this).hide();
});

function clickAnAnswer(){

  $('button').on('click', function(event){
    selectedAnswer = $(this).text();
    if (selectedAnswer === triviaQuestions[count].correctAnswer) {
      answeredRight();
      clearInterval(gameTime);
    }
    if(selectedAnswer !== triviaQuestions[count].correctAnswer){
      answeredWrong();
      clearInterval(gameTime);
    }
  });
}

function answersToClick(){
  console.log('answers');
  clickAnswers.push(triviaQuestions[count].correctAnswer, triviaQuestions[count].wrongAnswer[0], triviaQuestions[count].wrongAnswer[1], triviaQuestions[count].wrongAnswer[2]);
  clickAnswers.sort(function(a, b){return 0.5 - Math.random()});
  for (var i = 0; i < clickAnswers.length; i++) {
    $('#answers').append('<button type="button" class="btn btn-outline-info btn-lg">' + clickAnswers[i] + '</button><br><br>');
  };
  clickAnAnswer();
};

function displayQuestion(){
  $('#question').html('<h2 class="text-success">' + triviaQuestions[count].question + '<h2>');
  answersToClick();

};

function decrement() {
  $('#time').html('<h1 class="text-primary">Time Remaining: ' + timer + '<h1>');
  timer--;
  if (timer === 0) {
    timedOut();
    clearInterval(gameTime);
  }
};

function nextQuestion() {
  count++;
  timer = 20;
  clickAnswers = [];
  $('#answers').html('');
  if (count === triviaQuestions.length) {
    quizCompletePage();
  }
  else {
    startGame();
  }

};

function displayImage() {
  $('#answers').html('<img class="img-fluid img-thumbnail" src="' + triviaQuestions[count].image + '">' );
};

function answeredRight() {
  console.log('right');
  correctAnswers++;
  $('#question').html('<h3 class="text-success">Correct!!</h3>');
  displayImage();
  setTimeout(nextQuestion, 3000);


};

function answeredWrong() {
  console.log('wrong');
  wrongAnswers++;
  $('#question').html('<h2 class="text-danger">Wrong Answer!</h2><br><h3 class="text-success">The correct answer is: ' + triviaQuestions[count].correctAnswer + '</h3>');
  displayImage();
  setTimeout(nextQuestion, 3000);

};

function timedOut() {
  console.log('timeout');
  unAnswered++;
  $('#question').html('<h2 class="text-danger">Out Of Time!</h2><br><h3 class="text-primary">The correct answer is: ' + triviaQuestions[count].correctAnswer + '</h3>');
  displayImage();
  setTimeout(nextQuestion, 3000);
};

function quizCompletePage() {
  $('#question').html('<h2 class="text-dark">Finished, Here Is Your Score:<h2><h4 class="text-success">Correct Answeres: ' + correctAnswers + '</h4><br><h4 class="text-danger">Wrong Answeres: ' + wrongAnswers + '</h4><br><h4>Unanswered Questions: ' + unAnswered + '</h4>');
  $('#answers').html('<button type="button" class="btn btn-primary" id="startOver">Start Over</button>');
  $('#startOver').on('click', function(){
    console.log("two");
    $('#answers').html('');
    $('#question').html('');
    count = 0;
    correctAnswers = 0
    wrongAnswers = 0;
    unAnswered = 0;
    startGame();
    $(this).hide();
  });

}

function startGame() {
  displayQuestion();
  gameTime = setInterval(decrement, 1000);

};
