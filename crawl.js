import { JSDOM } from 'jsdom';

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

export { normalizeURL, getURLsFromHTML };
