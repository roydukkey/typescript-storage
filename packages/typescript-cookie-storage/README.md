# typescript-cookie-storage

This package provides typed interface for managing cookies.

[![Release Version](https://img.shields.io/npm/v/typescript-cookie-storage.svg)](https://www.npmjs.com/package/typescript-cookie-storage)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Install

```bash
npm install typescript-cookie-storage
```

## Usage

```ts
import { CookieStorage } from 'typescript-cookie-storage';

const cookieStorage = new CookieStorage();

// or, extend them.

class CookieStore extends CookieStorage {

  get isAuthenticated (): boolean {
    this.getItem<string>('authentication')?.length > 0 ?? false;
  }

  authorize (hash: string): this {
    return this.setItem('authentication', hash);
  }

  deauthorize (): this {
    return this.removeItem('authentication');
  }

}

export default new CookieStore();
```

## API

`CookieStorage` attempts to provide provide a similar interface as JavaScript's native [`Storage`](https://developer.mozilla.org/en-US/docs/Web/API/Storage) interface. However, all methods that receive or return storage values maintain the values type information.

### Properties

<dl>

  <dt><code>readonly length: number</code></dt>
  <dd>Returns the number of key/value pairs currently present in storage.</dd>

  <dt><code>protected readonly store: Storage</code></dt>
  <dd>The <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">Web Storage API</a> instance on which to add, update, or delete store values.</dd>

</dl>

### Methods

<dl>

  <dt><code>getItem &lt;T&gt; (key: string): T | null</code></dt>
  <dd>Returns the current value associated with the given key, or null if the given key does not exist in storage.</dd>

  <dt><code>setItem &lt;T&gt; (key: string, value: T, options?: <a href="//github.com/reactivestack/cookies/blob/v4.0.4/packages/universal-cookie/src/types.ts#L7">CookieSetOptions</a>): this</code></dt>
  <dd>Stores the value of an existing pair, identified by given key, to the specified value; otherwise, creating a new key/value pair when none previously exists.</dd>

  <dt><code>removeItem (key: string, options?: CookieSetOptions): this</code></dt>
  <dd>Removes the key/value pair for the given key from storage, if the key/value pair exists.</dd>

  <dt><code>clear (): this</code></dt>
  <dd>Empties all key/value pairs from storage, if there are any.</dd>

  <dt><code>addListener&lt;T, R&gt; (key: string, listener: { (event: CookieStorageEvent&lt;T&gt;): R }): typeof listener</code></dt>
  <dd>Appends an event listener for the cookie storage event of the given key.</dd>

  <dt><code>removeListener (key: string): boolean</code></dt>
  <dd>Removes all event listeners for the cookie storage event of the given key. Returns <code>true</code> when at least one listener is successfully removed, otherwise <code>false</code>.</dd>

  <dt><code>removeListener&lt;T, R&gt; (key: string, listener: { (event: CookieStorageEvent&lt;T&gt;): R }): boolean</code></dt>
  <dd>Removes an event listener for the cookie storage event of the given key. Returns <code>true</code> when the listener is successfully removed, otherwise <code>false</code>.</dd>

  <dt><code>static parseRawValue&lt;T&gt; (rawValue: { value: T } | null): T | null</code></dt>
  <dd>Parses a raw store value.</dd>

</dl>

**Note:** `T` in these signatures extends [`StoreValue`](//github.com/roydukkey/typescript-storage/tree/master/packages/typescript-web-storage/src/TypedStorage.ts#L42). `R` is simply the return type of the given listeners.

#### Listener Methods

Methods to add and remove listeners to specific storage keys have also been added to allow typed values during event handling.

```ts
import { CookieStorage } from 'typescript-cookie-storage';

const store = new CookieStorage();

const listener = store.addListener('my_bool', (event) => {
  const { newValue } = event;
  console.log(typeof newValue);
    // => 'boolean'
});

store.setItem('my_bool', true);

store.removeListener('my_bool', listener);

// Or, to remove all listeners on the key.
store.removeListener('my_bool');
```
