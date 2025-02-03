# Number Classification API

A simple Node.js API that classifies integers and fetches fun facts from [numbersapi.com](http://numbersapi.com).

## Features

- **GET** `/api/classify-number?number=<integer>`
  - Checks if the number is prime.
  - Checks if the number is perfect.
  - Checks if the number is an Armstrong (narcissistic) number.
  - Returns a fun fact from numbersapi.com.

## Example Response

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "Some interesting fact about 371..."
}
