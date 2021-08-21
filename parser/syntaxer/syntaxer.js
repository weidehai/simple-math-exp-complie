/*
expression:
  unaryExpression binaryExpression parenthesesExpression logarithmExpression trigonometryExpression exponentExpression number
unaryExpression:
  (^|lparent|+|-) (+|-) (number|parenthesesExpression|unaryExpression|exponentExpression|logarithmExpression|trigonometryExpression)
binaryExpression:
  expression ([+-*\/]) expression
parenthesesExpression:
  [+-] lparent expression rparent
logarithmExpression:
  (ln|lg|log) parenthesesExpression
trigonometryExpression:
  (sin|cos|tan|cot) parenthesesExpression
exponentExpression:
  parenthesesExpression|number exponent expression
*/

import { parsers, context } from "./parser";

function initContext(candidateToken) {
  context.nodeStack = [];
  context.previousNode = null
  context.candidateToken = candidateToken;
}

function getCandidateNode() {
  return context.candidateToken;
}

function parse(tokens) {
  initContext(tokens.next);
  let candidateToken = getCandidateNode();
  while (candidateToken) {
    let result = parsers.expression(candidateToken);
    if (result) context.nodeStack.push(result);
    candidateToken = getCandidateNode();
  }
  console.log(context.nodeStack);
}

//module.exports = parse;

export default parse
