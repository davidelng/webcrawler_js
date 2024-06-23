import { JSDOM } from 'jsdom';

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
	const baseURLObj = new URL(baseURL);
	const currentURLObj = new URL(currentURL);
	if (baseURLObj.hostname !== currentURLObj.hostname) {
		return pages;
	}

	const normalizedCurrentURL = normalizeURL(currentURL);
	if (pages[normalizedCurrentURL] > 0) {
		pages[normalizedCurrentURL]++;
		return pages;
	}

	pages[normalizedCurrentURL] = 1;
	console.log(`Actively crawling: ${currentURL}`);
	const htmlBody = await fetchHTML(currentURL)
	const nextURLs = getURLsFromHTML(htmlBody, baseURL);
	for (let nextURL of nextURLs) {
		pages = await crawlPage(baseURL, nextURL, pages);
	}	

	return pages;
}

async function fetchHTML(url) {
	let res = null;
	try {
		res = await fetch(url);
		if (res.status >= 400) {
			console.log(`Got HTTP error on ${url}, code: ${res.status}`);
			return pages;
		}
		const contentType = res.headers.get('content-type');
		if (!contentType || !contentType.includes('text/html')) {
			console.log(`Non HTML response, content-type ${contentType}, on page ${url}`);
			return pages;
		}

		return res.text();
	} catch (err) {
		console.error(`Error in fetch: ${err.message}, on page: ${url}`);
	}
}

function getURLsFromHTML(htmlBody, baseURL) {
	let urls = [];
	let dom = new JSDOM(htmlBody);
	let anchors = dom.window.document.querySelectorAll('a');
	for (let anchor of anchors) {
		if (anchor.hasAttribute('href')) {
			let href = anchor.getAttribute('href');
			try {
				let urlObj = new URL(href, baseURL);
				urls.push(urlObj.href);
			} catch (err) {
				console.error(`${err.message}: ${href}`)
			}
		}
	}
	return urls
}

function normalizeURL(urlString) {
	let urlObj = new URL(urlString);
	let hostPath = `${urlObj.hostname}${urlObj.pathname}`;
	if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
		return hostPath.slice(0, -1);
	}
	return hostPath;
}

export { crawlPage, getURLsFromHTML, normalizeURL };
