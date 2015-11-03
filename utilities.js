var http = require('http');
var qs = require('querystring');
var fs = require('fs');

var generateGuid = function(){
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
};


var checkResult = function(guid,algorithm,result){
	
	console.log("check function");
	
	var options = {
		host: 'internal-devchallenge-2-dev.apphb.com',
		path: '/encoded/'+ guid + '/' + algorithm,
		headers: { "Content-Type": "application/json",
					"Accept": "application/json" }
	};
		
	var req = http.get(options, function(response) {
		// handle the response
		var res_data = '';
		
		response.on('data', function(chunk) {
			
			console.log("on data: " + res_data);
			
			res_data += chunk;
		});
		
		response.on('end', function() {
					
			console.log("check result: " + res_data);
			
			var base64Response = JSON.parse(res_data)
					
			var base64Result = base64Response.encoded;
			
			if(base64Result != result ){
				console.log("Error Revisar: ");
			} else {
				console.log("OK : ");
			}
			
										
		});
			
	});
	
	req.on('error', function(e) {
		console.log("Got error: " + e.message);
	});


	
}

var postResult = function (guid,algorithm,result){

	var req_data = JSON.stringify({
		'encodedValue' : result,
		'emailAddress': 'reniery@acklenavenue.com',
		'name': 'Reniery',
		'webhookUrl' : 'http://418a4bd4.ngrok.io/',
		'repoUrl' : 'EmptyForNow'
	});
	
	var options = {
		host: 'internal-devchallenge-2-dev.apphb.com',
		path: '/values/'+ guid + '/' + algorithm,
		method: 'POST',
		headers: { 'Content-Type': 'application/json' }
	};	
	
	var req = http.request(options, function(response) {
	
		var res_data = '';	
			
		response.on('data', function(chunk) {
			res_data += chunk;
		});
		response.on('end', function() {
			//callback(res_data);
			console.log('This is it');
			console.log("Success Indicator: " + res_data);
			
			//This is a test it works !!
			
			/*
			
			http.createServer(function(req, res) {
				
				res.writeHead(200, { 'Content-Type': 'text/html' });
    			var html = fs.readFileSync(__dirname + '/index.htm', 'utf8');
				var message = res_data;
				html = html.replace('{Message}', message);
				res.end(html);
				
			}).listen(1337, '127.0.0.1');
			
			*/			
			
		});
	});
	req.on('error', function(e) {
	console.log("Got error: " + e.message);
	});
	// write the data
	req.write(req_data);
	req.end();
}
module.exports.postResult = postResult;
module.exports.checkResult = checkResult;
module.exports.generateGuid = generateGuid;
