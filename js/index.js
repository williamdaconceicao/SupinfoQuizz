var quiz = {
  questions: [],

  addQuestion: function(question, correct, wrongOne, wrongTwo){
    this.questions.push({
      question: question,
      correct: correct,
      wrongOne: wrongOne,
      wrongTwo: wrongTwo
    });
    view.displayNumberOfQuestions();
  },

  movingToNextQuestion: function(){
    var nextButton = document.querySelectorAll(".nextButton");
    for(i = 0; i < nextButton.length; i++){
      nextButton[i].addEventListener("click", function(event){
        var elementClicked = event.target;
        if(elementClicked.className === "nextButton"){
          elementClicked.parentNode.classList.remove("is-active");
          if(elementClicked.parentNode.nextElementSibling === null) {
            var showAdd = document.querySelector(".addQuestions");
            var showInfo = document.querySelector(".info");
            showAdd.style.display = "block";
            showInfo.style.display = "block";
          } else {
            elementClicked.parentNode.nextElementSibling.classList.add("is-active");
          }
        }
      });
    };
  }
};

var handlers = {
  addQuestion: function(){
    var questionInput = document.getElementById("questionInput");
    var correctInput = document.getElementById("correctInput");
    var wrongOneInput = document.getElementById("wrongOneInput");
    var wrongTwoInput = document.getElementById("wrongTwoInput");
    quiz.addQuestion(questionInput.value, correctInput.value, wrongOneInput.value, wrongTwoInput.value);
    questionInput.value = "";
    correctInput.value = "";
    wrongOneInput.value = "";
    wrongTwoInput.value = "";
  }
}

var view = {
  saveQuestions: function(){
    var questionsWrapper = document.querySelector(".questionsWrapper");
    questionsWrapper.innerHTML = "";
    quiz.questions.forEach(function(question, index){
      var questionDiv = document.createElement("div");
      questionDiv.setAttribute("class", "questionDiv");
      var questionLi = document.createElement("li");
      questionLi.setAttribute("class", "question");
      var correctLi = document.createElement("li");
      correctLi.setAttribute("class", "correct");
      var wrongOneLi = document.createElement("li");
      wrongOneLi.setAttribute("class", "wrong");
      var wrongTwoLi = document.createElement("li");
      wrongTwoLi.setAttribute("class", "wrong");

      questionsWrapper.appendChild(questionDiv);

      questionLi.textContent = `Question number ${index+1}:  ${question.question}`;
      correctLi.textContent = question.correct;
      wrongOneLi.textContent = question.wrongOne;
      wrongTwoLi.textContent = question.wrongTwo;

      questionDiv.appendChild(questionLi);

      var array = [correctLi, wrongOneLi, wrongTwoLi];
      array.sort(function(a, b){return 0.5 - Math.random()});
      array.forEach(function(item){
        questionDiv.appendChild(item);
      });

    }, this);

    var headstr = "<html><head><title></title></head><body>";
    var footstr = "</body>";
    var newstr = questionsWrapper.innerHTML;
    var oldstr = document.body.innerHTML;
    document.body.innerHTML = headstr+newstr+footstr;
    window.print();
    document.body.innerHTML = oldstr;
  }, 

  displayQuestions: function(){
    var hideAdd = document.querySelector(".addQuestions");
    var hideInfo = document.querySelector(".info");
    hideAdd.style.display = "none";
    hideInfo.style.display = "none";
    var questionsWrapper = document.querySelector(".questionsWrapper");
    questionsWrapper.innerHTML = "";

    quiz.questions.forEach(function(question, index){
      var questionDiv = document.createElement("div");
      questionDiv.setAttribute("class", "questionDiv");
      var nextButton = document.createElement("button");
      nextButton.setAttribute("class", "nextButton");
      var questionLi = document.createElement("li");
      questionLi.setAttribute("class", "question");
      var correctLi = document.createElement("li");
      correctLi.setAttribute("class", "correct");
      var wrongOneLi = document.createElement("li");
      wrongOneLi.setAttribute("class", "wrong");
      var wrongTwoLi = document.createElement("li");
      wrongTwoLi.setAttribute("class", "wrong");

      questionsWrapper.appendChild(questionDiv);

      questionsWrapper.firstChild.classList.add("is-active");

      questionLi.textContent = `Question number ${index+1}:  ${question.question}`;
      correctLi.textContent = question.correct;
      wrongOneLi.textContent = question.wrongOne;
      wrongTwoLi.textContent = question.wrongTwo;

      if (index === quiz.questions.length - 1){
        nextButton.textContent = "Finish";
      } else{
        nextButton.textContent = "Next";
      }

      questionDiv.appendChild(questionLi);

      var array = [correctLi, wrongOneLi, wrongTwoLi];
      array.sort(function(a, b){return 0.5 - Math.random()});
      array.forEach(function(item){
        questionDiv.appendChild(item);
      });

      questionDiv.appendChild(nextButton);

      this.displayAnswersCorrect();
      quiz.movingToNextQuestion();


    }, this);
  },

  displayAnswersCorrect: function(){
    var questionDiv = document.querySelectorAll(".questionDiv");
    var correctAnswers = 0;
    var answersCorrect = document.querySelector(".answersCorrect");
    answersCorrect.textContent = "Correct answers: " + correctAnswers;

    for (var i = 0; i < questionDiv.length; i++) {
      questionDiv[i].onclick = function(event) {
        event = event || window.event;
        if(event.target.className === "correct"){
          correctAnswers++;
          answersCorrect.textContent = "Correct answers: " + correctAnswers;
          event.target.style.color = "#2ecc71";
        } else if(event.target.className === "wrong"){
          event.target.style.color = "#e74c3c";
          var itemChildren = event.target.parentNode.children;
          for(i = 0; i < itemChildren.length; i++){
            if(itemChildren[i].classList.contains("correct")){
              itemChildren[i].style.color = "#2ecc71";
            }
          }
        }
        var itemChildren = event.target.parentNode.children;
        for(i = 0; i < itemChildren.length; i++){
          itemChildren[i].classList.remove("correct");
          itemChildren[i].classList.remove("wrong");
        }
      }
    }

  },

  displayNumberOfQuestions: function(){
    var numberLi = document.getElementById("NumberQuestionsInQuiz");
    if(quiz.questions.length === 1) {
      numberLi.textContent = "You currently have " + quiz.questions.length + " question added to your quiz";
    } else {
      numberLi.textContent = "You currently have " + quiz.questions.length + " questions added to your quiz";
    }
  }
}