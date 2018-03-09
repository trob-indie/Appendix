chrome.browserAction.onClicked.addListener(function(tab) {

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var queryParams = [];
    if(url.indexOf("?") > -1) {
      queryParams = url.substring(url.indexOf("?"), url.length).replace("?", "").split("&");
    }


    if(!queryParams.includes("xYextDebug=true")) {
      queryParams.push("xYextDebug=true");
    } else {
      var paramIndex = queryParams.indexOf("xYextDebug=true");
      queryParams.splice(paramIndex, 1);
    }

    newUrl = "";
    if(url.indexOf("?") > -1) {
      newUrl = url.substring(0, url.indexOf("?"));
    } else {
      newUrl = url;
    }

    for(var i = 0; i < queryParams.length; i++) {
      if (i == 0) {
        newUrl = newUrl + "?" + queryParams[i];
      } else {
        newUrl = newUrl + "&" + queryParams[i];
      }
    }

    chrome.tabs.update({
     url: newUrl
    });
  });
});
