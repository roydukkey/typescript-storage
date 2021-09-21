# typescript-web-storage

This package provides typed interface for LocalStorage, SessionStorage, and WebStorage.

[![Release Version](https://img.shields.io/npm/v/typescript-web-storage.svg)](https://www.npmjs.com/package/typescript-web-storage)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm install typescript-web-storage
```

## Web Storage API

```ts
import { LocalStorage, SessionStorage, WebStorage } from 'typescript-web-storage';
```

`LocalStorage`, `SessionStorage`, and `WebStorage` all provide a similar interface as JavaScript's native [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface.

### Properties

#### `readonly length: number`
Returns the number of key/value pairs currently present in storage.

#### `protected readonly store: Storage`
The [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) instance on which to add, update, or delete store values.

### Methods

#### `getItem <T> (key: string): T | null`
Returns the current value associated with the given key, or null if the given key does not exist in storage.

#### `setItem <T> (key: string, value: T): this`
Stores the value of an existing pair, identified by given key, to the specified value; otherwise, creating a new key/value pair when none previously exists.

#### `removeItem (key: string): this`
Removes the key/value pair for the given key from storage, if the key/value pair exists.

#### `key (index: number): string | null`
Returns the name of the key at the given index, or null if the index is greater than or equal to the number of key/value pairs in storage.

#### `clear (): this`
Empties all key/value pairs from storage, if there are any.

### Listener Methods

Methods to add and remove listeners to specific storage keys have also been added to allow typed values during event handling.

```ts
import { LocalStorage } from 'typescript-web-storage';

const storage = new LocalStorage();

const listener = store.addListener('my_bool', (event) => {
  const { oldValue, newValue } = event;
  console.log(typeof oldValue, typeof newValue);
    // => 'boolean', 'boolean'
});

store.setItem('my_bool', true);

store.removeListener('my_bool', listener);

// Or, to remove all listeners on the key.
store.removeListener('my_bool');

```
