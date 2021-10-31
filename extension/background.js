let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  //chrome.storage.sync.set({ color });
  //console.log('Default background color set to %cgreen', `color: ${color}`);
  
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (tab.url.startsWith('https://leetcode.com/')) {
    //TODO: Add webscraping here
      console.info("LEETCODE reached!")
  }
});
