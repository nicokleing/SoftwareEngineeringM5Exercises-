// controllers/calculatorController.js
const calculator = require('../lib/calculator');

const add = (req, res) => {
    const { num1, num2 } = req.query;
    const result = calculator.add(Number(num1), Number(num2));
    res.json({ result });
};

const subtract = (req, res) => {
    const { num1, num2 } = req.query;
    const result = calculator.subtract(Number(num1), Number(num2));
    res.json({ result });
};

const multiply = (req, res) => {
    const { num1, num2 } = req.query;
    const result = calculator.multiply(Number(num1), Number(num2));
    res.json({ result });
};

const divide = (req, res) => {
    const { num1, num2 } = req.query;
    try {
        const result = calculator.divide(Number(num1), Number(num2));
        res.json({ result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    add,
    subtract,
    multiply,
    divide
};
