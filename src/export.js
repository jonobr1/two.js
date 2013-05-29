
//exports to multiple environments
if (typeof define === 'function' && define.amd)
	//AMD
	define(function(){ return Two; });
else if (typeof module != "undefined" && module.exports)
	//Node
	module.exports = Two;

