import { test, expect } from '@jest/globals';
import { sortPages } from './report.js';

test('sortPages', () => {
	let input = {
        'https://example.test/path/one': 1,
        'https://example.test/path': 3,
        'https://example.test/': 5,
    };
	let actual = sortPages(input);
    let expected = [
        ['https://example.test/', 5],
        ['https://example.test/path', 3],
        ['https://example.test/path/one', 1],
    ];
	expect(actual).toEqual(expected);
});

test('sortPages null values', () => {
	let input = {};
	let actual = sortPages(input);
    let expected = [];
	expect(actual).toEqual(expected);
});