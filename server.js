global.ROOT_DIRNAME = __dirname;

express = require('express');
app = express();
fs = require('fs');
ch_pr = require('child_process');
code_execution_api = require(__dirname + '/controllers/code_execution_api/execute_code.js')

var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', function(req, res){
	res.sendFile(ROOT_DIRNAME + '/views/CodeEditor/editor.html');
});


app.post('/execute', urlencodedParser, function(req, res){
	
	code_execution_api.execute(req.body.code, req.body.input, req.body.language, return_output);
	function return_output(output){
		console.log('output: ' + output)
		res.write(output);
		res.end();
	}

});

var server = app.listen(process.env.PORT || 5000, function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log('Listening on http://%s:%s', host, port);
});
