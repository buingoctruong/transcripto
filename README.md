# Transcripto

## 🌱 Intiative

This initiative was born from a personal challenge I faced while preparing for presentations and interviews. As a non-native speaker, I often need extensive practice, but after speaking in front of a camera, I had no reliable way to review or improve what I had just said.

To solve this, I created a Chrome extension that:

1. Records and converts your speech into text.
2. Enables you to copy the text into AI tools (e.g., ChatGPT, Gemini) to get immediate feedback on how to optimize your vocabulary, flow, and tone for any scenario.

## 🌐 Extension

Find and add the **_Transcripto_** Extension to your Chrome [here](https://chromewebstore.google.com/detail/transcripto/dlafapkfpflnbfpnadkbjlakmgegkcff?authuser=0&hl=en)

🚀 Features

- Usage Tracking & Visualization: Monitor time spent on each website with real-time data displayed in interactive charts and detailed lists.
- Custom Domain Time Limits: Set specific time limits for chosen domains. When your usage exceeds these limits, you receive a clear notification alert.
- Flexible Configuration: Easily add, update, or remove target domains and limits.
- Daily Auto-Reset – Browsing usage data automatically resets at midnight every day, ensuring a fresh start for tracking.

---

## 📥 Local Installation

1. Clone or download this repository:
   ```bash
   git clone git@github.com:buingoctruong/transcripto.git
   cd transcripto
   ```
2. Open chrome://extensions/ in Google Chrome.
3. Enable Developer mode in the top-right corner.
4. Click `Load unpacked` and select the `transcripto` folder.
5. The extension will appear in your toolbar with its icon.

## ⚙️ Troubleshooting

If you encounter the error `Microphone access denied`, it means Chrome is blocking access to your microphone until you grant permission. This is a built-in security measure to protect sensitive hardware.

How to fix it:

1. Open Chrome extensions page by typing `chrome://extensions` in the address bar.
2. Find your `Transcripto` extension in the list.
3. Click the Details button for your extension.
4. On the details page, scroll down until you see a section for `Site access` Click on the link that says Site settings.
5. In the site settings for the extension, find the Microphone row. It will likely show a setting of `Ask` or `Block` Change this setting to `Allow`.
