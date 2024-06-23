import { test, expect } from '@jest/globals';
import { normalizeURL, getURLsFromHTML } from './crawl.js';

test('normalizeURL strip protocol', () => {
	let input = 'https://example.test/path';
	let actual = normalizeURL(input);
	let expected = 'example.test/path';
	expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
	let input = 'http://example.test/path';
	let actual = normalizeURL(input);
	let expected = 'example.test/path';
	expect(actual).toEqual(expected);
});

test('normalizeURL strip trailing slash', () => {
	let input = 'https://example.test/path/';
	let actual = normalizeURL(input);
	let expected = 'example.test/path';
	expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
	let input = 'https://example.test/path';
	let actual = normalizeURL(input);
	let expected = 'example.test/path';
	expect(actual).toEqual(expected);
});

test('getURLsFromHTML absolute', () => {
	let inputHTMLBody = `
	<html>
	    <body>
	        <a href="https://example.test/">
		    <span>Example</span>
		</a>
	    </body>
	</html>`;

	let inputBaseURL = 'https://example.test';
	let actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	let expected = ['https://example.test/'];
	expect(actual).toEqual(expected);
});

test('getURLsFromHTML relative', () => {
	let inputHTMLBody = `
	<html>
	    <body>
	        <a href="/path/">
		    <span>Example/span>
		</a>
	    </body>
	</html>`;

	let inputBaseURL = 'https://example.test';
	let actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	let expected = ['https://example.test/path/'];
	expect(actual).toEqual(expected);
});

test('getURLsFromHTML both relative and absolute', () => {
	let inputHTMLBody = `
	<html>
	    <body>
	        <a href="/path1/">
		    <span>Path 1</span>
		</a>
		<a href="https://example.test/path2/">
		    <span>Path 2</span>
		</a>
	    </body>
	</html>`;

	let inputBaseURL = 'https://example.test';
	let actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
	let expected = ['https://example.test/path1/', 'https://example.test/path2/'];
	expect(actual).toEqual(expected);
});


