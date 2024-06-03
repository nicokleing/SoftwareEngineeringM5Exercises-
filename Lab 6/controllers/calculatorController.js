// controllers/calculatorController.js
exports.add = (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) + parseFloat(num2);
    res.json({ result });
  };
  
  exports.subtract = (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) - parseFloat(num2);
    res.json({ result });
  };
  
  exports.multiply = (req, res) => {
    const { num1, num2 } = req.query;
    const result = parseFloat(num1) * parseFloat(num2);
    res.json({ result });
  };
  
  exports.divide = (req, res) => {
    const { num1, num2 } = req.query;
    if (parseFloat(num2) === 0) {
      res.status(400).json({ error: "Cannot divide by zero" });
    } else {
      const result = parseFloat(num1) / parseFloat(num2);
      res.json({ result });
    }
  };
  
  exports.reset = (req, res) => {
    res.json({ message: 'Calculator reset' });
  };
  