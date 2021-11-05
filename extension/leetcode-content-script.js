/* Sends problem details to the popup
 *    id represents the problem id
 *    name represents the problem name
 *    topics represents the list of related topics
 *    url represents the url of the problem */
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    var data = {
      id: getProblemID(),
      name: getProblemName(),
      topics: getRelatedTopics(),
      url: getUrl()
    };
    sendResponse(data);
    return true;
  }
);

/* Obtains the problem id */
function getProblemID(){
  var title = document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-1gd46d6-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-1eusa4c-TabContent.e5i1odf5 > div > div.css-101rr4k > div.css-v3d350").innerText;
  var problemID = title.substring(0, title.indexOf("."));
  return problemID;
}

/* Obtains the problem name */
function getProblemName(){
  var title = document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-1gd46d6-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-1eusa4c-TabContent.e5i1odf5 > div > div.css-101rr4k > div.css-v3d350").innerText;
  var len = title.length;
  var problemName = title.substring(title.indexOf(".")+2, len);
  return problemName;
}

/* Obtains the problem topics */
function getRelatedTopics(){
  var b = document.querySelector("#app > div > div.main__2_tD > div.content__3fR6 > div > div.side-tools-wrapper__1TS9 > div > div.css-1gd46d6-Container.e5i1odf0 > div.css-jtoecv > div > div.tab-pane__ncJk.css-1eusa4c-TabContent.e5i1odf5 > div > div:nth-child(6) > div.css-blecvm.e5i1odf0")
    b.click();
  var tags = document.querySelectorAll(".tag__24Rd");
  var topics = "";
  for(var i = 0; i < tags.length; i++){
    topics += tags[i].innerText;
  }
  
  var list = [];
  var str = "";
  for(var i = 0; i < topics.length; i++){
    if(i != 0 && topics.charAt(i) != '-' && topics.charAt(i-1) != '-' && topics.charAt(i) != ' ' && topics.charAt(i-1) != ' ' && topics.charAt(i) != '(' && topics.charAt(i-1) != '(' && topics.charAt(i) != ')' && topics.charAt(i) == topics.charAt(i).toUpperCase()){
      list.push(str);
      str = "";
      str +=  topics.charAt(i);
    }
    else{
      str += topics.charAt(i);
      if(i == topics.length-1)
        list.push(str);
    }
  }
  return list;
}

/* Obtains the problem url */
function getUrl() {
  var url = window.location.href;
  return url;
}
