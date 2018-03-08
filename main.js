chrome.browserAction.onClicked.addListener(function(tab) { 

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    
    var newUrl = "";
    if(url.includes("?")) {
      newUrl = url + "&xYextDebug=true";
    } else {
      newUrl = url + "?xYextDebug=true";
    }

    chrome.tabs.update({
     url: newUrl
    });
  });
});