var injected = injected || (function() {

    var methods = {};

    methods.getTeam = function() {
        var nodes = document.getElementsByClassName('editable');
        var players = [];
        // Loop through all the nodes
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];

            // Grabs player info from each node
            if (node.getElementsByClassName('Nowrap name')[0] !== undefined) {
                var player;
                var n = node.getElementsByClassName('Nowrap name')[0].textContent;
                var p = node.getElementsByClassName('Fz-xxs')[0].textContent;
                var o = '';
                var matchup = node.getElementsByClassName('F-reset')[0];

                if (matchup && matchup.textContent == ' Bye'){
                    o = 'Bye';
                } else {
                    o = matchup.textContent;
                }

                player = { name: n, position: p, opponent: o };
                players.push(player);
            }
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
