# eslint-plugin-gt-lint-rules

Custom ESLint rules

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-gt-lint-rules`:

```sh
npm install eslint-plugin-gt-lint-rules --save-dev
```

## Usage

Add `gt-lint-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "gt-lint-rules"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "gt-lint-rules/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


