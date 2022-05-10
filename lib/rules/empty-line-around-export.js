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
      url: 'https://github.com/Gtlogic/gt-eslint-rules/blob/master/docs/rules/empty-line-around-export.md',
    },
    fixable: null,
    schema: []
  },

  create(context) {
    function constructLinkedList(nodes) {
      return nodes.map((node, index) => ({
          prevNode: index === 0 ? null : nodes[index - 1],
          node: node
      }));
    }

    function lineCount(node) {
      return node.loc.end.line - node.loc.start.line + 1;
    }

    function isSingleLineNode(node) {
      return lineCount(node) === 1;
    }

    function emptyLineBefore(element) {
      let { node, prevNode } = element;
      let commentsInBetween = node.parent.comments.filter(comment =>
        comment.loc.start.line > prevNode.loc.end.line && comment.loc.end.line < node.loc.start.line);
      let commentLength = commentsInBetween.reduce((total, comment) => total + lineCount(comment), 0);

      return node.loc.start.line - prevNode.loc.end.line - commentLength === 2;
    }

    function evaluate(node) {
      let nodes = constructLinkedList(node.body);
      nodes.forEach(element => {
        if (element.prevNode) {
          if (element.node.type === 'ExportNamedDeclaration') {
            if(['ExportNamedDeclaration', 'ExportDefaultDeclaration'].includes(element.prevNode.type)) {
              if (isSingleLineNode(element.prevNode) && isSingleLineNode(element.node) && emptyLineBefore(element)) {
                context.report({
                node: element.node,
                message: 'Unexpected empty line between singleline export declarations found!'
                })
              } else if (!isSingleLineNode(element.prevNode) && !emptyLineBefore(element)) {
                context.report({
                node: element.prevNode,
                message: 'Expected single empty line after multiline export declaration not found!'
                })
              } else if (!isSingleLineNode(element.node) && !emptyLineBefore(element)) {
                context.report({
                node: element.node,
                message: 'Expected single empty line before multiline export declaration not found!'
                })
              }
            }
          } else if (element.node.type === 'ExportDefaultDeclaration' && !emptyLineBefore(element)) {
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
