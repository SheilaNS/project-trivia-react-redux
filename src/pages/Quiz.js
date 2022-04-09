import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Question from '../components/Question';
import Countdown from '../components/Countdown';
import { quizThunk, savePlayerScore } from '../redux/actions';

class Quiz extends Component {
  state = {
    questionIndex: 0,
    contador: 30,
    question: {},
    correctClass: {},
    wrongClass: {},
    display: {},
    next: true,
  }

  handleAnswers = () => {
    this.setState({
      correctClass: { border: '3px solid rgb(6, 240, 15)' },
      wrongClass: { border: '3px  solid red' },
      display: { display: '' },
      next: false,
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
        clearInterval(this.interval);
      }
    }, oneSec);
  }

  componentDidMount = async () => {
    const { getQuiz, tokenPlayer } = this.props;
    const { questionIndex } = this.state;
    await getQuiz(tokenPlayer);
    const { quizResults } = this.props;
    this.pageInterval();
    const question = quizResults.find((_question, index) => index === questionIndex);
    this.setState({
      question,
    });
  }

  render() {
    const { contador,
      question,
      correctClass,
      wrongClass,
      display } = this.state;
    return (
      <div>
        <Header />
        {!question
          ? (
            <div className="loading">
              <h1>Caregando... </h1>
            </div>
          )
          : (
            <>
              <Countdown contador={ contador } />
              <Question
                question={ question }
                correctClass={ correctClass }
                wrongClass={ wrongClass }
                display={ display }
              />
            </>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quizResults: state.quiz.results,
  tokenPlayer: state.token,
  responseCode: state.quiz.response_code,
});

const mapDispatchToProps = (dispatch) => ({
  getQuiz: (tokenPlayer) => dispatch(quizThunk(tokenPlayer)),
  saveScore: (score) => dispatch(savePlayerScore(score)),
});

Quiz.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
