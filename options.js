function restore_options() {
  chrome.storage.sync.get(null, function(data) {
    var keys = Object.keys(data);
    if (keys.length > 0) {
      for (var i = 0; i < keys.length; i++)
      {
        if(keys[i].includes("reactant"))
        {
          var reactantKey = keys[i];
          var index = parseInt(reactantKey.substring(reactantKey.length - 1, reactantKey.length));
          var productKey = "product_" + index;
          if(index > 0)
          {
            create_new_option(index);
          }

          document.getElementById(reactantKey).value = data[reactantKey];
          document.getElementById(productKey).value = data[productKey];
        }
      }

      var activeIndex = data['active'];
      if (activeIndex !== undefined) {
        document.getElementById('enable_' + activeIndex).checked = true;
      } else {
        document.getElementById('enable_0').checked = true;
      }
    } else {
      document.getElementById('reactant_0').value = "xYextDebug";
      document.getElementById('product_0').value = "true";
    }
  });
}

function save_options() {
  var data = {};
  var inputs = document.querySelectorAll('.queryParameters > input[type=text]');
  for (var i = 0; i < inputs.length; i += 2) {
    data["reactant_" + i/2] = inputs[i].value;
    data["product_" + i/2] = inputs[i+1].value;
  }

  var enablers = document.querySelectorAll('.queryParameters > input[type=checkbox]');
  var checkedCount = 0;
  var activeIndex = -1;
  for (var i = 0; i < enablers.length; i++) {
    if(enablers[i].checked) {
      var enablerId = enablers[i].getAttribute("id");
      activeIndex = parseInt(enablerId.substring(enablerId.length - 1, enablerId.length));
      checkedCount += 1;
    }
  }

  if(checkedCount == 1) {
    data['active'] = activeIndex;
    chrome.storage.sync.set(data, function() {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(function() {
        status.textContent = '';
      }, 750);
    });
  } else {
    var status = document.getElementById('status');
    status.textContent = 'One query parameter can be active at a time.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  }
}

function add_option() {
  var inputs = document.querySelectorAll('.queryParameters > input');
  var newIndex = inputs.length/2;
  create_new_option(newIndex);
}

function create_new_option(index)
{
  var activeCheckbox = document.createElement("input");
  activeCheckbox.setAttribute("type", "checkbox");
  activeCheckbox.setAttribute("id", "enable_" + index);
  var reactant = document.createElement("input");
  var newline = document.createElement("br");
  reactant.setAttribute("id", "reactant_" + index);
  reactant.setAttribute("type", "text");
  reactant.setAttribute("name", "reactant");
  var product = document.createElement("input");
  product.setAttribute("id", "product_" + index);
  reactant.setAttribute("type", "text");
  reactant.setAttribute("name", "product");
  var separator = document.createElement("span");
  separator.innerText = " = ";
  document.querySelector('.queryParameters').appendChild(activeCheckbox);
  document.querySelector('.queryParameters').appendChild(newline);
  document.querySelector('.queryParameters').appendChild(reactant);
  document.querySelector('.queryParameters').appendChild(separator);
  document.querySelector('.queryParameters').appendChild(product);
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
document.getElementById('add').addEventListener('click',
    add_option);
document.getElementById('flush').addEventListener('click', function() {
    chrome.storage.sync.clear();
});
