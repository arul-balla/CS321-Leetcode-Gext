/* Sets the start of the timer as the current time */
chrome.storage.sync.set({'timerStart': Date.now()}, function() {
    console.log('start of timer: ' + Date.now())
});
