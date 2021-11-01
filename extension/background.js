let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  //chrome.storage.sync.set({ color });
  //console.log('Default background color set to %cgreen', `color: ${color}`);
  
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab){ 
    if (tab.url.startsWith('https://leetcode.com/')) {
      //TODO: Add webscraping here
      console.log("You're on Leetcode!");
      chrome.scripting.executeScript({
        target: {tabId: activeInfo.tabId, allFrames: true},
        files: ['leetcode-content-script.js'],
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
