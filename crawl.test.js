import { test, expect } from '@jest/globals';
import { normalizeURL, getURLsFromHTML } from './crawl.js';

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

test('getURLsFromHTML absolute', () => {
	let inputHTMLBody = `
	<html>
	    <body>
	        <a href="https://blog.boot.dev/">
		    <span>Boot.dev Blog</span>
		</a>
	    </body>
	</html>`;

	let inputBaseURL = 'https://blog.boot.dev';
	let actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	let expected = ['https://blog.boot.dev/'];
	expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
	let inputHTMLBody = `
	<html>
	    <body>
	        <a href="/path/">
		    <span>Boot.dev Blog</span>
		</a>
	    </body>
	</html>`;

	let inputBaseURL = 'https://blog.boot.dev';
	let actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	let expected = ['https://blog.boot.dev/path/'];
	expect(actual).toEqual(expected);
});

test('getURLsFromHTML both relative and absolute', () => {
	let inputHTMLBody = `
	<html>
	    <body>
	        <a href="/path1/">
		    <span>Boot.dev path 1</span>
		</a>
		<a href="https://blog.boot.dev/path2/">
		    <span>Boot.dev path 2</span>
		</a>
	    </body>
	</html>`;

	let inputBaseURL = 'https://blog.boot.dev';
	let actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	let expected = ['https://blog.boot.dev/path1/', 'https://blog.boot.dev/path2/'];
	expect(actual).toEqual(expected);
});


