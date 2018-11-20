import React from 'react';
import Counter from 'Counter';
import Switcher from 'Switcher';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    this.plus = this.plus.bind(this);
  }

  componentDidMount() {
    this.counterInterval = setInterval(() => {
      this.setState(state => ({ number: state.number + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.counterInterval);
  }

  plus() {
    this.setState(state => ({ number: state.number + 5 }));
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
