// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

/** This class provides typed access to the current process' environment variables. */
export class Environment {

	/**
	 * Returns the current value associated with the given name, as a string, when it exists for the environment, otherwise returning the given name.
	 *
	 * @param name - A string containing the name of the environment variable to retrieve the value of.
	 */
	static getItem (name: string): string;

	/**
	 * Returns the current value associated with the given name, matching the specified default value's type, when it exists for the environment, otherwise returning the default value.
	 *
	 * @param name - A string containing the name of the environment variable to retrieve the value of.
	 * @param defaultValue - The value used when the item is not supplied for the environment.
	 */
	static getItem<T extends EnvironmentValue> (name: string, defaultValue: T): T extends number ? number : T extends boolean ? boolean : string;

	/**
	 * Returns the current value associated with the given name, matching the specified type, when it exists for the environment, otherwise returning the specified default value.
	 *
	 * @param name - A string containing the name of the environment variable to retrieve the value of.
	 * @param defaultValue - The value used when the item is not supplied for the environment.
	 * @param type - The possible types which are acceptable for item values.
	 */
	static getItem<T extends EnvironmentValueFromName<K1> | null, K1 extends EnvironmentValueNames> (name: string, defaultValue: T, type: K1): EnvironmentValueFromName<K1> | (T extends null ? null : never);

	/**
	 * Returns the current value associated with the given name, matching any of the specified types, when it exists for the environment, otherwise returning the specified default value.
	 *
	 * @param name - A string containing the name of the environment variable to retrieve the value of.
	 * @param defaultValue - The value used when the item is not supplied for the environment.
	 * @param types - The possible types which are acceptable for item values.
	 */
	static getItem<
		T extends EnvironmentValueFromName<K1> | EnvironmentValueFromName<K2> | null,
		K1 extends EnvironmentValueNames,
		K2 extends Exclude<EnvironmentValueNames, K1>
	> (name: string, defaultValue: T, ...types: [K1, K2]): EnvironmentValueFromName<K1> | EnvironmentValueFromName<K2> | (T extends null ? null : never);

	/**
	 * Returns the current value associated with the given name, matching any of the specified types, when it exists for the environment, otherwise returning the specified default value.
	 *
	 * @param name - A string containing the name of the environment variable to retrieve the value of.
	 * @param defaultValue - The value used when the item is not supplied for the environment.
	 * @param types - The possible types which are acceptable for item values.
	 */
	static getItem<
		T extends EnvironmentValueFromName<K1> | EnvironmentValueFromName<K2> | EnvironmentValueFromName<K3> | null,
		K1 extends EnvironmentValueNames, K2 extends Exclude<EnvironmentValueNames, K1>,
		K3 extends Exclude<EnvironmentValueNames, K1 | K2>
	> (name: string, defaultValue: T, ...types: [K1, K2, K3]): EnvironmentValueFromName<K1> | EnvironmentValueFromName<K2> | EnvironmentValueFromName<K3> | (T extends null ? null : never);

	/**
	 * @internal
	 */
	static getItem (name: string, defaultValue?: EnvironmentValue | null, ...types: [EnvironmentValueNames?, EnvironmentValueNames?, EnvironmentValueNames?]): EnvironmentValue | null {

		// Get value; otherwise the variable name.
		const value = process.env[name] ?? name;

		// If a default value is provided, cast the string value to the appropriate type.
		if (defaultValue !== undefined) {

			// If the variable is not defined in on the environment, use the default value.
			if (process.env[name] === undefined) {
				return defaultValue;
			}

			if (types.length <= 0) {
				types = [typeof defaultValue as EnvironmentValueNames];
			}

			if (types.includes('number')) {
				const testValue = Number(value);

				if (!Number.isNaN(testValue) || !types.includes('boolean') && !types.includes('string')) {
					return testValue;
				}
			}

			if (types.includes('boolean')) {
				const testValue = value.toLocaleLowerCase();

				if (testValue === 'true') {
					return true;
				}
				else if (testValue === 'false') {
					return false;
				}

				if (!types.includes('string')) {
					return !! Number(value);
				}
			}

		}

		return value;
	}

}


type EnvironmentValue = string | number | boolean;
type EnvironmentValueNames = 'string' | 'number' | 'boolean';
type EnvironmentValueFromName<T> = T extends 'number' ? number : T extends 'boolean' ? boolean : T extends 'string' ? string : never;
