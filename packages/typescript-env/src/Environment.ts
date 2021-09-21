// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

/** This class provides typed access to the current process' environment variables. */
export class Environment {

	/**
	 * Returns the current value associated with the given name, when it exists for the environment, otherwise returning the given name.
	 *
	 * @param name - A string containing the name of the environment variable to retrieve the value of.
	 */
	static getItem (name: string): string;

	/**
	 * Returns the current value associated with the given name, when it exists for the environment, otherwise returning the specified default value.
	 *
	 * @param name - A string containing the name of the environment variable to retrieve the value of.
	 * @param defaultValue - The value used when not supplied for the environment.
	 */
	static getItem<T extends string | number | boolean> (name: string, defaultValue: T): T;

	/**
	 * @internal
	 */
	static getItem<T extends string | number | boolean> (name: string, defaultValue?: T): string | T {

		// Get value; otherwise the variable name.
		let value: string | T = process.env[name] ?? name;

		// If a default value is provided, cast the string value to the appropriate type.
		if (defaultValue !== undefined) {

			// If the variable is not defined in on the environment, use the default value.
			if (process.env[name] === undefined) {
				return defaultValue;
			}

			else {

				const type = typeof defaultValue;

				if ('number' === type) {
					return Number(value) as T;
				}

				else if ('boolean' === type) {
					value = value.toLocaleLowerCase();

					if (value === 'true') {
						return true as T;
					}

					else if (value === 'false') {
						return false as T;
					}

					return !! Number(value) as T;
				}

			}

		}

		return value;
	}

}
