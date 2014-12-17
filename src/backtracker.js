(function (window, onback) {

    var setup = function () {
        // Must have HTML5 history API
        var history = window.history;
        if (!history) {
            return;
        }

        if (!history.state) {
            // Case 1: We came to the page for the first time

            var historyLength = history.length;

            // Set the current state to have the current length
            history.replaceState({
                direction: -1,
                historyLength: historyLength
            }, null, null);

            // Add a new state so we can intercept the back button
            history.pushState({
                direction: 1,
                historyLength: historyLength
            }, null, null);
        }

        var lastState = history.state;
        window.onpopstate = function (event) {
            if (history.state.direction &&
                history.state.direction !== lastState.direction &&
                history.state.direction === -1
                ) {
                var direction = history.state.direction;
                if (onback && typeof (onback) === "function") {
                    onback(history.length - history.state.historyLength, function () {
                        history.go(direction);
                    });
                } else {
                    history.go(direction);
                }
            }
            lastState = history.state;
        };

        if (lastState && lastState.direction === -1) {
            // Go forward
            history.forward();
        }
    };

    window.addEventListener("pageshow", function () {
        setup();
    });
})(window, window.onback);