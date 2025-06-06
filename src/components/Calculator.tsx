
import React, { useState } from 'react';
import CalculatorButton from './CalculatorButton';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [isScientific, setIsScientific] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '−':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const calculateScientific = (func: string) => {
    const value = parseFloat(display);
    let result: number;

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = Math.tan(value * Math.PI / 180);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'x²':
        result = value * value;
        break;
      case '1/x':
        result = 1 / value;
        break;
      case 'π':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setWaitingForOperand(true);
  };

  const handlePercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const handlePlusMinus = () => {
    const value = parseFloat(display);
    setDisplay(String(value * -1));
  };

  return (
    <div className="bg-black rounded-3xl p-6 shadow-2xl border border-slate-700/50">
      {/* Display */}
      <div className="bg-black rounded-2xl p-6 mb-6 border border-slate-800">
        <div className="text-right">
          <div className="text-4xl font-light text-white min-h-[60px] flex items-center justify-end overflow-hidden">
            {display}
          </div>
        </div>
      </div>

      {/* Scientific Toggle */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsScientific(!isScientific)}
          className="px-4 py-2 bg-slate-800 text-white rounded-full text-sm transition-all duration-300 hover:bg-slate-700"
        >
          {isScientific ? 'Basic' : 'Scientific'}
        </button>
      </div>

      {/* Scientific Functions */}
      {isScientific && (
        <div className="grid grid-cols-5 gap-3 mb-4">
          <CalculatorButton 
            onClick={() => calculateScientific('sin')} 
            type="function"
            className="text-sm"
          >
            sin
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => calculateScientific('cos')} 
            type="function"
            className="text-sm"
          >
            cos
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => calculateScientific('tan')} 
            type="function"
            className="text-sm"
          >
            tan
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => calculateScientific('ln')} 
            type="function"
            className="text-sm"
          >
            ln
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => calculateScientific('log')} 
            type="function"
            className="text-sm"
          >
            log
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => calculateScientific('π')} 
            type="function"
            className="text-sm"
          >
            π
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => calculateScientific('e')} 
            type="function"
            className="text-sm"
          >
            e
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => calculateScientific('x²')} 
            type="function"
            className="text-sm"
          >
            x²
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => calculateScientific('sqrt')} 
            type="function"
            className="text-sm"
          >
            √x
          </CalculatorButton>
          <CalculatorButton 
            onClick={() => calculateScientific('1/x')} 
            type="function"
            className="text-sm"
          >
            1/x
          </CalculatorButton>
        </div>
      )}

      {/* Main Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <CalculatorButton onClick={clear} type="clear">
          AC
        </CalculatorButton>
        <CalculatorButton onClick={handlePlusMinus} type="function">
          ±
        </CalculatorButton>
        <CalculatorButton onClick={handlePercent} type="function">
          %
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('÷')} type="operator">
          ÷
        </CalculatorButton>

        {/* Row 2 */}
        <CalculatorButton onClick={() => inputNumber('7')} type="number">
          7
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('8')} type="number">
          8
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('9')} type="number">
          9
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('×')} type="operator">
          ×
        </CalculatorButton>

        {/* Row 3 */}
        <CalculatorButton onClick={() => inputNumber('4')} type="number">
          4
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('5')} type="number">
          5
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('6')} type="number">
          6
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('−')} type="operator">
          −
        </CalculatorButton>

        {/* Row 4 */}
        <CalculatorButton onClick={() => inputNumber('1')} type="number">
          1
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('2')} type="number">
          2
        </CalculatorButton>
        <CalculatorButton onClick={() => inputNumber('3')} type="number">
          3
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('+')} type="operator">
          +
        </CalculatorButton>

        {/* Row 5 */}
        <CalculatorButton 
          onClick={() => inputNumber('0')} 
          type="number"
          className="col-span-2"
        >
          0
        </CalculatorButton>
        <CalculatorButton onClick={inputDecimal} type="number">
          .
        </CalculatorButton>
        <CalculatorButton onClick={() => performOperation('=')} type="operator">
          =
        </CalculatorButton>
      </div>
    </div>
  );
};

export default Calculator;
