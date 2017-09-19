import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import StatusSection from './status-section';
import InfoSection from './info-section';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guesses: [],
      feedback: 'Make your guess!',
      auralStatus: '',
      correctAnswer: Math.round(Math.random() * 100) + 1
    };
  }

  restartGame() {
    this.setState({
      guesses: [],
      feedback: 'Make your guess!',
      auralStatus: '',
      correctAnswer: Math.floor(Math.random() * 100) + 1
    });
  }

  makeGuess(guess) {
    guess = parseInt(guess, 10);
    if (isNaN(guess)) {
      this.setState({ feedback: 'Please enter a valid number' });
      return;
    }

    const difference = Math.abs(guess - this.state.correctAnswer);

    let feedback;
    if (difference >= 50) {
      feedback = "You're Ice Cold...";
    } else if (difference >= 30) {
      feedback = "You're Cold...";
    } else if (difference >= 10) {
      feedback = "You're Warm.";
    } else if (difference >= 1) {
      feedback = "You're Hot!";
    } else {
      feedback = 'You got it!';
    }

    this.setState({
      feedback,
      guesses: [...this.state.guesses, guess]
    });

    document.title = feedback ? `${feedback} | Hot or Cold` : 'Hot or Cold';
  }

  generateAuralUpdate() {
    const { guesses, feedback } = this.state;
    const pluralize = guesses.length > 1;

    const auralStatus = `Here's the status of the game right now: ${feedback} You've made ${guesses.length} ${pluralize
      ? 'guesses'
      : 'guess'}. ${pluralize
      ? 'In order of most- to least-recent, they are'
      : 'it was'}: ${guesses.join(', ')}`;

    this.setState({ auralStatus });
  }

  render() {
    const {feedback, guesses, auralStatus, correctAnswer} = this.state;
    const gameWon = guesses[guesses.length - 1] === correctAnswer;

    return (
      <div>
        <Header
          onRestartGame={() => this.restartGame()}
          onGenerateAuralUpdate={() => this.generateAuralUpdate()}
        />
        <main role="main">
          <GuessSection
            feedback={feedback}
            gameWon={gameWon}
            onMakeGuess={guess => this.makeGuess(guess)}
          />
          <StatusSection
            guesses={guesses}
            statusText={auralStatus}
          />
          <InfoSection />
        </main>
      </div>
    );
  }
}
