import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../assets/Question.css';

class Question extends Component {
  render() {
    const {
      turnQuestion,
      answers,
      disabled,
      correctClass,
      wrongClass,
      handleClick,
      display,
    } = this.props;

    return !turnQuestion
      ? ''
      : (
        <div className="question-container">
          <div className="question-info">
            <p className="question-category">
              Categoria:
              <span data-testid="question-category">{turnQuestion.category}</span>
            </p>
            <p className="question-difficulty">
              Dificuldade:
              <span>{turnQuestion.difficulty}</span>
            </p>
            <p className="question-type">
              Tipo:
              <span>{turnQuestion.type}</span>
            </p>
          </div>
          <div className="question-container">
            <p>
              Pergunta:
              <span data-testid="question-text">{turnQuestion.question}</span>
            </p>
            <div className="answer-container" data-testid="answer-options">
              { answers.map((answer, index) => {
                if (answer === turnQuestion.correct_answer) {
                  return (
                    <button
                      key={ index }
                      type="button"
                      data-testid="correct-answer"
                      onClick={ handleClick }
                      disabled={ disabled }
                      style={ correctClass }
                      value={ answer }
                    >
                      {answer}
                    </button>
                  );
                }
                return (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ `wrong-answer-${index}` }
                    onClick={ handleClick }
                    disabled={ disabled }
                    style={ wrongClass }
                    value={ answer }
                  >
                    {answer}
                  </button>
                );
              })}
            </div>
          </div>
          <button
            className="btn-next"
            type="button"
            data-testid="btn-next"
            style={ display }
          >
            Próxima Questão
          </button>
        </div>
      );
  }
}

Question.propTypes = {
  turnQuestion: PropTypes.objectOf(PropTypes.any),
  answers: PropTypes.arrayOf(PropTypes.string),
  handleClick: PropTypes.func,
}.isRequired;

export default Question;
