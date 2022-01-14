/**
 * @fileoverview Enforce an empty line only before default exports and between multiline exports
 * @author Omar Jaroudi
 */
 'use strict';

 //------------------------------------------------------------------------------
 // Rule Definition
 //------------------------------------------------------------------------------
 
 /**
  * @type {import('eslint').Rule.RuleModule}
  */
 module.exports = {
   meta: {
     type: 'problem',
     docs: {
       description: 'Enforce an empty line only before default exports and between multiline exports',
       category: 'Fill me in',
       recommended: false,
       url: 'https://github.com/Gtlogic/gt-eslint-rules/blob/master/docs/rules/empty-line-before-export.md',
     },
     fixable: null,
     schema: []
   },
 
   create(context) {
     function constructLinkedList(nodes) {
       return nodes.map((node, index) => {
           return {
             prevNode: index === 0 ? null : nodes[index - 1],
             node: node
           }
       })
     }
 
     function isSingleLineNode(node) {
       return node.loc.start.line === node.loc.end.line;
     }
 
     function emptyLineBefore(element) {
       return element.prevNode.loc.end.line === element.node.loc.start.line - 2;
     }
 
     function evaluate(node) {
       let nodes = constructLinkedList(node.body);
       nodes.forEach(element => {
         if(element.prevNode) {
           if(element.node.type === 'ExportNamedDeclaration') {
             if(['ExportNamedDeclaration', 'ExportDefaultDeclaration'].includes(element.prevNode.type)) {
               if(isSingleLineNode(element.prevNode) && emptyLineBefore(element)) {
                 context.report({
                   node: element.node,
                   message: 'Unexpected empty line after singleline export declaration found!'
                 })
               } else if(!isSingleLineNode(element.prevNode) && !emptyLineBefore(element)) {
                 context.report({
                   node: element.node,
                   message: 'Expected single empty line after multiline export declaration not found!'
                 })
               }
             }
           } else if(element.node.type === 'ExportDefaultDeclaration' && !emptyLineBefore(element)) {
             context.report({
               node: element.node,
               message: 'Expected single empty line before default export declaration not found!'
             })
           }
         }
       });
   }
     return {
       Program: evaluate
     };
   },
 };
 