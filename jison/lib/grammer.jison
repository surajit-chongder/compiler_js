%{
    var converter = require('number-to-words');
    var ParseTree = require('./parseTree.js');
%}

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"+"                   return '+'
"-"                   return '-'
"*"                   return '*'
"/"                   return '/'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%left '+'
%left '-'
%left '/'
%left '*'

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { console.log( new ParseTree($1).parse());}
    ;

e
    : e '+' e
        {$$ = {parent: $2, left: $1, right: $3};}
    | e '-' e
        {$$ = {parent: $2, left: $1, right: $3};}
    | e '*' e
        {$$ = {parent: $2, left: $1, right: $3};}
    | e '/' e
        {$$ = {parent: $2, left: $1, right: $3};}
    | NUMBER
        {$$ = converter.toWords(yytext);}
    ;
