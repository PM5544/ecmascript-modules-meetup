import React from 'react';
import Counter from 'Counter';
import Switcher from 'Switcher';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }

  componentDidMount() {
    this.counterInterval = setInterval(() => {
      const number = this.state.number + 1;
      this.setState({ number });
    }, 1000);
  }

  plus = () => {
    this.setState({ number: this.state.number + 5 });
  };

  render() {
    return (
      <div onClick={this.plus}>
        <p>React example</p>
        <Switcher on={this.state.number % 2} />
        -------
        <Counter number={this.state.number} />
      </div>
    );
  }
}

export default App;
