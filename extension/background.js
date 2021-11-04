chrome.runtime.onInstalled.addListener(() => {
  //chrome.storage.sync.set({ color });
  //console.log('Default background color set to %cgreen', `color: ${color}`);
  
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab){ 
    if (tab.url.startsWith('https://leetcode.com/')) {
      chrome.scripting.executeScript({
          target: {tabId: activeInfo.tabId, allFrames: true},
          files: ['timer-script.js'],
      });
      //console.log(token);
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
      //Access and save token for adding and storing LC data
      chrome.storage.sync.get(['FBIdToken'], function(result) {
        console.log(result.FBIdToken);
      });
    }
  }); 
  
});
