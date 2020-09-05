import React, { Component } from 'react';
import './App.css';
import * as math from 'mathjs';

const numbers = [
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "zero", value: "0" },
  { id: "decimal", value: "." }
];

const operators = [
  { id: "add", value: "+" },
  { id: "subtract", value: "-" },
  { id: "multiply", value: "*" },
  { id: "divide", value: "/" },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '0',
      lastPressed: undefined

    }
  }

  handleClick = (e) => {

    const { input, lastPressed } = this.state;
    const { innerText } = e.target;

    this.setState({
      lastPressed: innerText
    });

    switch (innerText) {
      case '.':
        let splitNums = input.split(/[+\-*/]/);
        let checkPoint = splitNums.slice(-1)[0]; //get the value of the last input
        console.log(checkPoint);
        if (!checkPoint.includes('.')) {
          this.setState({
            input: input + '.'
          });
        }
        break;
      case 'AC':
        this.setState({
          input: '0',
          lastPressed: undefined
        });
        break;
      case '=':
        if (operators.some(operator => operator.value === (lastPressed))) {
          this.setState({
            input: '0'
          });
        } else {
          this.setState({
            input: math.evaluate(input) + ''
          });
        }
        break;
      default:
        const isOp = operators.some(operator => operator.value === (innerText));
        const isLastOp = operators.some(operator => operator.value === (lastPressed));
        const opRegex = /[+\-*/]/g;
        //limit the input and check it's initial value
        (input.length > 39) ? alert('Input Limit Reached')
          : (input === '0') ? this.setState({ input: innerText })
            : this.setState({ input: input + innerText });
        //check if the input is an operator
        if (isOp) {
          this.setState({
            input: input + innerText
          });
          //check if the last input was an operator
          if (isLastOp && innerText !== '-') {
            this.setState({
              input: input.replace(opRegex, '') + innerText
            });
          }
        }
    }
  };

  render() {
    const { input } = this.state;
    return (
      <div className='container'>
        <div className='calculator'>
          <div id={(input.length > 19) ? 'display-smaller-font' : 'display'}>{this.state.input}</div>
          <div className="numContainer">
            <button id="clear" className='clear' onClick={this.handleClick.bind(this)}>AC</button>
            {numbers.map((number, idx) => (
              <button key={idx} id={number.id} className={(number.id !== 'zero') ? 'numkeys' : 'zero'} onClick={this.handleClick.bind(this)}>{number.value}</button>
            ))}
          </div>
          <div className="opContainer">
            {operators.map((operator, idx) => (
              <button key={idx} id={operator.id} className='operators' onClick={this.handleClick.bind(this)}>{operator.value}</button>
            ))}
            <button id="equals" className="equal" onClick={this.handleClick.bind(this)}>=</button>
          </div>
          <footer>by{' '}
            <a href="https://github.com/eljoedeleon"
              target="_blank"
              rel="noopener noreferrer">eljoedeleon</a>
          </footer>
        </div>
      </div>
    );
  }
}
export default App;
