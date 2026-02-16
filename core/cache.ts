export function getCached(videoId) {
    return new Promise(resolve => {
      chrome.storage.local.get([videoId], result => {
        resolve(result[videoId]);
      });
    });
  }
  
  export function setCached(videoId, data) {
    return new Promise(resolve => {
      chrome.storage.local.set({ [videoId]: data }, resolve);
    });
  }
  