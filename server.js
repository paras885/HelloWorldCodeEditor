express = require('express');
app = express();
fs = require('fs');
ch_pr = require('child_process');
helpers_for_files = require(__dirname + '/helpers/files_.js')

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res){
	res.sendFile(__dirname + '/editor.html');
});


app.post('/execute', urlencodedParser, function(req, res){
	console.log(req.body.code);
	code = req.body.code.trim();
	input = req.body.input.trim();
	language = req.body.language.trim();

	console.log('code length' + code.length);
	
	if(code.length <= 0) {
		res.write('There is no code please write');
		res.end();
	} else {
		
			file_name_prefix = language == "Java" ? "/HelloWorld" : "/hello";
			file_name_suffix = helpers_for_files.file_format(language);
			file_name = file_name_prefix + file_name_suffix
			console.log(file_name);
			
			fs.writeFile(__dirname + file_name, code, function(err) {
		    	if(err) {
		        	return console.log(err);
		    	}

		    	console.log("The code was saved!");
			}); 


			fs.writeFile(__dirname + "/input.txt", input, function(err) {
		    	if(err) {
		        	return console.log(err);
		    	}

		    	console.log("The input was saved!");
			}); 

			var execute_code = ch_pr.exec('sh execute_c_code.sh ' + file_name_suffix + ' ' + (input.length > 0 ? 'y' : 'n'), function(error, stdout, stderr) {
			  if (error) {
		         console.log(error.stack);
		         console.log('Error code: '+error.code);
		         console.log('Signal received: '+error.signal);
		      }

		      if(stderr) {
		      	 console.log('stderr: ' + stderr);
		      	 res.write(stderr);
		      } else {
		         console.log('stdout: ' + stdout);
		         res.write(stdout);
			  }
	  			res.end();
      
			});

			execute_code.on('exit', function(code) {
				console.log('Code executed and terminated with ' + code + ' code');
				if(language == 'Java') {
					helpers_for_files.remove_file(__dirname + file_name_prefix + '.class');
				} else if(language == 'C' || language =="default(C++)") {
					helpers_for_files.remove_file(__dirname + '/a.out');
				}
				helpers_for_files.remove_file(__dirname + file_name);
				if(input.length > 0) {
					helpers_for_files.remove_file(__dirname + '/input.txt');
				}
			});
			
	}

});

var server = app.listen(process.env.PORT || 5000, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening on http://%s:%s', host, port);
});
