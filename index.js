import parser from './parser/syntaxer/syntaxer'
import lexer from './parser/lexer/lexer'

console.log(parser(lexer('2*3+4*(5-9)')))