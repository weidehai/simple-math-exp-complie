function LogarithmNode(type = null, exp = null, parent = null) {
  this.type = type;
  this.exp = exp;
  this.parent = parent;
}
function TrigonometryNode(type = null, exp = null, parent = null) {
  this.type = type;
  this.exp = exp;
  this.parent = parent;
}

function ExponentNode(
  type = null,
  value = null,
  exponent = null,
  parent = null
) {
  this.type = type;
  this.value = value;
  this.exponent = exponent;
  this.parent = parent;
}

function UnaryOpNode(type = null, exp = null, parent = null) {
  this.type = type;
  this.exp = exp;
  this.parent = parent;
}

function BinaryOpNode(type = null, left = null, right = null, parent = null) {
  this.type = type;
  this.left = left;
  this.right = right;
  this.parent = parent;
}

function NumberNode(type = null, value = null, parent = null) {
  this.type = type;
  this.value = value;
  this.parent = parent;
}

export {
  NumberNode,
  BinaryOpNode,
  UnaryOpNode,
  ExponentNode,
  LogarithmNode,
  TrigonometryNode
};
