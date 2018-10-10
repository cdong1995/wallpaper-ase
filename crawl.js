// Web scraping in Node
const rp = require('request-promise');
const cheerio = require('cheerio');

const keyword = 'dog'
const options = {
	url: 'https://unsplash.com/search/photos/' + keyword,
	json: true
}
let $
// get html -> get all image url -> select url with given resolution
rp(options)
	.then((data) => {
        let userData = [];
        $ = cheerio.load(data)
        $('.cV68d, .IEpfq').each(function() {
            let generalRrls = $(this).find('img').attr('srcset')
            generalRrls = generalRrls.split(',')
            let specificUrl = generalRrls[10]   // todo: choose resolution, now we get all the resolution pictures
            userData.push(specificUrl)
        })
        console.log(userData[0])
		process.stdout.write('loading');
	})
	.catch((err) => {
		console.log(err);
	});
