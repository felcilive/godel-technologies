/* eslint-disable no-console */
/* eslint-disable indent */
import data from '../data/data';
import Utils from '../Utils/Utils';
import QuizView from '../view/QuizView';

class QuizModel {
  constructor() {
    this.randomIndexForQuestion = null;
    this.correctAnswer = null;
    this.data = data;
    this.score = 0;
    this.amountOfQuestions = this.data.length - 1;
    this.answersHasListener = false;
  }

  getCurrentQuizCard() {
    this.randomIndexForQuestion = Utils.getRandomInt(0, this.data.length - 1);
    const currentQuizCard = this.data[this.randomIndexForQuestion];
    this.correctAnswer = currentQuizCard.correctAnswer;
    return currentQuizCard;
  }

  scoreCounter(e) {
    const answerOfClient = e.target.value;
    if (answerOfClient === this.correctAnswer) {
      this.score += 1;
    }
  }

  initListenerAnswers() {
    const containerOfAnswers = document.getElementById('quiz__answers');
    containerOfAnswers.addEventListener('click', this.runNextQuestionCard.bind(this), false);
    this.answersHasListener = true;
  }

  removeAnswersListenerIfTheyHave() {
    if (this.answersHasListener) {
      const containerOfAnswers = document.getElementById('quiz__answers');
      containerOfAnswers.removeEventListener('click', this.runNextQuestionCard.bind(this), false);
      this.answersHasListener = false;
    }
  }

  markAnsweredQuestion() {
    this.data.splice(this.randomIndexForQuestion, 1);
  }

  allQuestionIsAnswered() {
    const unansweredQestions = this.data.length;
    if (unansweredQestions === 0) {
      this.removeAnswersListenerIfTheyHave();
      return true;
    }
    return false;
  }

  runNextQuestionCard(e) {
    this.scoreCounter(e);
    const currentQuizCard = this.getCurrentQuizCard();
    const answers = Utils.mixArray(currentQuizCard.answers);
    const quizView = new QuizView();
    quizView.drawQuizCard(currentQuizCard.question, answers);
    this.initListenerAnswers();
    this.markAnsweredQuestion();
    if (this.allQuestionIsAnswered()) {
      quizView.gameOver(this.score, this.amountOfQuestions);
    }
  }
}

export default QuizModel;
