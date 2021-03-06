(function (window) {
    // Must have HTML5 history API
    var history = window.history;
    if (!history) {
        return;
    }

    var setup = function () {
        if (!history.state) {
            // Case 1: We came to the page for the first time

            var length = history.length;

            // Set the current state to have the current length
            history.replaceState({
                direction: -1,
                length: length
            }, null, null);

            // Add a new state so we can intercept the back button
            history.pushState({
                direction: 1
            }, null, null);
        }

        var lastState = history.state;
        window.onpopstate = function (event) {
            var state = history.state;
            var direction = state ? state.direction : 0;
            if (direction === -1 &&
                direction !== lastState.direction) {
                var onback = window.onback;
                if (onback && typeof (onback) === "function") {
                    var cb = function () {
                        history.go(direction);
                    };
                    onback(history.length - state.length, cb);

                    // If the onback function didn't take a cb parameter we
                    // assume it is synchronous, and call the cb ourselves
                    if (onback.length < 2) {
                        cb();
                    }
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

    if (window.addEventListener) {
        window.addEventListener("pageshow", setup);
    }

})(window);