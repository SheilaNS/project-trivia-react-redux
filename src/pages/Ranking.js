import React, { Component } from 'react';
import Header from '../components/Header';

class Ranking extends Component {
  render() {
    return (
      <div data-testid="ranking-title">
        <Header />
        <h1>Ranking</h1>
      </div>
    );
  }
}

export default Ranking;
