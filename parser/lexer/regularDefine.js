
// todo 指数，三角函数，对数的解析
const token = /^((\d+(\.(?=\d+))?\d*)|((sin|cos|tan|cot|ln|lg|log)(\d+))|([\(\)]))\s*([\+\-\*\/\^]|$)/


const whiteSpace = /\s/
const integer = /^\d+$/
const float = /^\d+\.\d+$/
const operator = /[\+\-\*\/\=]/



const trigonometry = /^(sin|cos|tan|cot)$/
const logarithm = /^(ln|lg|log)$/

const tokenRegular = {
  parentheses:/^[\(\)]/,
  float:/^((\.\d+)|(\d+\.\d*))/,
  integer:/^\d+/,
  trigonometry:/^(sin|cos|tan|cot)/,
  logarithm:/^(ln|lg|log)/,
  exponent:/^\^/,
  operator:/^[\+\-\*\/]/
}


const regulars = {
  whiteSpace,
  integer,
  operator,
  float,
  token,
  logarithm,
  trigonometry
}

export default tokenRegular
