module.exports = {
	file_format : function(language) {
		return (language == "default(C++)" ? ".cpp" : (language == "C" ? ".c" : (language == 'Python' ? ".py" : (language == "Java" ? '.java' : ".rb"))));
	},

	remove_file : function(file_name) {
		ch_pr.exec('rm ' + file_name, function(error, stdout, stderr) {
			if (error) {
     			console.log(error.stack);
	            console.log('Error code: '+error.code);
	            console.log('Signal received: '+error.signal);
	        } else {
	        	console.log(file_name + ' removed Successfully');
	        }
		});
	}
};
