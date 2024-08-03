# Web Crawler in JS

This is the [Boot.dev](https://www.boot.dev) JS project.

## Usage

- Make sure [nvm](https://github.com/nvm-sh/nvm) is installed
- Clone the repo and run `nvm install` and `npm install`
- Run `npm run start [website]` from the root of the project to start crawling

## Tests

Run `npm run test` from the root of the project

## Ideas for extending the project

- Rewrite in Go
- Make the script run on a timer and deploy it to a server. Have it email you every so often with a report
- Count external links, as well as internal links, and add them to the report
- Save the report as a CSV spreadsheet rather than printing it to the console
- Use a graphics library to create an image that shows the links between the pages as a graph visualization
- Make requests concurrently to speed up the crawling process
