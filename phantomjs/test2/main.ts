import * as Phantom from './phantom-ts-async';

async function main(): Promise<void> {
	var phantom = await Phantom.create();
	var page = await phantom.createPage();
	var status = await page.open('http://www.google.com');
	console.log('status: ', status);
	var result = await page.evaluate<string>(function () { return document.title; });
	console.log('page title: ', result);
	phantom.exit();
}

main();