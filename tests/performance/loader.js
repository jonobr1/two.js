(function () {
  // The driver exposes its trusted baseline file at a fixed local route.
  var script = document.createElement('script');
  if (new URLSearchParams(location.search).get('bundle') === 'baseline') {
    script.src = '/baseline.js';
  } else {
    script.src = '../../build/two.js';
  }
  script.onload = function () {
    var workloads = document.createElement('script');
    workloads.src = './workloads.js';
    document.body.appendChild(workloads);
  };
  document.body.appendChild(script);
})();
