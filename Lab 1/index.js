// index.js

const express = require('express');


// Crear el primer servidor
const app1 = express();
const port1 = 3000;

//app1.use(cors());
app1.use(express.json());

app1.get('/', (req, res) => {
  res.send('Hello from Server 1!');
});

app1.listen(port1, () => {
  console.log(`Server 1 listening on port ${port1}`);
});

// Crear el segundo servidor
const app2 = express();
const port2 = 3001;


app2.use(express.json());

app2.get('/', (req, res) => {
  res.send('Hello from Server 2!');
});

app2.listen(port2, () => {
  console.log(`Server 2 listening on port ${port2}`);
});

// Crear el tercer servidor
const app3 = express();
const port3 = 3002;


app3.use(express.json());

app3.get('/', (req, res) => {
  res.send('Hello from Server 3!');
});

app3.listen(port3, () => {
  console.log(`Server 3 listening on port ${port3}`);
});



// Crear el cuarto servidor
const app4 = express();
const port4 = 3003;


app4.use(express.json());

app4.get('/', (req, res) => {
  res.send('Hello from Server 4!');
});

app4.listen(port4, () => {
  console.log(`Server 4 listening on port ${port4}`);
});