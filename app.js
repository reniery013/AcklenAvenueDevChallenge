var secret = require('./secret.js');
var uti = require('./utilities.js');
var http = require('http');

//var  encryptedPhrase = secret(1,1,1);





for(var i = 0;i <20;i++){
	//test();
	
	setTimeout(test(), 350);
	
}

function test(){
	
	//console.time('100-elements');
	
	var guid = uti.generateGuid();
	var secretPhrase;
	var encryptedPhrase;
	
	//console.log(guid);
	
	var options = {
		host: 'internal-devchallenge-2-dev.apphb.com',
		path: '/values/'+guid,
		headers: { 'Content-Type': 'application/json',
					"Accept": "application/json" }
	};
		
	var req = http.get(options, function(response) {
		// handle the response
		var res_data = '';
		
		response.on('data', function(chunk) {
			res_data += chunk;
		});
		
		response.on('end', function() {
					
			secretPhrase = JSON.parse(res_data)
					
			var words = secretPhrase.words;
			var fibonnacci = secretPhrase.startingFibonacciNumber;
			var algorithm = (secretPhrase.algorithm);
			
			console.log("before secret words: " + words);
									
			encryptedPhrase = secret(words,fibonnacci,algorithm);
			
			console.log("words: " + words);
			console.log("Algorithm: " + algorithm);
			console.log("Base64: " + encryptedPhrase);
			
			// method to check my result, post does not work when this is call
			//uti.checkResult(guid,algorithm,encryptedPhrase);
			
			//console.timeEnd('100-elements');
						
			uti.postResult(guid,algorithm,encryptedPhrase);
																	
		});
			
	});
	
	req.on('error', function(e) {
		console.log("Got error: " + e.message);
	});
					
}


	


	




		
