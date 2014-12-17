(function (window, onback, onforward) {

    var setup = function () {
        console.log("I ran at all");
        // Must have HTML5 history API
        var history = window.history;
        if (!history) {
            return;
        }

        if (!history.state) {
            // Case 1: We came to the page for the first time

            console.log("Setting up initial state");
            var historyLength = history.length;
            // Set the state to have the length plus one
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
        console.log("lastState: ", lastState);

        console.log("Set up state handling");
        window.onpopstate = function (event) {
            console.log("pop state: ", event);
            if (history.state.direction &&
                history.state.direction !== lastState.direction &&
                history.state.direction === -1
                ) {
                console.log("inside if");
                var direction = history.state.direction;
                var action = direction > 0 ? onforward : onback;
                if (action && typeof (action) === "function") {
                    action(history.length - history.state.historyLength, function () {
                        history.go(direction);
                    });
                } else {
                    history.go(history.state.direction);
                }
            }
            lastState = history.state;
        };

        if (lastState && lastState.direction === -1) {
            // Go forward
            console.log("Forwards to get to last one");
            history.forward();
        }
    };

    window.addEventListener("pageshow", function () {
        console.log("This happened");
        setup();
    });
})(window, window.onback, window.onforward);