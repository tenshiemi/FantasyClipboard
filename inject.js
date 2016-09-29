var injected = injected || (function() {

    var methods = {};

    methods.getTeam = function() {
        var nodes = document.querySelectorAll('.editable:not(.empty-bench)');
        var players = [];
        // Loop through all the nodes
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];

            var player = {};

            var nameNode = node.getElementsByClassName('Nowrap name')[0];
            var positionNode = node.getElementsByClassName('Fz-xxs')[0];
            var gameInfo = node.querySelectorAll('.ysf-game-status > a');

            player = {
                name: nameNode.textContent,
                position: positionNode.textContent,
                opponent: gameInfo.length === 0 ? 'Bye' : gameInfo[1].textContent,
            };
            players.push(player);
        }
        return players;
    };

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        var data = {};
        if (methods.hasOwnProperty(request.method)) {
            data = methods[request.method]();
        }
        sendResponse({ data: data });
        return true;
    });

    return true;
})();
