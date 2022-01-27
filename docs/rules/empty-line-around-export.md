# Enforce an empty line only before default exports and between multiline exports (empty-line-around-export)

## Rule Details

This rule aims to maintain a convention regarding empty lines before or between "export" statements

Examples of **incorrect** code for this rule:

```js

export const FIRST_CONST = 'first_constant';
// illegal empty line here between singleline exports
export const SECOND_CONST = 'second_constant';
export function multiLineExport() {
    let dummVar = 1;
    return dummyVar;
}
export default class DefaultExportClass {}

```

Examples of **correct** code for this rule:

```js

export const FIRST_CONST = 'first_constant';
export const SECOND_CONST = 'second_constant';
// correctly placed empty line here due to multiline export below
export function multiLineExport() {
    let dummVar = 1;
    return dummyVar;
}
// correctly placed line here due to default export below
export default class DefaultExportClass {}

```
