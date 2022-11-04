const http = require("http");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Get method to introduce API
app.get("/", (req, res) => {
  return res.status(200).send({
    message:
      "Welcome, use the POST method to perform the required arithemetic operation",
  });
});

//POST method to perform operation
app.post("/", function (req, res) {
  const { operator_type, x, y } = req.body;

  //Check if input are not empty
  if (!operator_type || !x || !y) {
    return res.status(400).send({
      error: "Invalid request, pls input valid data and try again",
    });
  }

  // check if x and y are valid input
  if (typeof Number(x) !== "number" || typeof Number(y) !== "number") {
    return res.status(400).send({
      error: "Invalid type, input must be an integer",
    });
  }

  //check that the operator_type is valid
  const isOperatorValid =
    operator_type === "+" ||
    operator_type === "-" ||
    operator_type === "*" ||
    typeof operator_type === "string";
  if (!isOperatorValid) {
    return res.status(400).send({
      error:
        "Invalid operator type, operator type must be +, - , * or sentence",
    });
  }

  let addOperator;
  let subtractOperator;
  let multiplyOperator;

  //test the operator type is a string(word)
  // checck that the required operator type exists
  if (typeof operator_type === "string") {
    addOperator =
      operator_type.includes("add") || operator_type.includes("addition");
    subtractOperator =
      operator_type.includes("subtract") || operator_type.includes("minus");
    multiplyOperator =
      operator_type.includes("multiply") || operator_type.includes("times");
  }

  let operator;

  // assign operator as required
  if (addOperator) operator = "+";
  else if (subtractOperator) operator = "-";
  else if (multiplyOperator) operator = "*";
  else operator = operator_type;

  //perform operation
  result = eval(`${x} ${operator} ${y}`);

  return res.status(201).send({
    slackUsername: "Toluu",
    operator_type: operator,
    result,
  });
});

app.listen(port, () => {
  console.log("server live at " + port);
});
