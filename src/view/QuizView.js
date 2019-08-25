/* eslint-disable indent */

class QuizView {
  constructor() {
    this.quizContainer = document.getElementById('quiz');
  }

  gameOver(score, amountOfQuestions) {
    this.quizContainer.innerHTML = `${score}/${amountOfQuestions}`;
  }

  drawQuizCard(question, answers) {
    this.quizContainer.innerHTML = `
    <span id='quiz__question'>${question}</span>
    <div id='quiz__answers'>
    ${answers
      .map(
        (item) => `<input type="radio" name="answer" value="${item}">
    <label class='answer'>${item}</label>`,
      )
      .join(' ')}
    </div>`;
  }
}

export default QuizView;
