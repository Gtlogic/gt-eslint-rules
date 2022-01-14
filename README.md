# eslint-plugin-gt-eslint-rules

Custom ESLint rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-gt-eslint-rules`:

```sh
npm install eslint-plugin-gt-eslint-rules --save-dev
```

## Usage

Add `gt-eslint-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "gt-eslint-rules"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "gt-eslint-rules/rule-name": 2
    }
}
```

## Supported Rules

* empty-line-before-export


