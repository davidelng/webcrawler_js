import { JSDOM } from 'jsdom';

async function crawlPage(currentURL) {
	console.log(`Actively crawling: ${currentURL}`);
	let res = null;
	try {
		res = await fetch(currentURL);
		if (res.status >= 400) {
			console.log(`Got HTTP error on ${currentURL}, code: ${res.status}`);
			return;
		}
		let contentType = res.headers.get('content-type');
		if (!contentType || !contentType.includes('text/html')) {
			console.log(`Non HTML response, content-type ${contentType}, on page ${currentURL}`);
			return;
		}
		res = await res.text();
		console.log(res);
	} catch (err) {
		console.error(`Error in fetch: ${err.message}, on page: ${currentURL}`);
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
