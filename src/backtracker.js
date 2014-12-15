(function () {
    // Must have HTML5 history API
    var history = window.history;
    if (!history) {
        return;
    }

    // Set the state to have the length plus one
    history.replaceState({historyLength: history.length + 1}, null, null);

    // Add a new state so we can intercept the back button
    history.pushState(null, null, null);

    window.onpopstate = function (event) {
        if (history.state) {
            console.log(history.length, history.state.historyLength);
            history.back();
        }
    };
})();