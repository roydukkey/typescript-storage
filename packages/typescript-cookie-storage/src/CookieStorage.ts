// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import UniversalCookie from 'universal-cookie';
import { WebStorage } from '../../typescript-web-storage/src/WebStorage';
import type { CookieChangeListener, CookieChangeOptions, CookieSetOptions } from 'universal-cookie';
import type { StoreValue, TypedStorage } from '../../typescript-web-storage/src/TypedStorage';


/** This class provides typed access to a particular domain's cookie storage. */
export class CookieStorage implements TypedStorage {

	private readonly _listeners = new Map<string, Map<{ (event: CookieStorageEvent<StoreValue>): unknown }, CookieChangeListener>>();

	/** The {@link UniversalCookie} instance on which to add, update, or delete store values. */
	protected readonly store: UniversalCookie;

	constructor (store: UniversalCookie = new UniversalCookie()) {
		this.store = store;
	}

	get length (): number {
		return Object.keys(this.store.getAll()).length;
	}

	getItem<T extends StoreValue>(key: string): T | null {
		return CookieStorage.parseRawValue(this.store.get(key));
	}

	setItem<T extends StoreValue>(key: string, value: T, options?: CookieSetOptions): this {
		this.store.set(key, { value }, options);
		return this;
	}

	removeItem (key: string, options?: CookieSetOptions): this {
		this.store.remove(key, options);
		return this;
	}

	clear (): this {
		Object.keys(this.store.getAll()).forEach((key) => this.store.remove(key));
		return this;
	}

	/**
	 * Appends an event listener for the cookie storage event of the given key.
	 *
	 * @param key - A string containing the name of the key for which to append the listener to the cookie storage event.
	 * @param listener - A listener that receives a notification (an object that implements the {@link CookieStorageEvent} interface) when a cookie storage event for the given key occurs.
	 */
	addListener<T extends StoreValue, R = void | never> (key: string, listener: { (event: CookieStorageEvent<T>): R }): typeof listener {

		const innerListener: CookieChangeListener = ({ name, value, ...event }) => {
			if (key === name) {
				listener({
					key: name,
					newValue: WebStorage.parseRawValue(value),
					...event
				});
			}
		};

		if (!this._listeners.has(key)) {
			this._listeners.set(key, new Map());
		}

		const listeners = this._listeners.get(key) as Map<typeof listener, CookieChangeListener>;

		if (!listeners.has(listener)) {
			listeners.set(listener, innerListener);
			this.store.addChangeListener(innerListener);
		}

		return listener;
	}

	/**
	 * Removes all event listeners for the cookie storage event of the given key.
	 *
	 * @param key - A string containing the name of the key for which to remove the listeners from the cookie storage event.
	 * @returns `true` when at least one listener is successfully removed; otherwise, `false`.
	 */
	removeListener (key: string): boolean;

	/**
	 * Removes an event listener for the cookie storage event of the given key.
	 *
	 * @param key - A string containing the name of the key for which to remove the listener from the cookie storage event.
	 * @param listener - A listener to remove from the cookie storage event for the given key.
	 * @returns `true` when the listener is successfully removed; otherwise, `false`.
	 */
	removeListener<T extends StoreValue, R = void | never> (key: string, listener: { (event: CookieStorageEvent<T>): R }): boolean;

	/**
	 * Removes an event listener for the cookie storage event of the given key.
	 *
	 * @param key - A string containing the name of the key for which to remove the listener from the cookie storage event.
	 * @param listener - A listener to remove from the cookie storage event for the given key.
	 * @returns `true` when at least one listener is successfully removed; otherwise, `false`.
	 */
	removeListener<T extends StoreValue, R = void | never> (key: string, listener?: { (event: CookieStorageEvent<T>): R }): boolean;

	/**
	 * @internal
	 */
	removeListener<T extends StoreValue, R = void | never> (key: string, listener?: { (event: CookieStorageEvent<T>): R }): boolean {
		let result = false;

		if (this._listeners.has(key)) {
			const listeners = this._listeners.get(key) as Map<typeof listener, CookieChangeListener>;

			if (listener) {
				const innerListener = listeners.get(listener);

				if (innerListener) {
					this.store.removeChangeListener(innerListener);
				}

				result = listeners.delete(listener);
			}

			else {
				listeners.forEach((innerListener, listener) => {
					this.store.removeChangeListener(innerListener);
					// istanbul ignore next: This is more a protection against misuse.
					result = listeners.delete(listener) || result;
				});
			}

			if (listeners.size <= 0) {
				this._listeners.delete(key);
			}
		}

		return result;
	}

	/**
	 * Parses a raw store value.
	 *
	 * @param rawValue - The value to be parsed.
	 */
	static parseRawValue<T extends StoreValue>(rawValue: { value: T } | null): T | null {
		return rawValue?.value ?? null;
	}

}


export interface CookieStorageEvent<T extends StoreValue> extends Omit<CookieChangeOptions, 'name' | 'value'> {
	key: string;
	newValue: T | null;
}
