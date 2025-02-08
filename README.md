# LeetCode Solution Helper Chrome Extension

This Chrome extension helps you solve LeetCode problems by automatically fetching solution code using Claude's API.

## Features

- Automatically extracts problem information from LeetCode pages:
  - Problem description
  - Starter code
  - Difficulty level
- Sends the problem to Claude's API
- Returns clean, ready-to-use solution code in the console
- Securely stores your Claude API key

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Setup

1. Click the extension icon in Chrome's toolbar
2. Enter your Claude API key in the popup window
3. Click "Save API Key"

## Usage

1. Navigate to any LeetCode problem page
2. Open Chrome DevTools (F12 or right-click > Inspect)
3. Go to the Console tab
4. The extension will automatically fetch and display the solution code

## Notes

- You need a valid Claude API key to use this extension
- The extension only works on LeetCode problem pages
- Solutions are generated using Claude's API and may vary in approach
- Make sure to test the solution before submitting

## Privacy

Your Claude API key is stored securely in Chrome's storage sync and is only used for making API calls to Claude's service.
