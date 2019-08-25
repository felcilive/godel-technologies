/* eslint-disable no-console */

import QuizModel from '../model/QuizModel';

class QuizController {
  constructor() {
    this.startQuizButton = document.getElementById('quiz__start');
  }

  initStartListener() {
    const quizmodel = new QuizModel();
    this.startQuizButton.addEventListener('click', quizmodel.runNextQuestionCard.bind(quizmodel), false);
  }
}

export default QuizController;
