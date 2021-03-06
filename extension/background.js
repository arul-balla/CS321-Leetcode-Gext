chrome.runtime.onInstalled.addListener(() => {
  //chrome.storage.sync.set({ color });
  //console.log('Default background color set to %cgreen', `color: ${color}`);
  
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab){ 
    if (tab.url.startsWith('https://leetcode.com/problems/')) {
      chrome.storage.sync.set({'timerStart': Date.now()}, function() {
        console.log('tab was switched to LC, timer start: ' + Date.now())
      });
      //console.log(token);
    }
    else if (tab.url.startsWith('https://leetcode.com/')) {
      console.log('user is on LeetCode')
    }
    //TODO: CHANGE TAB URL TO actual domain of website
    else if (tab.url === 'http://localhost:3000/'){
      chrome.scripting.executeScript({
        target: {tabId: activeInfo.tabId, allFrames: true},
        files: ['website-script.js'],
      });
    }
    else{
      chrome.scripting.executeScript({
        target: {tabId: activeInfo.tabId, allFrames: true},
        files: ['notLC.js'],
      });
    }
  }); 
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  
  if (changeInfo.url && tab.url.startsWith('https://leetcode.com/problems/')) {
    // Sets the start of the timer as the current time
    chrome.storage.sync.set({'timerStart': Date.now()}, function() {
      console.log('url was switched to LC, timer start: ' + Date.now())
    });
  }
});
