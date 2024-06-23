function printReport(pages) {
    console.log("===============");
    console.log("REPORT");
    console.log("===============");
    let sortedPages = sortPages(pages);
    for (let sortedPage of sortedPages) {
        let url = sortedPage[0];
        let hits = sortedPage[1];
        console.log(`Found ${hits} links to page: ${url}`);
    }
    console.log("===============");
    console.log("END REPORT");
    console.log("===============");
}

function sortPages(pages) {
    let pagesArr = Object.entries(pages);
    pagesArr.sort((pageA, pageB) => {
        if (pageB[1] === pageA[1]) {
          return pageA[0].localeCompare(pageB[0])
        }
        return pageB[1] - pageA[1]
    })
    return pagesArr
}

export { printReport, sortPages }