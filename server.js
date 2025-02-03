const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); 


function isPrime(n) {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function isPerfect(n) {
  if (n < 1) return false;
  let sum = 1;
    for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      sum += i;
      if (i !== n / i) {
        sum += n / i;
      }
    }
  }
  return n > 1 && sum === n;
}

function isArmstrong(n) {
  const str = String(n);
  const power = str.length;
  let sum = 0;
  for (const digit of str) {
    sum += Math.pow(Number(digit), power);
  }
  return sum === n;
}


function sumOfDigits(n) {
  return String(n)
    .split('')
    .reduce((acc, digit) => acc + Number(digit), 0);
}

app.get('/api/classify-number', async (req, res) => {
  const numberParam = req.query.number;

  
  if (!numberParam || isNaN(numberParam) || !Number.isInteger(Number(numberParam))) {
    return res.status(400).json({
      number: numberParam,
      error: true
    });
  }

  const number = parseInt(numberParam, 10);

  
  let properties = [];
  if (number % 2 === 0) {
    properties.push('even');
  } else {
    properties.push('odd');
  }
  if (isPrime(number)) {
    properties.push('prime');
  }
  if (isPerfect(number)) {
    properties.push('perfect');
  }
  if (isArmstrong(number)) {
    properties.push('armstrong');
  }

  
  const digit_sum = sumOfDigits(number);

  
  let fun_fact = '';
  try {
    const response = await axios.get(`http://numbersapi.com/${number}?json`);
    fun_fact = response.data.text; 
  } catch (error) {
    
    fun_fact = 'No fact available at the moment.';
  }

  
  return res.status(200).json({
    number,
    is_prime: isPrime(number),
    is_perfect: isPerfect(number),
    properties,
    digit_sum,
    fun_fact
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Number Classification API is running on port ${PORT}`);
});
