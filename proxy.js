const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 8010;

const apiServer = http.createServer( (req, res) => {
	const url = 'http://www.weather.com.cn/data/city3jdata' + req.url;
	const options = {
		url: url
	};
	function callback(error, response, body){
		if (!error && response.statusCode === 200) {
			console.log('Querying from ' + url);
			res.setHeader('Content-Type', 'text/plain;charset=UTF-8');
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.end(body);
		}
	}
	request.get(options, callback);
});
apiServer.listen(port, hostname, () => {
	console.log(`接口代理运行在http://${hostname}:${port}/`);
});