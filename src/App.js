import React, { useState, useEffect } from 'react';
import './App.scss';


function App() {

  const [calc, setCalc] = useState('0');
  const [calcNum, setCalcNum] = useState('0');
  const [counter, setCounter] = useState(false);
  const actions = ['-', '+', '*', '/'];


  function action(operator) {
    if (calc === 'DIGIT LIMIT') {

    } else if (counter === true) {
      setCounter(prev => !prev)
      setCalc(prev => prev + operator)
    } else {
      setCalc(prev => prev + operator)
    }
  }

  function equallity() {
    if (!actions.some(item => item === calc[calc.length - 1])) { // checks if the last symbol is action - + * /, if it is nothing will happend. We do it to avoid errors in console.
      if (calc === 'DIGIT LIMIT') {
        setCalcNum('DIGIT LIMIT')
      } else {
        if (/\.\d+$/g.test(eval(calc)) && String(eval(calc)).match(/\.\d+$/g)[0].length >= 13) { // eslint-disable-line
          // eslint-disable-next-line
          if (String(eval(calc).toFixed(12)).match(/0+$/g) !== null) {
            // eslint-disable-next-line
            let a = String(eval(calc).toFixed(12)).match(/0+$/g)[0].length;
            setCounter(true);
            setCalcNum(eval(calc).toFixed(12 - a));// eslint-disable-line
          } else {
            setCounter(true);
            setCalcNum(eval(calc).toFixed(12));// eslint-disable-line
          }
        } else {
          setCounter(true);
          setCalcNum(String(eval(calc)));// eslint-disable-line 
          //here I should use string method, cause I cant use replace method with numbers.
        }
      }
    }
  }

  useEffect(() => {
    setCalc(calcNum)
  }, [calcNum]);


  useEffect(() => {
    // eslint-disable-next-line
    setCalc(() => calc.replace(/\++/g, "+").replace(/--/g, "+").replace(/\*\*/g, "*").replace(/\/\//g, "/").replace(/\.\./g, ".").replace(/([-+/*])(\.)/g, "$10$2").replace(/([-+/*])([+/*])/g, "$2").replace(/^0{2,}/g, '0').replace(/([\+\-\*\/])(0{1,})(\d+)/g, '$1$3').replace(/(\d+\.\d+)(\.)/g, '$1'))
  }, [calc]);



  function clicker(num) {
    if (calc === 'DIGIT LIMIT') {

    } else if (counter === true && num === '.') {
      setCalc('0' + num);
      setCounter(prev => !prev);
    } else if (counter === true) {
      setCalc('');
      setCalc(prev => prev + num);
      setCounter(prev => !prev);
    } else {
      setCalc(prev => prev !== '0' ? prev + num : prev === '0' && num === '.' ? prev + num : num)
    }
  }

  function deleteElement() {
    if (calc === 'DIGIT LIMIT' || counter === true) {

    } else if (calc.length === 1) {
      setCalc("0")
    } else {
      setCalc(calc.split("").splice(0, calc.length - 1).join(""));
    }
  }



  return (
    <div className='container app d-flex align-items-center' style={{ height: '100vh' }}>
      <div className='main-calc bg-light mx-auto row p-1'>
        <div className='bg-dark row text-center p-0 mx-auto'>
          <div id='display' className='col-12 border d-flex flex-column-reverse pb-4'><div className='text-end'>{calcNum}</div>
            <div className='text-end' style={{ color: 'white' }}>{calc.length >= 29 ? setCalc('DIGIT LIMIT') : calc}</div></div>
          <button id='clear' className='col-3 btn btn-dark border fontSizeDigit' onClick={() => { setCalc('0'); setCalcNum('0') }}>AC</button>
          <button className='col-3 btn btn-dark border fontSizeDigit' onClick={deleteElement}>C</button>
          <button id='multiply' className='col-3 btn btn-dark border fontSizeOperator' onClick={() => action('*')}>×</button>
          <button id='divide' className='col-3 btn btn-dark border fontSizeOperator' onClick={() => action('/')}>÷</button>
          <button id='one' className='col-3 btn btn-dark border fontSizeDigit' onClick={() => clicker('1')}>1</button>
          <button id='two' className='col-3 btn btn-dark border fontSizeDigit' onClick={() => clicker('2')}>2</button>
          <button id='three' className='col-3 btn btn-dark border fontSizeDigit' onClick={() => clicker('3')}>3</button>
          <button id='subtract' className='col-3 btn btn-dark border fontSizeOperator' onClick={() => action('-')}>-</button>
          <button id='four' className='col-3 btn btn-dark border fontSizeDigit' onClick={() => clicker('4')}>4</button>
          <button id='five' className='col-3 btn btn-dark border fontSizeDigit' onClick={() => clicker('5')}>5</button>
          <button id='six' className='col-3 btn btn-dark border fontSizeDigit' onClick={() => clicker('6')}>6</button>
          <button id='add' className='col-3 btn btn-dark border fontSizeOperator' onClick={() => action('+')}>+</button>
          <button id='seven' className='col-3 btn btn-dark border fontSizeDigit' onClick={() => clicker('7')}>7</button>
          <button id='eight' className='col-3 btn btn-dark border fontSizeDigit' onClick={() => clicker('8')}>8</button>
          <button id='nine' className='col-3 btn btn-dark border fontSizeDigit' onClick={() => clicker('9')}>9</button>
          <button id='decimal' className='col-3 btn btn-dark border fontSizeOperator' onClick={() => clicker('.')}>.</button>
          <button id='zero' className='col-6 btn btn-dark border fontSizeDigit' onClick={() => clicker('0')}>0</button>
          <button id='equals' className='col-6 btn btn-dark border fontSizeOperator' onClick={equallity}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
