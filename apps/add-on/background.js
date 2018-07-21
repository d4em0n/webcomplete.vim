console.log("Webcomplete addons starting..");
var port = browser.runtime.connectNative("webcomplete");
console.log(port);

/*
Listen for messages from the app.
*/
port.onMessage.addListener((response) => {
  console.log("Received: " + response);
});

/*
On a click on the browser action, send the app a message.
*/

function onExecuted(result) {
  port.postMessage(result);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var cmd = "[...new Set(document.body.innerText.match(/\\w+/g))].sort().join('\\n');";

browser.tabs.onActivated.addListener((tabId, changeInfo, tabInfo) => {
  console.log("Sending data to apps");
  var executing = browser.tabs.executeScript({
    code: cmd
  });

  executing.then(onExecuted, onError);
});
