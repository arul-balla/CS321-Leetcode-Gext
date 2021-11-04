let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

let username = document.getElementById('username');
let password = document.getElementById('password');

let pID = document.getElementById('pID');
let pName = document.getElementById('pName');
let pTopics = document.getElementById('pTopics');
let pTime = document.getElementById('pTime');
let pStatus = document.getElementById('pStatus');

let saveButton = document.getElementById('saveButton');
let logo = document.getElementById('logo');
let saveStatus = document.getElementById('saveStatus');

let loginDiv = document.getElementById('loginDiv');
let detailsDiv = document.getElementById('detailsDiv');

/* Save button click listener.
 *    Validates user login info
 *    Displays the problem content and user performance in the popup
 *    Sends the data off to be associated with the user */
saveButton.onclick = function() {
  
  // If the login credentials are valid, extract the problem details
  if(checkLogin(username.value, password.value)){
    
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

          loginDiv.style = "display: none;";
          detailsDiv.style = "display: block;";

          pID.textContent = "Problem ID: " + response.id;
          pName.textContent = "Problem Name: " + response.name;
          pTopics.textContent = "Problem Topics: " + response.topics;
          pTopics.textContent = pTopics.textContent.replace(",", ", ");

          logo.src = "/icon/checkmark16.png";
          saveStatus.textContent = "Saved!  ";
          getData(response, status);
        }
        else{
          alert('Error retrieving problem details--Make sure you are on a leetcode problem (leetcode.com/problems/...) \n\nRefresh the page and try again if the issue persists');
        }
      })
    });

  }
  // Else if the login credentials are not valid, inform the user
  else{
    alert('Invalid credentials. Double check username and password combination');
  }
}

// TODO: Checks if user info is valid
function checkLogin(username, password) {
  if(username === 'abc123' && password === '0000')
    return true;
  else if(username === 'a') //solely for quicker debugging purposes
    return true;

  return false;
}

// TODO: Send data off
function getData(response, isComplete){
  var data = {
    id: response.id,
    name: response.name,
    topics: response.topics,
    url: response.url,
    time: parseInt(pTime.textContent.substr(22, pTime.textContent.length)),
    status: isComplete,
  };
  console.log('Problem Details', data);
}
