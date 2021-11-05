# CS321-Leetcode-Gext
creating the google extension portion of the leetcode project

10/15/2021:

- Extension contains the code to grab a URL from a given tab
- This event occurs on install so it currently only pulls the chrome extensions URL
- Next steps would be to add an actionListener

10/29/2021:

- Extension is uploaded to Github
- URl grabber code is moved into a possible implementation of an event listener for tab change
- Permissions for tabs has been added
- This version is non-functional but can become functional in a few days with proper research and implementation
- After the action listener the remaining code needed would be to create the timestamp events
- Also to relay URL and timestamp events to backend for processing and storage

11/04/2021:

- Popup for the extension was added 
- Content script for the extension can now read problem details of the problem the user is on
- Next steps would be to adjust the timer so it accurately reflects the time the user spends on a problem

11/05/2021:

- Updated popup to be more intuitive

11/06/2021:

- Updated timer to start when the user visits a leetcode problem
- Login component of the extension was removed; a unique token will be provided to each user instead
