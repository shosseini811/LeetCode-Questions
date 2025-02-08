// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'CLAUDE_API_REQUEST') {
    // Get API key from storage
    chrome.storage.sync.get(['claudeApiKey'], async (result) => {
      if (!result.claudeApiKey) {
        sendResponse({ 
          success: false, 
          error: 'Please set your Claude API key in the extension popup' 
        });
        return;
      }

      try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'x-api-key': result.claudeApiKey,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'anthropic-dangerous-direct-browser-access': 'true'
          },
          body: JSON.stringify({
            model: 'claude-3-5-sonnet-20241022',
            max_tokens: 1024,
            messages: [{
              role: 'user',
              content: request.prompt
            }]
          })
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error?.message || 'Failed to get response from Claude');
        }

        sendResponse({ success: true, data });
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
    });

    return true; // Will respond asynchronously
  }
});
