chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'searchHistory') {
      const { query } = message;
      chrome.history.search(
        { text: query, maxResults: 1000 },
        (results) => {
          // Sort results antichronologically
          const sortedResults = results.sort((a, b) => b.lastVisitTime - a.lastVisitTime);
          sendResponse(sortedResults);
        }
      );
      return true; // Indicates async response
    }
  });
  