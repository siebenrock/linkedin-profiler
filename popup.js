var tab_title = '';

function receiveResults (results){
  person = results[0]

  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs){
    if (!tabs[0].url.includes("linkedin.com/in/")) {
      document.getElementById("main").style.display = "none";
      document.querySelector("#status-text").innerHTML = "Visit a LinkedIn profile<br>Press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> to activate";
    }
   }
  );

  const replaceWords = ["\n", "\t", "Title", "Titel", "Company Name", "Name des Unternehmens", "Internship", "Praktikum", "Part-time", "Teilzeit", "Full-time", "Vollzeit", "https://www."];

  Object.keys(person).forEach(function(key) {
    replaceWords.forEach((word) => {
      person[key] = person[key].replaceAll(word, "");
    });
    person[key] = person[key].trim();

    document.querySelector("#" + key).textContent = person[key]
  });

  clipboardText = person.company + "\t" + person.name + "\t" + person.title + "\t" + person.url;

  navigator.clipboard.writeText(clipboardText).then(() => {
      document.querySelector("#status-text").textContent = "Copied to clipboard!";
    }, () => {
      document.querySelector("#status-text").textContent = "Failed copy to clipboard!";
    });
}
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var tab = tabs[0];
  tab_title = tab.title;
  chrome.tabs.executeScript(tab.id, {
    file: "content-script.js"
  }, receiveResults);
});