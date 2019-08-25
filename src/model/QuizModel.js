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
    this.mixDataQuiz = [];
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
    const input = document.getElementsByTagName('input');
    const arr = [...input];
    arr.map((item) => item.addEventListener('click', this.runNextQuestionCard.bind(this), false));
    this.answersHasListener = true;
  }

  removeAnswersListenerIfTheyHave() {
    if (this.answersHasListener) {
      const input = document.getElementsByTagName('input');
      const arr = [...input];
      arr.map((item) => item.removeEventListener('click', this.runNextQuestionCard.bind(this), false));
      this.answersHasListener = false;
    }
  }

  markAnsweredQuestion() {
    this.data.splice(this.randomIndexForQuestion, 1);
  }

  checkKnowledge() {
    switch (this.score) {
      case 0:
      case 1:
      case 2:
        return 'Очень слабо';
      case 3:
      case 4:
        return 'Плохо';
      case 5:
        return 'Довольно';
      case 6:
        return 'Средне';
      case 7:
        return 'Хорошо';
      case 8:
        return 'Очень хорошо';
      case 9:
        return 'Отлично';
      default:
        return 'Превосходно';
    }
  }

  allQuestionIsAnswered() {
    const unansweredQestions = this.data.length;
    if (unansweredQestions === 0) {
      this.removeAnswersListenerIfTheyHave();
      this.mixDataQuiz.pop();
      return true;
    }
    return false;
  }

  copyMixDataQuiz(question, answers) {
    this.mixDataQuiz.push({
      question,
      answers,
      correctAnswer: this.correctAnswer,
    });
  }

  runNextQuestionCard(e) {
    this.scoreCounter(e);
    const currentQuizCard = this.getCurrentQuizCard();
    const answers = Utils.mixArray(currentQuizCard.answers);
    const quizView = new QuizView(this.mixDataQuiz);

    this.copyMixDataQuiz(currentQuizCard.question, answers);

    quizView.drawQuizCard(currentQuizCard.question, answers);
    this.initListenerAnswers();
    this.markAnsweredQuestion();

    if (this.allQuestionIsAnswered()) {
      const mark = this.checkKnowledge();
      quizView.gameOver(this.score, mark, this.amountOfQuestions);
    }
  }
}

export default QuizModel;
