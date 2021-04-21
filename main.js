(function () {
  function getHistory() {
    return document.getElementById("history-value").innerText;
  }

  function printHistory(num) {
    document.getElementById("history-value").innerText = num;
  }

  function getOutput() {
    return document.getElementById("output-value").innerText;
  }

  function printOutput(num) {
    if (num == "") {
      document.getElementById("output-value").innerText = num;
    } else {
      document.getElementById("output-value").innerText = getFormattedNumber(
        num
      );
    }
  }

  function getFormattedNumber(num) {
    if (num == "-") {
      return "";
    } else {
      var n = Number(num).toLocaleString("en");
      return n;
    }
  }

  function getReversedFormat(num) {
    return Number(num.replace(/,/g, ""));
  }

  var operator = document.getElementsByClassName("operator");
  for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function () {
      if (this.id == "clear") {
        printHistory("");
        printOutput("");
      } else if (this.id == "backspace") {
        var output = getReversedFormat(getOutput()).toString();
        if (output) {
          output = output.substr(0, output.length - 1);
          printOutput(output);
        } // this means if output is possible then the condition
      } else {
        var output = getOutput();
        var history = getHistory();
        if (output == "" && history !== "") {
          if (isNaN(history[history.length - 1])) {
            history = history.substr(0, history.length - 1);
          }
        }
        if (output != "" || history != "") {
          // use teranary operator
          output = output == "" ? output : getReversedFormat(output);
          history = history + output;
          if (this.id == "=") {
            var result = eval(history);
            printHistory("");
            printOutput(result);
          } else {
            history = history + this.id;
            printHistory(history);
            printOutput("");
          }
        }
      }
    });
  }

  var number = document.getElementsByClassName("number");
  for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function () {
      var output = getReversedFormat(getOutput());
      if (output != NaN) {
        output = output + this.id;
        printOutput(output);
      }
    });
  }

  let deferredPrompt;
  const addBtn = document.querySelector(".add-button");
  addBtn.style.display = "none";

  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = "block";

    addBtn.addEventListener("click", () => {
      // hide our user interface that shows our A2HS button
      addBtn.style.display = "none";
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });
  });
})();
