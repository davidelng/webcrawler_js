import { test, expect } from '@jest/globals';
import { normalizeURL } from './crawl.js';

test('normalizeURL strip protocol', () => {
	let input = 'https://blog.boot.dev/path';
	let actual = normalizeURL(input);
	let expected = 'blog.boot.dev/path';
	expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
	let input = 'http://blog.boot.dev/path';
	let actual = normalizeURL(input);
	let expected = 'blog.boot.dev/path';
	expect(actual).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
	let input = 'https://blog.boot.dev/path/';
	let actual = normalizeURL(input);
	let expected = 'blog.boot.dev/path';
	expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
	let input = 'https://BLOG.boot.dev/path';
	let actual = normalizeURL(input);
	let expected = 'blog.boot.dev/path';
	expect(actual).toEqual(expected);
});

