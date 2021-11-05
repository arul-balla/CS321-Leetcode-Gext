let viewBtn = document.getElementById('viewBtn');

let pID = document.getElementById('pID');
let pName = document.getElementById('pName');
let pTopics = document.getElementById('pTopics');
let pTime = document.getElementById('pTime');
let pStatus = document.getElementById('pStatus');

let progressStatus = document.getElementById('progressStatus');
let progress = document.getElementById('progress');

let logo = document.getElementById('logo');
let saveButton = document.getElementById('saveButton');
let saveBtnSection = document.getElementById('saveBtnSection');
let saveStatus = document.getElementById('saveStatus');

let viewDiv = document.getElementById('viewDiv');
let saveDiv = document.getElementById('saveDiv');

var details = [];

/* View button click listener.
 *    Displays the problem content and user performance in the popup
 *    Obtain the problem details */
viewBtn.onclick = function() {
    
  // Access the content script and the user's performance on the problem
  //    response represents the problem details sent from the content script
  //    time represents the time spent on the problem
  //    status represents whether or not the user completed the problem
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {

    // Obtain the time spent on the problem
    //    Total time spent is the current time - start time (when tab was activated)
    chrome.storage.sync.get(['timerStart'], function(result) {
      let timeDiff = (Date.now() - result.timerStart);
      let min = Math.round(timeDiff/60000);
      pTime.textContent = "Time Spent (minutes): " + min;
    });

    // Obtain the user's completion status towards a problem
    //    If true, the user has completed the problem. Else, the user has not.
    let status = progressStatus.checked;
    pStatus.textContent = status ? "Status: Complete" : "Status: Incomplete";

    // Obtain the problem details from the content script
    //    id represents the problem id
    //    name represents the problem name
    //    topics represents the list of related topics
    //    url represents the url of the problem
    chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
      if (response){

        viewDiv.style = "display: none;";
        saveDiv.style = "display: block;";

        pID.textContent = "Problem ID: " + response.id;
        pName.textContent = "Problem Name: " + response.name;
        pTopics.textContent = "Problem Topics: " + response.topics;
        pTopics.textContent = pTopics.textContent.replaceAll(",", ", ");

        getData(response, status);
      }
      else{
        alert('Error retrieving your progress--Make sure you are on a leetcode problem (leetcode.com/problems/...) \n\nRefresh the page and try again if the issue persists');
      }
    })
  });
}

/* Save button click listener.
 *    Indicates that data has been saved 
 *    Sends the data off to be associated with the user */
saveButton.onclick = function() {

  logo.src = "/icon/checkmark16.png";
  saveStatus.textContent = "Saved!  ";
  progress.style = "display: none;";
  progressStatus.style = "display: none;";
  saveBtnSection.style = "display: none;";
  sendData();
}

/* Obtains the user's progress on the problem. */
function getData(response, isComplete){
  var data = {
    id: response.id,
    name: response.name,
    topics: response.topics,
    url: response.url,
    time: parseInt(pTime.textContent.substr(22, pTime.textContent.length)),
    status: isComplete,
  };
  details = data;
}

// TODO: Send data off after save button has been clicked
function sendData(){
  console.log('Problem Details', details);
}
