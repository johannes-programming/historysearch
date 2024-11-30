document.getElementById('search').addEventListener('input', function () {
    const query = this.value;
  
    if (query.trim()) {
      chrome.runtime.sendMessage(
        { type: 'searchHistory', query },
        (results) => {
          const resultsContainer = document.getElementById('results');
          resultsContainer.innerHTML = '';
  
          results.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.className = 'result';
            resultDiv.innerHTML = `
              <a href="${result.url}" target="_blank">${result.title || result.url}</a>
              <div><small>${new Date(result.lastVisitTime).toLocaleString()}</small></div>
            `;
            resultsContainer.appendChild(resultDiv);
          });
        }
      );
    }
  });
  