// This helps avoid conflicts in case we inject 
// this script on the same page multiple times
// without reloading.
var injected = injected || (function(){

  // An object that will contain the "methods"
  // we can use from our event script.
  var methods = {};

  methods.getTeam = function(){
    var nodes = document.getElementsByClassName('editable');
    var players = []
      // Loop through all the nodes
  for (var i = 0; i < nodes.length; i++) {
    // The current node
    var node = nodes[i];
    // The area in pixels occupied by the element
    if (node.getElementsByClassName('Nowrap name')[0] != undefined) {
      var n = node.getElementsByClassName('Nowrap name')[0].textContent;
      var p = node.getElementsByClassName('pos-label')[0].textContent;
      var o = node.getElementsByClassName('Inline')[0].textContent;
      var player = { name: n, position: p, opponent: o };
      players.push(player)
    }
  }
    return players;
  };

  // This tells the script to listen for
  // messages from our extension.
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    var data = {};
    // If the method the extension has requested
    // exists, call it and assign its response
    // to data.
    if (methods.hasOwnProperty(request.method))
      data = methods[request.method]();
    // Send the response back to our extension.
    sendResponse({ data: data });
    return true;
  });

  return true;
})();