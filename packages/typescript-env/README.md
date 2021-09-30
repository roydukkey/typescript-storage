# typescript-env

This package provides typed interface accessing environment variables.

[![Release Version](https://img.shields.io/npm/v/typescript-env.svg)](https://www.npmjs.com/package/typescript-env)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm install typescript-env
```

## Usage

```ts
import { Environment } from 'typescript-env';

const notSecretCode = Environment.getItem('REACT_APP_NOT_SECRET_CODE');
```

More information on using [environment variables with React](https://create-react-app.dev/docs/adding-custom-environment-variables).

## API

### Methods

<dl>

  <dt><code>getItem (key: string): string</code></dt>
  <dd>Returns the current value associated with the given name, when it exists for the environment, otherwise returning the given name.</dd>

  <dt><code>getItem&lt;T&gt; (name: string, defaultValue: T): T</code></dt>
  <dd>Returns the current value associated with the given name, when it exists for the environment, otherwise returning the specified default value.</dd>

  <dt><code>getItem&lt;T, K1, K2, K3&gt; (name: string, defaultValue: T | null?, ...types: [K1, K2, K3]): T | null?</code></dt>
  <dd>Returns the current value associated with the given name, matching any of the specified types, when it exists for the environment, otherwise returning the specified default value.</dd>

</dl>

**Note:** `T` in these signatures extends `string`, `number`, or `boolean`. `K1`, `K2`, `K3` are any of several strings indicating types: `'string'`, `'number'`, and `'boolean'`.

## Examples

```ts
// Some string with `'SomeNumber'` as the key default (key name).
const env_1 = Environment.getItem('env_1');

// Some number with `10` as the default value
const env_2 = Environment.getItem('env_2', 10);

// Some boolean with `false` as the default value
const env_3 = Environment.getItem('env_3', false);

// Some string with `null` as the key default.
const env_4 = Environment.getItem('env_4', null, 'string');

// Some number or boolean with `-1` as the default value
const env_5 = Environment.getItem('env_5', -1, 'number', 'boolean');

// Some number, boolean, or string with `null` as the default value
const env_6 = Environment.getItem('env_6', null, 'number', 'boolean', 'string');
```
