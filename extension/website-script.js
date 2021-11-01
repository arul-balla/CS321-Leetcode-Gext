chrome.storage.sync.set({'FBIdToken': localStorage['FBIdToken'] }, function(){
    console.log("saved!")
})