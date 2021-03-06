helpers_for_files = require(global.ROOT_DIRNAME + '/helpers/files_.js');

module.exports = {
	execute: function(code, input, language, mycallbck) {
		console.log(code);
		code = code.trim();
		input = input.trim();
		language = language.trim();

		console.log('code length' + code.length);
		
		var output = '';
		if(code.length <= 0) {
			output = 'There is no code please write';
			mycallbck(output);
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

				console.log('bash ' + ROOT_DIRNAME + '/helpers/execute_c_code.sh ' + file_name_suffix + ' ' + (input.length > 0 ? 'y' : 'n') + ' ' + __dirname)

				var execute_code = ch_pr.exec('bash ' + ROOT_DIRNAME + '/helpers/execute_c_code.sh ' + file_name_suffix + ' ' + (input.length > 0 ? 'y' : 'n') + ' ' + __dirname, function(error, stdout, stderr) {
				  if (error) {
			         console.log(error.stack);
			         console.log('Error code: '+error.code);
			         console.log('Signal received: '+error.signal);
			      }

			      if(stderr) {
			      	 console.log('stderr: ' + stderr);
			      	 output = stderr;
			      } else {
			         console.log('stdout: ' + stdout);
			         output = stdout;
				  }

				  mycallbck(output);
	      
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
	}

}