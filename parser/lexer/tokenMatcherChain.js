import tokenRegular from "./regularDefine";

function TokenMatcherChain(handler) {
  this.handler = handler;
  this.nextHandler = null;
}

TokenMatcherChain.prototype.doWork = function(string) {
  const doNextHandlerIfInNeed = flag => {
    if (flag === "doNext") {
      if (this.nextHandler) return this.nextHandler.doWork(string);
      return false;
    }
    return flag;
  };
  const result = this.handler(string);
  return doNextHandlerIfInNeed(result);
};

TokenMatcherChain.prototype.setNextHandler = function(handler) {
  this.nextHandler = handler;
  return handler;
};

function parenthesesTokenMatcher(string) {
  const match = string.match(tokenRegular.parentheses);
  if (match) {
    switch (match[0]) {
      case "(":
        return { type: "TT_LPARNET", token: match[0] };
      case ")":
        return { type: "TT_RPARNET", token: match[0] };
    }
  }
  return "doNext";
}

function integerTokenMatcher(string) {
  const match = string.match(tokenRegular.integer);
  return match ? { type: "TT_INT", token: match[0] } : "doNext";
}
function floatTokenMatcher(string) {
  const match = string.match(tokenRegular.float);
  return match ? { type: "TT_FLOAT", token: match[0] } : "doNext";
}
function exponentTokenMatcher(string) {
  const match = string.match(tokenRegular.exponent);
  return match ? { type: "TT_EXPONENT", token: match[0] } : "doNext";
}
function logarithmTokenMatcher(string) {
  const match = string.match(tokenRegular.logarithm);
  if (match) {
    switch (match[0]) {
      case "ln":
        return { type: "TT_LN", token: match[0] };
      case "lg":
        return { type: "TT_LG", token: match[0] };
      case "log":
        return { type: "TT_LOG", token: match[0] };
    }
  }
  return "doNext";
}

function trigonometryTokenMatcher(string) {
  const match = string.match(tokenRegular.trigonometry);
  if (match) {
    switch (match[0]) {
      case "sin":
        return { type: "TT_SIN", token: match[0] };
      case "cos":
        return { type: "TT_COS", token: match[0] };
      case "tan":
        return { type: "TT_TAN", token: match[0] };
      case "cot":
        return { type: "TT_COT", token: match[0] };
    }
  }
  return "doNext";
}

function fourOperationsTokenMatcher(string) {
  const match = string.match(tokenRegular.operator);
  if (match) {
    switch (match[0]) {
      case "+":
        return { type: "TT_PLUS", token: match[0] };
      case "-":
        return { type: "TT_SUB", token: match[0] };
      case "*":
        return { type: "TT_MUL", token: match[0] };
      case "/":
        return { type: "TT_DIV", token: match[0] };
    }
  }
  return "doNext";
}

function createTokenMatcherChain() {
  const parenthesesTokenMatcherNode = new TokenMatcherChain(
    parenthesesTokenMatcher
  );
  const floatTokenMatcherNode = new TokenMatcherChain(floatTokenMatcher);
  const integerTokenMatcherNode = new TokenMatcherChain(integerTokenMatcher);
  const exponentTokenMatcherNode = new TokenMatcherChain(exponentTokenMatcher);
  const logarithmTokenMatcherNode = new TokenMatcherChain(
    logarithmTokenMatcher
  );
  const trigonometryTokenMatcherNode = new TokenMatcherChain(
    trigonometryTokenMatcher
  );
  const fourOperationsTokenMatcherNode = new TokenMatcherChain(
    fourOperationsTokenMatcher
  );
  parenthesesTokenMatcherNode
    .setNextHandler(floatTokenMatcherNode)
    .setNextHandler(integerTokenMatcherNode)
    .setNextHandler(exponentTokenMatcherNode)
    .setNextHandler(logarithmTokenMatcherNode)
    .setNextHandler(trigonometryTokenMatcherNode)
    .setNextHandler(fourOperationsTokenMatcherNode);
  return parenthesesTokenMatcherNode;
}

export default createTokenMatcherChain;
