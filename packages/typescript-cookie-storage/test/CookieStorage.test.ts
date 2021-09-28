// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import type { CookieStorageEvent } from '../src/CookieStorage';
import UniversalCookie from 'universal-cookie';
import { CookieStorage as completeMain } from 'typescript-storage';
import { CookieStorage as completeModule } from '../../../dist/build';
import { configurePackages } from '../../../test/utils';
import { CookieStorage as main } from 'typescript-cookie-storage';
import { CookieStorage as module } from '../dist/build';
import { CookieStorage as src } from '../src/CookieStorage';


const packages = configurePackages(
	['src', src],
	['main', main],
	['module', module],
	['complete-main', completeMain],
	['complete-module', completeModule],
);


packages.forEach(([name, storage]) => {

	const source = new UniversalCookie();
	const store = new storage(source);
	const getItem = (key: string): unknown => storage.parseRawValue(source.get(key));

	describe(`'${name}' Package`, () => {

		afterAll(() => cleanCookies());

		describe('CookieStorage.setItem<T>(key, value)', () => {

			test('Length begin at zero', () => {
				const resulted = store.length;
				const expected = 0;
				expect(resulted).toBe(expected);
			});

			test('Can set boolean value', () => {
				store.setItem('set_boolean', true);
				const resulted = getItem('set_boolean');
				const expected = true;
				expect(resulted).toBe(expected);
			});

			test('Can set number value', () => {
				store.setItem('set_number', 12345);
				const resulted = getItem('set_number');
				const expected = 12345;
				expect(resulted).toBe(expected);
			});

			test('Can set string value', () => {
				store.setItem('set_string_"true"', 'true');
				let resulted = getItem('set_string_"true"');
				let expected = 'true';
				expect(resulted).toBe(expected);

				store.setItem('set_string_"number"', '012345');
				resulted = getItem('set_string_"number"');
				expected = '012345';
				expect(resulted).toBe(expected);
			});

			test('Can set array value', () => {
				store.setItem('set_array', [1, '2', false, null, 'a']);
				const resulted = getItem('set_array');
				const expected = [1, '2', false, null, 'a'];
				expect(resulted).toEqual(expected);
			});

			test('Can set object value', () => {
				store.setItem('set_object', { 1: 2, 'a': 'b', true: null, null: false, undefined: 'undefined' });
				const resulted = getItem('set_object');
				const expected = { 1: 2, 'a': 'b', true: null, null: false, undefined: 'undefined' };
				expect(resulted).toEqual(expected);
			});

			test('Can set deep mixed value', () => {
				store.setItem('set_mixed', [1, '2', false, { 1: 2, 'a': 'b', true: [null, false], undefined: 'undefined' }, null, 'a']);
				const resulted = getItem('set_mixed');
				const expected = [1, '2', false, { 1: 2, 'a': 'b', true: [null, false], undefined: 'undefined' }, null, 'a'];
				expect(resulted).toEqual(expected);
			});

			test('Length is correct after all values have been added', () => {
				const resulted = store.length;
				const expected = 7;
				expect(resulted).toBe(expected);
			});

		});

		describe('CookieStorage.getItem<T>(key)', () => {

			test('Can get boolean value', () => {
				const resulted = store.getItem('set_boolean');
				const expected = true;
				expect(resulted).toBe(expected);
			});

			test('Can get number value', () => {
				const resulted = store.getItem('set_number');
				const expected = 12345;
				expect(resulted).toBe(expected);
			});

			test('Can get string value', () => {
				let resulted = store.getItem('set_string_"true"');
				let expected = 'true';
				expect(resulted).toBe(expected);

				resulted = store.getItem('set_string_"number"');
				expected = '012345';
				expect(resulted).toBe(expected);
			});

			test('Can get array value', () => {
				const resulted = store.getItem('set_array');
				const expected = [1, '2', false, null, 'a'];
				expect(resulted).toEqual(expected);
			});

			test('Can get object value', () => {
				const resulted = store.getItem('set_object');
				const expected = { 1: 2, 'a': 'b', true: null, null: false, undefined: 'undefined' };
				expect(resulted).toEqual(expected);
			});

			test('Can get deep mixed value', () => {
				const resulted = store.getItem('set_mixed');
				const expected = [1, '2', false, { 1: 2, 'a': 'b', true: [null, false], undefined: 'undefined' }, null, 'a'];
				expect(resulted).toEqual(expected);
			});

		});

		describe('CookieStorage.removeItem(key)', () => {

			test('Can remove value', () => {
				store.removeItem('set_boolean');
				const resulted = getItem('set_boolean');
				const expected = null;
				expect(resulted).toBe(expected);
			});

			test('Length is correct after after one value has been removed', () => {
				const resulted = store.length;
				const expected = 6;
				expect(resulted).toBe(expected);
			});

		});

		describe('CookieStorage.clear()', () => {

			test('Can clear all values', () => {
				store.clear();
				const resulted = getItem('set_number');
				const expected = null;
				expect(resulted).toBe(expected);
			});

			test('Length is correct after all values have been cleared', () => {
				const resulted = store.length;
				const expected = 0;
				expect(resulted).toBe(expected);
			});

		});

		describe('CookieStorage.constructor(store)', () => {

			test('Can constructor with a default store', () => {
				const resulted = new storage().length;
				const expected = 0;
				expect(resulted).toBe(expected);
			});

		});

		describe('Event Listeners', () => {
			let triggeredEvent: CookieStorageEvent<number> | undefined = undefined;

			const listener = (event: CookieStorageEvent<number>): void => {
				triggeredEvent = event;
			};

			test('Can append a listener', () => {
				const resulted = store.addListener('set_number', listener);
				const expected = listener;
				expect(resulted).toBe(expected);
			});

			test('Can see triggered event listener', () => {
				store.setItem('set_number', 54321);

				const resulted = triggeredEvent ?? {};
				const expected = {
					key: 'set_number',
					newValue: 54321,
					options: undefined
				};
				expect(resulted).toStrictEqual(expected);
			});

			let count = 0;

			const addListenerOne = (): number => count++;
			const addListenerTwo = (): number => count++;

			test('Can append a multiple listeners', () => {
				let resulted = store.addListener('set_number', addListenerOne);
				let expected = addListenerOne;
				expect(resulted).toBe(expected);

				resulted = store.addListener('set_number', addListenerTwo);
				expected = addListenerTwo;
				expect(resulted).toBe(expected);
			});

			test('Does not see triggered event form other keys', () => {
				triggeredEvent = undefined;
				store.setItem('set_other', 'another-value');

				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				const resulted = triggeredEvent ?? {};
				const expected = {};
				expect(resulted).toStrictEqual(expected);
				expect(count).toEqual(0);
			});

			test('Can see multiple triggered event listeners', () => {
				store.setItem('set_number', 98745);

				const resulted = triggeredEvent ?? {};
				const expected = {
					key: 'set_number',
					newValue: 98745,
					options: undefined
				};
				expect(resulted).toStrictEqual(expected);
				expect(count).toEqual(2);
			});

			test('Can remove a listener', () => {
				let resulted = store.removeListener('set_number', addListenerOne);
				let expected = true;
				expect(resulted).toBe(expected);

				store.setItem('set_number', 65489);
				expect(count).toBe(3);

				resulted = store.removeListener('set_number', addListenerOne);
				expected = false;
				expect(resulted).toBe(expected);
			});

			test('Can remove multiple listeners', () => {
				let resulted = store.removeListener('set_number');
				let expected = true;
				expect(resulted).toBe(expected);

				store.setItem('set_number', 74258);
				expect(count).toBe(3);

				resulted = store.removeListener('set_number');
				expected = false;
				expect(resulted).toBe(expected);
			});


			test('Cannot add multiple instances of the same listener', () => {
				let count = 0;
				const listener = (): number => count++;

				store.addListener('multiple_same', listener);
				store.addListener('multiple_same', listener);
				store.addListener('multiple_same', listener);
				store.addListener('multiple_same', listener);

				store.setItem('multiple_same', 'boo');
				expect(count).toBe(1);
			});


		});

	});

});


function cleanCookies (): void {
  document.cookie.split(';').forEach((c) => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
}
