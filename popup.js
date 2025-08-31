// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Get references to our UI elements
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  const clearButton = document.getElementById("clearButton");
  const outputDiv = document.getElementById("output");
  const infoText = document.getElementById("info-text");

  // --- Web Speech API Setup ---
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!window.SpeechRecognition) {
    outputDiv.textContent =
      "Speech Recognition is not supported in this browser.";
    infoText.classList.add("hidden"); // Hide info text if API is not supported
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.continuous = true;

  // --- State Variables ---
  let finalTranscript = "";
  let timerId;
  const maxTimeInMinutes = 5;

  // --- Helper Functions for UI State Management ---
  function updateUI(isListening) {
    if (isListening) {
      startButton.classList.add("hidden");
      stopButton.classList.remove("hidden");
      outputDiv.classList.add("listening"); // Add the animation class
      infoText.textContent = "Listening...";
    } else {
      startButton.classList.remove("hidden");
      stopButton.classList.add("hidden");
      outputDiv.classList.remove("listening"); // Remove the animation class
      infoText.textContent = `Session limited to ${maxTimeInMinutes} minutes.`;
    }
  }

  // --- Event Handlers for Speech Recognition ---
  recognition.onresult = (event) => {
    let interimTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + " ";
      } else {
        interimTranscript += transcript;
      }
    }
    outputDiv.textContent = finalTranscript + interimTranscript;
  };

  recognition.onend = () => {
    console.log("Speech recognition service ended.");
    updateUI(false);
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error: ", event.error);
    if (event.error === "no-speech") {
      outputDiv.textContent = "No speech detected. Please try again.";
    } else if (event.error === "not-allowed") {
      outputDiv.textContent =
        "Microphone access denied. Please enable it in your browser settings.";
    }
    updateUI(false);
  };

  // --- Button Event Listeners ---
  startButton.addEventListener("click", () => {
    finalTranscript = "";
    outputDiv.textContent = "Listening...";
    try {
      recognition.start();
      updateUI(true);

      const maxTimeMilliseconds = maxTimeInMinutes * 60 * 1000;
      timerId = setTimeout(() => {
        recognition.stop();
        outputDiv.textContent =
          finalTranscript +
          "\n\nRecording stopped: Maximum " +
          maxTimeInMinutes +
          "-minute limit reached.";
        console.log("Recording stopped automatically after 5 minutes.");
      }, maxTimeMilliseconds);
    } catch (e) {
      console.error("Error starting recognition:", e);
      outputDiv.textContent =
        "An error occurred. Please try reloading the extension.";
      updateUI(false);
    }
  });

  stopButton.addEventListener("click", () => {
    recognition.stop();
    outputDiv.textContent = finalTranscript;
    updateUI(false);
  });

  clearButton.addEventListener("click", () => {
    if (recognition.running) {
      recognition.stop();
    }
    finalTranscript = "";
    outputDiv.textContent = "Your transcription will appear here.";
    updateUI(false);
  });
});
