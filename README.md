backtracker
===========

Tracks clicking back on a page.

How do I get it?
----------------

backtracker will soon be available through Bower

What is it?
-----------

backtracker is a small library for reliably capturing the back button being clicked on a page.

How do I use it?
----------------

Using backtracker is simple. All you need to do is add a script tag on your page serving backtracker.js, and add another tag defining the `window.onback` function.

```.html
<script>
    window.onback = function (backclicks, cb) {
        console.log("Clicked back: " + backclicks + " times.");
        cb(); // Make sure to call the callback, or you will stay on the current page.
        
        // Because a callback is passed asynchronous
        // functions can also be called, such as
        // $.ajax, or setTimeout
        // setTimeout(cb, 200);
    };
</script>
<script src="/path/to/backtracker.js"></script>

```

Why was it made?
----------------

Figuring out if someone clicks back off your page is a tricky problem, but it can have large implications for SEO and can be a good measurement of user experience. Google Analytics does track bounce and exit rate, but this only tells you so much. backtracker can tell you more. It can tell you how far deep a user went before clicking back off the page (including visiting other domains)
