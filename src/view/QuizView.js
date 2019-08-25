/* eslint-disable indent */

class QuizView {
  constructor(data) {
    this.quizContainer = document.getElementById('quiz');
    this.data = data;
  }

  gameOver(score, mark, amountOfQuestions) {
    this.quizContainer.innerHTML = `<div class='quiz__card'>
    <div class='quiz__score'>${mark} ${score}/${amountOfQuestions}</div>
    ${this.data
      .map(
        (item) => `<div id='quiz__question' class='quiz__question'>${item.question}</div>
      <div id='quiz__answers'>
      <label class='quiz__answers__elem gradient correct_answer'>
      <input type="radio" name="answer" value="${item.correctAnswer}">
      </input>
      ${item.correctAnswer}</label>
      `,
      )
      .join(' ')}`;
  }

  drawQuizCard(question, answers) {
    this.quizContainer.innerHTML = `
    <div class='quiz__card'>
    <div id='quiz__question' class='quiz__question'>${question}</div>
    <div id='quiz__answers'>
    ${answers
      .map(
        (item) => `
        <label class='quiz__answers__elem gradient gradient-focus answer'>
        <input type="radio" name="answer" value="${item}">
        </input>
        ${item}</label>
        `,
      )
      .join(' ')}
    </div>
    </div>`;
  }
}

export default QuizView;
