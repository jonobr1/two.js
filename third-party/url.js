(function(url) {
    
  var result = {},
      hashLoc = url.indexOf('#');

  url.substring(url.indexOf('?')).replace(
    /([^?=&]+)(=([^&]+))?/g,
    function($0, $1, $2, $3) {
      result[$1] = $3;
    }
  );

  result['boolean'] = function(name, defaultValue) {
    if (!result.hasOwnProperty(name))
      return defaultValue;
    return result[name] !== 'false';
  };

  result['float'] = function(name, defaultValue) {
    var r = parseFloat(result[name]);
    if (r != r) 
      return defaultValue;
    return r;
  };

  result['int'] = function(name, defaultValue) {
    var r = parseInt(result[name], 10);
    if (r != r) 
      return defaultValue;
    return r;
  };

  result['hash'] = hashLoc == -1 ? undefined : url.substring(hashLoc+1);

  result['setUrl'] = arguments.callee; 

  window['url'] = result;

})(location.href);