// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //


/** This interface describes the typed storage API. */
export interface TypedStorage {

	/** Returns the number of key/value pairs currently present in storage. */
	readonly length: number;

	/**
	 * Returns the current value associated with the given key, or null if the given key does not exist in storage.
	 *
	 * @param key - A string containing the name of the key to retrieve the value of.
	 */
	getItem: <T extends StoreValue> (key: string) => T | null;

	/**
	 * Stores the value of an existing pair, identified by given key, to the specified value; otherwise, creating a new key/value pair when none previously exists.
	 *
	 * @param key - A string containing the name of the key to create or update.
	 * @param value - A string containing the value to give the key being created or updated.
	 */
	setItem: <T extends StoreValue> (key: string, value: T) => this;

	/**
	 * Removes the key/value pair for the given key from storage, if the key/value pair exists.
	 *
	 * @param key - A string containing the name of the key to remove.
	 */
	removeItem: (key: string) => this;

	/**
	 * Empties all key/value pairs from storage, if there are any.
	 */
	clear: () => this;

}


export type StoreValue = boolean | number | string | ReadonlyArray<StoreValue | null> | StoreObject;


interface StoreObject {
	readonly [key: string]: StoreValue | null;
}
