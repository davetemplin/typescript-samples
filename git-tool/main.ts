var Git = require('nodegit');
var url = 'https://github.com/davetemplin/mongodb-async-wrapper.git';
var name = url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
(async function () {
    try {
        var repo = await Git.Clone(url, name);
        console.log('done');
        process.exit();
    }
    catch (err) {
        console.error(err);
    }
})();