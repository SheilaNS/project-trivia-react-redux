import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setCircleDasharray, setRemainingPathColor } from '../assets/TimerFunction';
import Countdown from '../components/Countdown';
import Header from '../components/Header';
import Question from '../components/Question';
import { savePlayerScore } from '../redux/actions/player';
import quizThunk from '../redux/actions/quiz';

let questionIndex = 0;

class Quiz extends Component {
    state = {
      turnQuestion: {},
      turnAnswers: [],
      disabled: false,
      correctClass: {},
      wrongClass: {},
      contador: 30,
      display: { display: 'none' },
      feedback: false,
    };

  getQuestionByIndex = (newIndex) => {
    const { quizResults } = this.props;
    const question = quizResults.find((_question, index) => index === newIndex);
    this.setState({
      disabled: false,
      display: { display: 'none' },
      correctClass: {},
      wrongClass: {},
      contador: 30,
      turnQuestion: question,
      turnAnswers: this.shuffleArray([...question.incorrect_answers,
        question.correct_answer]),
    });
  }

  handleNextButton = () => {
    const { quizResults } = this.props;
    if (questionIndex < quizResults.length - 1) {
      clearInterval(this.interval);
      this.getQuestionByIndex(questionIndex += 1);
      this.pageInterval();
    } else {
      this.setState({ feedback: true });
    }
  }

  // Metodo para ramdomizar array:
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffleArray =(array) => {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  handleAnswers = () => {
    this.setState({
      correctClass: { border: '3px solid rgb(6, 240, 15)' },
      wrongClass: { border: '3px  solid red' },
      disabled: true,
    });
  }

  pageInterval = () => {
    const oneSec = 1000;
    this.interval = setInterval(() => {
      const { contador } = this.state;
      if (contador > 0) {
        this.setState({
          contador: contador - 1,
        });
        setCircleDasharray();
        setRemainingPathColor(contador);
      } else {
        this.handleAnswers();
        this.setState({
          display: { display: '' },
        });
        clearInterval(this.interval);
      }
    }, oneSec);
  }

  getDifficulty = (question) => {
    let questionPoint = 0;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    if (question.difficulty === 'hard') questionPoint = hard;
    if (question.difficulty === 'medium') questionPoint = medium;
    questionPoint = easy;
    return Number(questionPoint);
  }

  handlePoints = ({ value }) => {
    const { saveScore } = this.props;
    const { contador, turnQuestion } = this.state;
    const questionPoint = this.getDifficulty(turnQuestion);
    const ten = 10;
    let assertions = 0;
    if (value === turnQuestion.correct_answer) {
      const score = Number(ten + (contador * questionPoint));
      assertions += 1;
      saveScore({ score: Number(score), assertions: Number(assertions) });
    }
  }

  handleClickAnswer = ({ target }) => {
    this.handlePoints(target);
    this.handleAnswers();
    this.setState({
      contador: 0,
      display: { display: '' },
    });
  };

  componentDidMount = async () => {
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.getItem('ranking', JSON.stringify([]));
    }
    const { getQuiz, tokenPlayer } = this.props;
    await getQuiz(tokenPlayer);
    this.getQuestionByIndex(questionIndex);
    this.pageInterval();
  }

  render() {
    const {
      turnQuestion,
      turnAnswers,
      wrongClass,
      correctClass,
      disabled,
      contador,
      display,
      feedback,
    } = this.state;
    return (
      <>
        {feedback && <Redirect to="feedback" />}
        <div>
          <Header />
          { turnQuestion === {}
            ? (
              <div className="loading">
                <h1>Caregando... </h1>
              </div>
            )
            : (
              <>
                <Countdown contador={ contador } />
                <Question
                  turnQuestion={ turnQuestion }
                  answers={ turnAnswers }
                  handleClick={ this.handleClickAnswer }
                  nextQuestion={ this.handleNextButton }
                  correctClass={ correctClass }
                  wrongClass={ wrongClass }
                  disabled={ disabled }
                  display={ display }
                />
              </>
            )}
        </div>
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  quizResults: state.quiz.allQuestions,
  tokenPlayer: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuiz: (tokenPlayer) => dispatch(quizThunk(tokenPlayer)),
  saveScore: (score) => dispatch(savePlayerScore(score)),
});

Quiz.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
