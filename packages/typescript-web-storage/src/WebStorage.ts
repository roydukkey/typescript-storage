// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import type { StoreValue, TypedStorage } from './TypedStorage';


/** This class provides typed access to a particular {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API | Web Storage API} instance. */
export abstract class WebStorage implements TypedStorage {

	private readonly _listeners = new Map<string, Map<{ (event: WebStorageEvent<StoreValue>): unknown }, StorageListener>>();

	/** The {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API | Web Storage API} instance on which to add, update, or delete store values. */
	protected abstract readonly store: Storage;

	get length (): number {
		return this.store.length;
	}

	getItem<T extends StoreValue> (key: string): T | null {
		return WebStorage.parseRawValue(this.store.getItem(key));
	}

	setItem<T extends StoreValue> (key: string, value: T): this {
		this.store.setItem(key, JSON.stringify({ value }));
		return this;
	}

	removeItem (key: string): this {
		this.store.removeItem(key);
		return this;
	}

	/**
	 * Returns the name of the key at the given index, or null if the index is greater than or equal to the number of key/value pairs in storage.
	 *
	 * @param index - An integer representing the index of the key to get the name of. This is a zero-based index.
	 */
	key (index: number): string | null {
		return this.store.key(index);
	}

	clear (): this {
		this.store.clear();
		return this;
	}

	/**
	 * Appends an event listener for the {@link StorageEvent} of the given key.
	 *
	 * @param key - A string containing the name of the key for which to append the listener to the storage event.
	 * @param listener - A listener that receives a notification (an object that implements the {@link WebStorageEvent} interface) when a storage event for the given key occurs.
	 */
	// istanbul ignore next
	addListener<T extends StoreValue, R = void> (key: string, listener: { (event: WebStorageEvent<T>): R }): typeof listener {

		const innerListener: StorageListener = ({ key: eventKey, storageArea, oldValue, newValue, ...event }) => {
			if (key === eventKey && storageArea === this.store) {
				listener({
					key: eventKey,
					...event,
					oldValue: WebStorage.parseRawValue(oldValue),
					newValue: WebStorage.parseRawValue(newValue)
				});
			}
		};

		if (!this._listeners.has(key)) {
			this._listeners.set(key, new Map());
		}

		const listeners = this._listeners.get(key) as Map<typeof listener, StorageListener>;

		if (!listeners.has(listener)) {
			listeners.set(listener, innerListener);
			window.addEventListener('storage', innerListener);
		}

		return listener;
	}

	/**
	 * Removes all event listeners for the {@link StorageEvent} of the given key.
	 *
	 * @param key - A string containing the name of the key for which to remove the listeners from the storage event.
	 * @returns `true` when successfully removed at least one listener; otherwise, `false`.
	 */
	removeListener (key: string): boolean;

	/**
	 * Removes an event listener for the {@link StorageEvent} of the given key.
	 *
	 * @param key - A string containing the name of the key for which to remove the listener from the storage event.
	 * @param listener - A listener to remove from the storage event for the given key.
	 * @returns `true` when successfully removed at least one listener; otherwise, `false`.
	 */
	removeListener<T extends StoreValue, R = void> (key: string, listener?: { (event: WebStorageEvent<T>): R }): boolean;

	/**
	 * @internal
	 */
	// istanbul ignore next
	removeListener<T extends StoreValue, R = void> (key: string, listener?: { (event: WebStorageEvent<T>): R }): boolean {
		let result = false;

		if (this._listeners.has(key)) {
			const listeners = this._listeners.get(key) as Map<typeof listener, StorageListener>;

			if (listener) {
				const innerListener = listeners.get(listener);

				if (innerListener) {
					window.removeEventListener('storage', innerListener);
				}

				result = listeners.delete(listener);
			}

			else {
				listeners.forEach((innerListener, listener) => {
					window.removeEventListener('storage', innerListener);
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
	static parseRawValue<T extends StoreValue> (rawValue: string | null): T | null {
		return rawValue ? JSON.parse(rawValue).value : null;
	}

}


export interface WebStorageEvent<T extends StoreValue> extends Omit<StorageEvent, 'storageArea' | 'oldValue' | 'newValue'> {
	oldValue: T | null;
	newValue: T | null;
}


interface StorageListener {
	(this: Window, event: WindowEventMap['storage']): unknown;
}
