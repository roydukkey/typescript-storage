// ================================================================= //
// Copyright (c) roydukkey. All rights reserved.                     //
// ================================================================= //

import { SessionStorage as completeMain } from 'typescript-storage';
import { SessionStorage as completeModule } from '../dist/build';
import { configurePackages } from './utils';
import { SessionStorage as main } from 'typescript-web-storage';
import { SessionStorage as module } from '../packages/typescript-web-storage/dist/build';
import { SessionStorage as src } from '../packages/typescript-web-storage/src/SessionStorage';


const packages = configurePackages(
	['src', src],
	['main', main],
	['module', module],
	['complete-main', completeMain],
	['complete-module', completeModule],
);


packages.forEach(([name, storage]) => {

	const source = window.sessionStorage;
	const store = new storage();
	const getItem = (key: string): unknown => storage.parseRawValue(source.getItem(key));

	describe(`'${name}' Package`, () => {

		describe('SessionStorage.setItem<T>(key, value)', () => {

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

		describe('SessionStorage.getItem<T>(key)', () => {

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

		describe('LocalStorage.key(index)', () => {

			test('Can get name of a key by index', () => {
				const resulted = store.key(1);
				const expected = 'set_number';
				expect(resulted).toBe(expected);
			});

		});

		describe('SessionStorage.removeItem(key)', () => {

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

		describe('SessionStorage.clear()', () => {

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

	});

});
