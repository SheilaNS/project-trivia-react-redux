import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import Countdown from '../components/Countdown';
import { savePlayerScore } from '../redux/actions/player';
import quizThunk from '../redux/actions/quiz';

class Quiz extends Component {
    state = {
      turnQuestion: {},
      turnAnswers: [],
      disabled: false,
      correctClass: {},
      wrongClass: {},
      contador: 30,
      display: { display: 'none' },
      questionIndex: 0,
    };

  componentDidMount = async () => {
    const { getQuiz, tokenPlayer } = this.props;
    const { questionIndex } = this.state;
    await getQuiz(tokenPlayer);
    const { quizResults } = this.props;
    const question = quizResults.find((_question, index) => index === questionIndex);
    this.setState({
      // question,
      turnQuestion: question,
      turnAnswers: this.shuffleArray([...question.incorrect_answers,
        question.correct_answer]),
    });
    this.pageInterval();
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
      // display: { display: '' },
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
      } else {
        this.handleAnswers(); // problema aqui, precisamos criar um array ou objeto com todos os estados para passar para o question e ele utilizar tudo isso. -Gus
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
    return questionPoint;
  }

  handlePoints = ({ value }) => {
    const { saveScore } = this.props;
    const { contador, turnQuestion } = this.state;
    const questionPoint = this.getDifficulty(turnQuestion);
    const ten = 10;
    if (value === turnQuestion.correct_answer) {
      const score = ten + (contador * questionPoint);
      saveScore(score);
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

  render() {
    const {
      turnQuestion,
      turnAnswers,
      wrongClass,
      correctClass,
      disabled,
      contador,
      display,
      // contador,
      // question,
      // correctClass,
      // wrongClass,
      // display,
    } = this.state;
    return (
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
                // question={ question }
                answers={ turnAnswers }
                handleClick={ this.handleClickAnswer }
                correctClass={ correctClass }
                wrongClass={ wrongClass }
                disabled={ disabled }
                display={ display }
              />
            </>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quizResults: state.quiz.allQuestions,
  tokenPlayer: state.token,
  // responseCode: state.quiz.response_code,
});

const mapDispatchToProps = (dispatch) => ({
  getQuiz: (tokenPlayer) => dispatch(quizThunk(tokenPlayer)),
  saveScore: (score) => dispatch(savePlayerScore(score)),
});

Quiz.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
