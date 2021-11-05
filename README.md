# CS321-Leetcode-Gext
creating the google extension portion of the leetcode project

10/15/2021:

- extension contains the code to grab a URL from a given tab
- This event occurs on install so it currently only pulls the chrome extensions URL
- Next steps would be to add an actionListener

10/29/2021:

- extension is uploaded to Github
- URl grabber code is moved into a possible implementation of an event listener for tab change
- permissions for tabs has been added
- this version is non-functional but can become functional in a few days with proper research and implementation
- After the action listener the remaining code needed would be to create the timestamp events
- Also to relay URL and timestamp events to backend for processing and storage

11/04/2021:

- popup for the extension was added 
- content script for the extension can now read problem details of the problem the user is on
- Next steps would be to adjust the timer so it accurately reflects the time the user spends on a problem.

11/05/2021:

- updated popup to be more intuitive
