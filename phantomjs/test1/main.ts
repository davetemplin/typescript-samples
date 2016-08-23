import * as phantom from 'phantom';

phantom.create(ph => {
	ph.createPage(page => {
		page.open('http://www.amazon.com', status => {
			console.log("opened amazon? ", status);
			page.evaluate(
				function () { return document.title; }, 
				result => {
					console.log('Page title is ' + result);
					ph.exit();
				});			
		});
	});
});