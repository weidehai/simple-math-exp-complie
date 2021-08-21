import TOKEN_TYPE from "../lexer/tokenDefine";
function isFourOperationToken(token) {
  const type = token.type;
  return (
    type === TOKEN_TYPE.TT_PLUS ||
    type === TOKEN_TYPE.TT_SUB ||
    type === TOKEN_TYPE.TT_MUL ||
    type === TOKEN_TYPE.TT_DIV
  );
}

function isLogarithmToken(token) {
  const type = token.type;
  return (
    type === TOKEN_TYPE.TT_LOG ||
    type === TOKEN_TYPE.TT_LN ||
    type === TOKEN_TYPE.TT_LG
  );
}

function isTrigonometryToken(token) {
  const type = token.type;
  return (
    type === TOKEN_TYPE.TT_SIN ||
    type === TOKEN_TYPE.TT_COS ||
    type === TOKEN_TYPE.TT_TAN ||
    type === TOKEN_TYPE.TT_COT
  );
}

function isLeftParenthesesToken(token) {
  const type = token.type;
  return type === TOKEN_TYPE.TT_LPARNET;
}

function isRightParenthesesToken(token) {
  const type = token.type;
  return type === TOKEN_TYPE.TT_RPARNET;
}

function isNumberToken(token) {
  const type = token.type;
  return type === TOKEN_TYPE.TT_INT || type === TOKEN_TYPE.TT_FLOAT;
}

function isPlusOrMinusToken(token) {
  const type = token.type;
  return type === TOKEN_TYPE.TT_PLUS || type === TOKEN_TYPE.TT_SUB;
}

function isUnaryOperationToken(token) {
  if (!token.previous) return true;
  const type = token.previous.type;
  return type === TOKEN_TYPE.TT_LPARNET || isFourOperationToken(token.previous.type);
}

function isHighLevelOperationToken(token) {
  const type = token.type;
  return type === TOKEN_TYPE.TT_DIV || type === TOKEN_TYPE.TT_MUL;
}
function isLowLevelOperationToken(token) {
  const type = token.type;
  return type === TOKEN_TYPE.TT_SUB || type === TOKEN_TYPE.TT_PLUS;
}

function isNumberNode(node) {
  const type = node.type;
  return (
    type === TOKEN_TYPE.TT_INT ||
    type === TOKEN_TYPE.TT_FLOAT ||
    type === "minus" ||
    type === "positive"
  );
}

export {
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
};
