const express = require('express');
const router = express.Router();

// Ruta para sumar dos números
router.get('/add', (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let sum = number1 + number2;
    console.log(`Sum: ${sum}`);
    res.status(200).json({ result: sum });
});

// Ruta para restar dos números
router.get('/subtract', (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let difference = number1 - number2;
    console.log(`Difference: ${difference}`);
    res.status(200).json({ result: difference });
});

// Ruta para dividir dos números
router.get('/divide', (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    if (number2 === 0) {
        res.status(400).json({ error: 'Division by zero is not allowed' });
    } else {
        let quotient = number1 / number2;
        console.log(`Quotient: ${quotient}`);
        res.status(200).json({ result: quotient });
    }
});

// Ruta para multiplicar dos números
router.get('/multiply', (req, res) => {
    let number1 = parseInt(req.query.num1);
    let number2 = parseInt(req.query.num2);
    let product = number1 * number2;
    console.log(`Product: ${product}`);
    res.status(200).json({ result: product });
});

module.exports = router;
