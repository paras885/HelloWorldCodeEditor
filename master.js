const fs = require('fs');
const ch_pr = require('child_process');

var execute_code = ch_pr.exec('sh execute_c_code.sh', function(error, stdout, stderr) {
	  if (error) {
         console.log(error.stack);
         console.log('Error code: '+error.code);
         console.log('Signal received: '+error.signal);
      }

      if(stderr) {
      	 console.log('stderr: ' + stderr);
      } else {
         console.log('stdout: ' + stdout);
  	  }
      
});

execute_code.on('exit', function(code) {
	console.log('Code executed and terminated with ' + code + ' code')
});
