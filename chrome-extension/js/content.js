console.log('LeetCode Helper Extension: Content script loaded');

// Wrap everything in an immediately invoked async function
(async function() {
  // Function to get problem info and send to Claude
  async function getProblemInfo() {
    console.log('Getting problem info...');
    
    // Get problem title
    const titleElement = document.querySelector('[data-cy="question-title"]');
    const title = titleElement ? titleElement.textContent.trim() : '';
    
    // Get difficulty
    const difficultyElement = document.querySelector('div[class*="text-difficulty-"]');
    const difficulty = difficultyElement ? difficultyElement.textContent.trim() : '';
    
    // Get description
    const descriptionElement = document.querySelector('div[data-track-load="description_content"]');
    let description = '';
    if (descriptionElement) {
      // Convert HTML content to plain text while preserving code blocks
      description = Array.from(descriptionElement.childNodes)
        .map(node => {
          if (node.nodeName === 'PRE') {
            return '```\n' + node.textContent + '\n```';
          } else if (node.nodeName === 'CODE') {
            return '`' + node.textContent + '`';
          } else {
            return node.textContent;
          }
        })
        .join('\n')
        .trim();
    }
    
    // Get code template
    const editorLines = document.querySelectorAll('.view-lines .view-line');
    const code = Array.from(editorLines)
      .map(line => line.textContent)
      .join('\n')
      .trim();
    
    const problemInfo = { title, difficulty, description, code };
    console.log('Problem Info:', problemInfo);
    
    try {
      const prompt = `Please provide ONLY the complete solution code for this LeetCode problem. No explanations needed.\n\nProblem:\n${description}\n\nStarter Code:\n${code}\n\nPlease respond with ONLY the complete solution code that can be directly copied and pasted.`;
      
      const response = await chrome.runtime.sendMessage({
        type: 'CLAUDE_API_REQUEST',
        prompt
      });

      if (!response.success) {
        throw new Error(response.error || 'Failed to get solution from Claude');
      }

      // Extract code from Claude's response
      console.log('Claude Response:', response);
      const solution = response.data.content[0].text;
      console.log('Solution Code:\n', solution);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Wait for page to load then get problem info
  setTimeout(getProblemInfo, 2000);
})();  // End of async wrapper function



