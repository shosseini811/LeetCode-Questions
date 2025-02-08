document.addEventListener('DOMContentLoaded', function() {
  const apiKeyInput = document.getElementById('apiKey');
  const saveButton = document.getElementById('saveButton');
  const statusDiv = document.getElementById('status');

  // Load saved API key
  chrome.storage.sync.get(['claudeApiKey'], function(result) {
    if (result.claudeApiKey) {
      apiKeyInput.value = result.claudeApiKey;
    }
  });

  // Save API key
  saveButton.addEventListener('click', function() {
    const apiKey = apiKeyInput.value.trim();
    
    if (!apiKey) {
      statusDiv.textContent = 'Please enter an API key';
      return;
    }

    chrome.storage.sync.set({ claudeApiKey: apiKey }, function() {
      statusDiv.textContent = 'API key saved successfully!';
      setTimeout(() => {
        statusDiv.textContent = '';
      }, 2000);
    });
  });
});
