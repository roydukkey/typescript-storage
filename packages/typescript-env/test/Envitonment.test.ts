// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { Environment as completeMain } from 'typescript-storage';
import { Environment as completeModule } from '../../../dist/build';
import { configurePackages } from '../../../test/utils';
import { Environment as main } from 'typescript-env';
import { Environment as module } from '../dist/build';
import { Environment as src } from '../src/Environment';


const packages = configurePackages(
	['src', src],
	['main', main],
	['module', module],
	['complete-main', completeMain],
	['complete-module', completeModule],
);


packages.forEach(([name, environment]) => {

	describe(`'${name}' Package`, () => {

		const preserveEnv = process.env;

		afterAll(() => {
			process.env = preserveEnv;
		});


		describe('Environment.getItem(key)', () => {

			test('Returns the key name when key does not exist', () => {
				const resulted = environment.getItem('someValue');
				const expected = 'someValue';
				expect(resulted).toBe(expected);
			});

			test('Returns the value as when key exists', () => {
				process.env = { ...process.env, someValue: 'Rocking these bells' };

				const resulted = environment.getItem('someValue');
				const expected = 'Rocking these bells';
				expect(resulted).toBe(expected);
			});

			test('Returns the value as string', () => {
				process.env = { ...process.env, someValue: '010' };

				const resulted = environment.getItem('someValue');
				const expected = '010';
				expect(resulted).toBe(expected);
			});

		});

		describe('Environment.getItem(key, defaultValue)', () => {

			test('Returns the default when key does not exist', () => {
				const resulted = environment.getItem('someNumber', 10);
				const expected = 10;
				expect(resulted).toBe(expected);
			});

			test('Returns the value as a string when key exists', () => {
				process.env = { ...process.env, someString: '025.09808000' };

				const resulted = environment.getItem('someString', '010');
				const expected = '025.09808000';
				expect(resulted).toBe(expected);
			});

			test('Returns the value as a number when key exists', () => {
				process.env = { ...process.env, someNumber: '025.09808000' };

				const resulted = environment.getItem('someNumber', 10);
				const expected = 25.09808;
				expect(resulted).toBe(expected);
			});

			test('Returns the value as a boolean when key exists', () => {
				process.env = { ...process.env, someTrue: 'true', someFalse: 'false', someZero: '0', someOne: '1' };

				let resulted = environment.getItem('someTrue', false);
				let expected = true;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someFalse', true);
				expected = false;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someZero', true);
				expected = false;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someOne', false);
				expected = true;
				expect(resulted).toBe(expected);
			});

		});

		describe('Environment.getItem(key, defaultValue, ...types)', () => {

			test('Returns the value as a boolean or number when key exists', () => {
				process.env = { ...process.env, someTrue: 'true', someFalse: 'false', someZero: '0', someOne: '1' };

				let resulted = environment.getItem('someTrue', 10, 'boolean', 'number');
				let expected: unknown = true;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someFalse', 10, 'boolean', 'number');
				expected = false;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someZero', true, 'boolean', 'number');
				expected = 0;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someOne', false, 'boolean', 'number');
				expected = 1;
				expect(resulted).toBe(expected);
			});

			test('Returns the value as a boolean or string when key exists', () => {
				process.env = { ...process.env, someTrue: 'true', someFalse: 'false', someZero: '0', someOne: '1' };

				let resulted = environment.getItem('someTrue', '10', 'boolean', 'string');
				let expected: unknown = true;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someFalse', '10', 'boolean', 'string');
				expected = false;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someZero', true, 'boolean', 'string');
				expected = '0';
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someOne', false, 'boolean', 'string');
				expected = '1';
				expect(resulted).toBe(expected);
			});

			test('Returns the value as a number or string when key exists', () => {
				process.env = { ...process.env, someTrue: 'true', someFalse: 'false', someZero: '0', someOne: '1' };

				let resulted = environment.getItem('someTrue', 10, 'number', 'string');
				let expected: unknown = 'true';
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someFalse', 10, 'number', 'string');
				expected = 'false';
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someZero', 'true', 'number', 'string');
				expected = 0;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someOne', 'false', 'number', 'string');
				expected = 1;
				expect(resulted).toBe(expected);
			});

			test('Returns the value as a boolean, number, string when key exists', () => {
				process.env = { ...process.env, someTrue: 'true', someFalse: 'false', someZero: '0', someOne: '1', someString: 'x1x2' };

				let resulted = environment.getItem('someTrue', 10, 'boolean', 'number', 'string');
				let expected: unknown = true;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someFalse', 10, 'boolean', 'number', 'string');
				expected = false;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someZero', true, 'boolean', 'number', 'string');
				expected = 0;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someOne', false, 'boolean', 'number', 'string');
				expected = 1;
				expect(resulted).toBe(expected);

				resulted = environment.getItem('someString', 10, 'boolean', 'number', 'string');
				expected = 'x1x2';
				expect(resulted).toBe(expected);
			});

		});

	});

});
