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

### API

#### Methods

<dt><code>getItem (key: string): string</code></dt>
Returns the current value associated with the given name, when it exists for the environment, otherwise returning the given name.

<dt><code>getItem&lt;T&gt; (name: string, defaultValue: T): T</code></dt>
Returns the current value associated with the given name, when it exists for the environment, otherwise returning the specified default value.
