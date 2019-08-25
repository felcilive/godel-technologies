import './style/index.css';
import './style/indexAdaptive.css';
import QuizController from './controller/QuizController';

const quiz = new QuizController();
quiz.initStartListener();
