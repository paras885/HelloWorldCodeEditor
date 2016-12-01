module.exports = {
	file_format : function(language) {
		return (language == "default(C++)" ? ".cpp" : (language == "C" ? ".c" : (language == 'Python' ? ".py" : (language == "Java" ? '.java' : ".rb"))));
	}
};
