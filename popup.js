// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  // Get references to our UI elements
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  const outputDiv = document.getElementById("output");

  // --- Web Speech API Setup ---
  // The Web Speech API is experimental and might need a vendor prefix
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // Check if the API is supported by the user's browser
  if (!window.SpeechRecognition) {
    outputDiv.textContent =
      "Speech Recognition is not supported in this browser.";
    return;
  }

  // Create a new SpeechRecognition instance
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US"; // Set the language for transcription
  recognition.interimResults = true; // Get real-time, non-final results
  recognition.continuous = true; // Keep listening after a pause

  // --- State Variables ---
  let finalTranscript = ""; // Stores the final, confirmed transcription
  let timerId; // Holds the ID for our 5-minute timer
  const maxTimeInMinutes = 5;

  // --- Event Handlers for Speech Recognition ---

  // Called whenever new transcription results are available
  recognition.onresult = (event) => {
    let interimTranscript = "";
    // Iterate through all the results from the event
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        // If the result is final, append it to our final transcript
        finalTranscript += transcript + " "; // Add a space for readability
      } else {
        // If it's an interim result, store it temporarily
        interimTranscript += transcript;
      }
    }
    // Update the UI with both the final and current interim text
    outputDiv.textContent = finalTranscript + interimTranscript;
  };

  // Called when the recognition service disconnects
  recognition.onend = () => {
    console.log("Speech recognition service ended.");
    // Ensure button states are correct after stopping
    startButton.style.display = "block";
    stopButton.style.display = "none";
    // Clear the timer if it's still running
    if (timerId) {
      clearTimeout(timerId);
    }
  };

  // Called when an error occurs
  recognition.onerror = (event) => {
    console.error("Speech recognition error: ", event.error);
    if (event.error === "no-speech") {
      outputDiv.textContent = "No speech detected. Please try again.";
    } else if (event.error === "not-allowed") {
      outputDiv.textContent =
        "Microphone access denied. Please enable it in your browser settings.";
    }
    // Ensure button states are correct after an error
    startButton.style.display = "block";
    stopButton.style.display = "none";
  };

  // --- Button Event Listeners ---

  // Start button click handler
  startButton.addEventListener("click", () => {
    finalTranscript = "";
    outputDiv.textContent = "Listening...";
    try {
      // Start the recognition service
      recognition.start();
      startButton.style.display = "none";
      stopButton.style.display = "block";

      // Set a timer to automatically stop the recording after 5 minutes
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
    }
  });

  // Stop button click handler (manual stop)
  stopButton.addEventListener("click", () => {
    // Stop the recognition service
    recognition.stop();
    // Clear the timer since the user manually stopped
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    outputDiv.textContent = finalTranscript;
    startButton.style.display = "block";
    stopButton.style.display = "none";
  });
});
