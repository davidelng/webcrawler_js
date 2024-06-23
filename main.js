import { crawlPage } from './crawl.js';
import { printReport } from './report.js';

async function main() {
    if (process.argv.length < 3) {
        console.log('No Base URL provided');
        process.exit(1);
    } else if (process.argv.length > 3) {
        console.log('Too many args provided');
        process.exit(1);  
    }
    const baseURL = process.argv[2];
    console.log(`Starting crawl of ${baseURL}`);
    let pages = await crawlPage(baseURL);
    printReport(pages);
}

main();