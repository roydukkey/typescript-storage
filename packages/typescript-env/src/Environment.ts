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
	static getItem<T extends ValueTypes> (name: string, defaultValue: T): ValueType<T>;

	/**
	 * Returns the current value associated with the given name, when it exists for the environment, otherwise returning the specified default value or the given name.
	 *
	 * @param name - A string containing the name of the environment variable to retrieve the value of.
	 * @param defaultValue - The value used when not supplied for the environment.
	 */
	// static getItem<T extends string | number | boolean> (name: string, defaultValue?: T): string | T;


	static getItem<T extends ValueTypeFromName<K1>, K1 extends ValueTypeNames> (name: string, defaultValue: T, ...types: [K1]): ValueTypeFromName<K1>;

	static getItem<
		T extends ValueTypeFromName<K1> | ValueTypeFromName<K2>,
		K1 extends ValueTypeNames,
		K2 extends Exclude<ValueTypeNames, K1>
	> (name: string, defaultValue: T, ...types: [K1, K2]): ValueTypeFromName<K1> | ValueTypeFromName<K2>;

	static getItem<
		T extends ValueTypeFromName<K1> | ValueTypeFromName<K2> | ValueTypeFromName<K3>,
		K1 extends ValueTypeNames, K2 extends Exclude<ValueTypeNames, K1>,
		K3 extends Exclude<ValueTypeNames, K1 | K2>
	> (name: string, defaultValue: T, ...types: [K1, K2, K3]): ValueTypeFromName<K1> | ValueTypeFromName<K2> | ValueTypeFromName<K3>;

	/**
	 * @internal
	 */
	static getItem (name: string, defaultValue?: ValueTypes, ...types: [ValueTypeNames?, ValueTypeNames?, ValueTypeNames?]): ValueTypes {

		console.log(types);

		// Get value; otherwise the variable name.
		let value: string | typeof defaultValue = process.env[name] ?? name;

		// If a default value is provided, cast the string value to the appropriate type.
		if (defaultValue !== undefined) {

			// If the variable is not defined in on the environment, use the default value.
			if (process.env[name] === undefined) {
				return defaultValue;
			}

			else {

				const type = typeof defaultValue;

				if ('number' === type) {
					return Number(value);
				}

				else if ('boolean' === type) {
					value = value.toLocaleLowerCase();

					if (value === 'true') {
						return true;
					}

					else if (value === 'false') {
						return false;
					}

					return !! Number(value);
				}

			}

		}

		return value;
	}

}


type ValueTypes = string | number | boolean;
type ValueType<T extends ValueTypes> = T extends number ? number : T extends boolean ? boolean : string;
type ValueTypeNames = 'string' | 'number' | 'boolean';
type ValueTypeFromName<T> = T extends 'number' ? number : T extends 'boolean' ? boolean : T extends 'string' ? string : never;
