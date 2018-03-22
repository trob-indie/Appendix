chrome.browserAction.onClicked.addListener(function(tab) {
  var queryParam = '';
  chrome.storage.sync.get(null, function(data) {
    var keys = Object.keys(data);
    if (keys.length > 0) {
      for (var i = 0; i < keys.length; i++)
      {
        if(keys[i].includes("reactant"))
        {
          var reactantKey = keys[i];
          var index = parseInt(reactantKey.substring(reactantKey.length - 1, reactantKey.length));
          if(data['active'] == parseInt(index)) {
            var productKey = "product_" + index;
            queryParam = data[reactantKey] + '=' + data[productKey]
          }
        }
      }
    } else {
      queryParam = 'xYextDebug=true';
    }
  });

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    var url = tabs[0].url;
    var queryParams = [];
    if(url.indexOf("?") > -1) {
      queryParams = url.substring(url.indexOf("?"), url.length).replace("?", "").split("&");
    }

    if(!queryParams.includes(queryParam)) {
      queryParams.push(queryParam);
    } else {
      var paramIndex = queryParams.indexOf(queryParam);
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
