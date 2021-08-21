import TOKEN_TYPE from "../lexer/tokenDefine";
import { syntaxError } from "./error";
import {
  isPlusOrMinusToken,
  isNumberToken,
  isFourOperationToken,
  isLeftParenthesesToken,
  isRightParenthesesToken,
  isLogarithmToken,
  isTrigonometryToken,
  isUnaryOperationToken,
  isHighLevelOperationToken,
  isLowLevelOperationToken,
  isNumberNode
} from "./util";
import {
  NumberNode,
  BinaryOpNode,
  UnaryOpNode,
  ExponentNode,
  LogarithmNode,
  TrigonometryNode
} from "./nodeDefine";

const context = {
  previousNode: null,
  nodeStack: [],
  candidateToken: null
};

const parsers = {
  expression: expressionParser,
  int: numberParser,
  float: numberParser,
  plus: operationParser,
  sub: operationParser,
  mul: operationParser,
  div: operationParser,
  exponent: exponentParser,
  ln: logarithmParser,
  lg: logarithmParser,
  log: logarithmParser,
  sin: trigonometryParser,
  cos: trigonometryParser,
  tan: trigonometryParser,
  cot: trigonometryParser,
  lparent: parenthesesParser,
  rparent: parenthesesParser
};

function expressionParser(token) {
  return parsers[token.type](token);
}

function numberParser(token) {
  function checkSyntax(token) {
    if(!token.next) return true
    return (
      token.next.type === TOKEN_TYPE.TT_PLUS ||
      token.next.type === TOKEN_TYPE.TT_SUB ||
      token.next.type === TOKEN_TYPE.TT_MUL ||
      token.next.type === TOKEN_TYPE.TT_DIV ||
      token.next.type === TOKEN_TYPE.TT_EXPONENT ||
      token.next.type === TOKEN_TYPE.TT_RPARNET
    );
  }
  if(!checkSyntax(token)) throw syntaxError('an number must follow with +-*/^')
  context.candidateToken = token.next;
  return new NumberNode(token.type, token.value);
}

function operationParser(token) {
  if (isUnaryOperationToken(token)) return unaryOperationParser(token);
  return binnaryOperatonParser(token);
}

function unaryOperationParser(token) {
  function checkSyntax(token) {
    if (
      isNumberToken(token) ||
      isLeftParenthesesToken(token) ||
      isPlusOrMinusToken(token) ||
      isLogarithmToken(token) ||
      isTrigonometryToken(token)
    )
      return true;
    throw syntaxError("unaryOperation syntax error");
  }
  let unaryNode;
  checkSyntax(token.next);
  if (token.type == TOKEN_TYPE.TT_SUB) {
    unaryNode = new UnaryOpNode("minus");
  } else if (token.type == TOKEN_TYPE.TT_PLUS) {
    unaryNode = new UnaryOpNode("positive");
  }
  unaryNode.exp = expressionParser(token.next);
  return unaryNode;
}

function binnaryOperatonParser(token) {
  if (isLowLevelOperationToken(token)) {
    let binaryOpNode = new BinaryOpNode(token.type);
    binaryOpNode.left = context.nodeStack.pop();
    binaryOpNode.left.parent = binaryOpNode;
    binaryOpNode.right = expressionParser(token.next);
    binaryOpNode.right.parent = binaryOpNode;
    return binaryOpNode;
  }
  if (isHighLevelOperationToken(token)) {
    let binaryOpNode = new BinaryOpNode(token.type);
    let previousNode = context.nodeStack.pop();
    if (isNumberNode(previousNode)) {
      binaryOpNode.left = previousNode;
      binaryOpNode.left.parent = binaryOpNode;
      binaryOpNode.right = expressionParser(token.next);
      binaryOpNode.right.parent = binaryOpNode;
      return binaryOpNode;
    } else {
      binaryOpNode.left = previousNode.right;
      previousNode.right = binaryOpNode;
      binaryOpNode.left.parent = binaryOpNode;
      binaryOpNode.right = expressionParser(token.next);
      binaryOpNode.right.parent = binaryOpNode;
      return previousNode;
    }
  }
}

function parenthesesParser(token) {
  function checkSyntax(token) {
    return (
      token.previous.type === TOKEN_TYPE.TT_LN ||
      token.previous.type === TOKEN_TYPE.TT_LG ||
      token.previous.type === TOKEN_TYPE.TT_LOG ||
      token.previous.type === TOKEN_TYPE.TT_SIN ||
      token.previous.type === TOKEN_TYPE.TT_COS ||
      token.previous.type === TOKEN_TYPE.TT_TAN ||
      token.previous.type === TOKEN_TYPE.TT_COT ||
      token.previous.type === TOKEN_TYPE.TT_PLUS ||
      token.previous.type === TOKEN_TYPE.TT_SUB ||
      token.previous.type === TOKEN_TYPE.TT_DIV ||
      token.previous.type === TOKEN_TYPE.TT_MUL
    );
  }
  if (!checkSyntax(token))
    throw syntaxError("left parentheses are at heel of number");
  if (token.type === TOKEN_TYPE.TT_RPARNET)
    throw syntaxError("right parentheses must after of left parentheses");
  context.candidateToken = token.next;
  let _nodeStack = context.nodeStack;
  context.nodeStack = [];
  while (context.candidateToken.type !== TOKEN_TYPE.TT_RPARNET) {
    context.nodeStack.push(expressionParser(context.candidateToken));
    if (!context.candidateToken) throw syntaxError("miss right parentheses");
  }
  context.candidateToken = context.candidateToken.next;
  let _nodeStack1 = context.nodeStack[0];
  context.previousNode = _nodeStack1;
  context.nodeStack = _nodeStack;
  return _nodeStack1;
}

function exponentParser(token) {
  let exponentNode = new ExponentNode(token.type);
  let previousNode = context.nodeStack.pop();
  if (isNumberNode(previousNode)) {
    exponentNode.value = previousNode.value;
    exponentNode.exponent = expressionParser(token.next);
    return exponentNode;
  } else {
    exponentNode.value = previousNode.right;
    previousNode.right = exponentNode;
    exponentNode.parent = previousNode;
    exponentNode.exponent = expressionParser(token.next);
    return previousNode;
  }
}

function logarithmParser(token) {
  if (token.next.type !== TOKEN_TYPE.TT_LPARNET)
    throw syntaxError("logarithm function must along with left parentheses");
  let logarithmNode = new LogarithmNode(token.type);
  logarithmNode.exp = expressionParser(token.next);
  return logarithmNode;
}

function trigonometryParser(token) {
  if (token.next.type !== TOKEN_TYPE.TT_LPARNET)
    throw "trigonometry function must along with left parentheses";
  let trigonometryNode = new TrigonometryNode(token.type);
  trigonometryNode.exp = expressionParser(token.next);
  return trigonometryNode;
}

export { parsers, context };
