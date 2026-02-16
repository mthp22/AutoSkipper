// background.js (Service Worker)

chrome.runtime.onInstalled.addListener(() => {
    console.log("YouTube FastTrack Extension Installed.");
  });
  
  // Listen for messages from content.js to process YouTube URL
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetchSongMetadata") {
      fetchSongMetadata(request.url)
        .then(metadata => {
          sendResponse(metadata);
        })
        .catch(error => {
          console.error('Error fetching song metadata:', error);
          sendResponse({ error: 'Failed to fetch metadata' });
        });
      return true; // Keep the message channel open for asynchronous response
    }
  });
  
  async function fetchSongMetadata(url) {
    const videoId = extractVideoId(url);
    const metadata = await getYouTubeMetadata(videoId);
    
    const bpm = await detectBpm(metadata.audioUrl);
    const genre = await detectGenre(bpm);
  
    return { bpm, genre, title: metadata.title, artist: metadata.artist };
  }
  
  function extractVideoId(url) {
    const match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }
  
  // Get video metadata from YouTube API
  async function getYouTubeMetadata(videoId) {
    const apiKey = 'YOUR_YOUTUBE_API_KEY'; // Replace with actual API Key
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`);
    const data = await response.json();
    const item = data.items[0].snippet;
    return {
      title: item.title,
      artist: item.channelTitle,
      audioUrl: `https://www.youtube.com/watch?v=${videoId}`
    };
  }
  
  // Example BPM detection (you can replace this with your actual audio analysis method)
  async function detectBpm(audioUrl) {
    // In real-world, fetch audio file and analyze it for BPM
    return 115; // Return BPM for Deep House (example)
  }
  
  async function detectGenre(bpm) {
    if (bpm <= 112) {
      return 'Amapiano';
    } else if (bpm >= 115) {
      return 'Deep House';
    }
    return 'Other';
  }
  