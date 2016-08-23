import * as Phantom from './phantom-ts-async';

async function scan(url: string): Promise<void> {
	var phantom = await Phantom.create();
	var page = await phantom.createPage();
	page.set('userAgent', 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36');	
	var status = await page.open(url);
	
	var imagePath = __dirname + '/page.png';
	page.render(imagePath);
	console.log('status: ', status);
	await page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js');
	console.log('page title: ', await page.evaluate<string>(function () { return document.title; }));
	var result = await page.evaluate<string>(function () { return $('#unifiedLocationSelectedAddressText').text(); });
	console.log('jQuery: ', result);
	phantom.exit();
}

async function main() {
	await scan('http://www.amazon.com/Call-Duty-Black-Ops-Standard-PlayStation/dp/B00VU4J13W');
	//await scan('http://www.google.com');
}

main();