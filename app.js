const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");
const upload = multer();

const app = express();
const port = process.env.PORT || 4000;
app.use(upload.none());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
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
  const { operation_type, x, y } = req.body;

  //Check if input are not empty
  if (!operation_type || !x || !y) {
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

  //check that the operation_type is valid
  const isOperatorValid = typeof operation_type === "string";

  if (!isOperatorValid) {
    return res.status(400).send({
      error:
        "Invalid operator type, operator type must be addition, subtraction, or multiplication",
    });
  }

  let addition;
  let subtraction;
  let multiplication;

  //Dynamic Response
  function validResponse(operatorType, result) {
    return res.status(200).send({
      slackUsername: "Toluu",
      operation_type: operatorType,
      result,
    });
  }

  const OPERATOR_TYPE = {
    addition: {
      type: "+",
      value: "addition",
    },
    subtraction: {
      type: "-",
      value: "subtraction",
    },
    multiplication: {
      type: "*",
      value: "multiplication",
    },
  };

  //test the operator type is a string(word)
  // check that the required operator type exists

  let operator;
  addition =
    operation_type.includes("add") || operation_type.includes("addition")
      ? "addition"
      : "";
  subtraction =
    operation_type.includes("subtract") || operation_type.includes("minus")
      ? "subtraction"
      : "";
  multiplication =
    operation_type.includes("multiply") || operation_type.includes("times")
      ? "multiplication"
      : "";

  operator = addition || multiplication || subtraction;

  // check if operator type exists
  if (!operator) {
    return res.status(400).send({
      error: "Invalid request, operator type must be present",
    });
  }

  result = eval(`${x} ${OPERATOR_TYPE[operator].type} ${y}`);
  return validResponse(OPERATOR_TYPE[operator].value, result);

});

app.listen(port, () => {
  console.log("server live at " + port);
});


