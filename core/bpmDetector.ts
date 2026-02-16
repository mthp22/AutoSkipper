export function detectBPM(samples, sampleRate) {
    const peaks = [];
    const threshold = 0.8;
  
    for (let i = 0; i < samples.length; i++) {
      if (samples[i] > threshold) {
        peaks.push(i);
      }
    }
  
    const intervals = [];
    for (let i = 1; i < peaks.length; i++) {
      intervals.push(peaks[i] - peaks[i - 1]);
    }
  
    const avgInterval =
      intervals.reduce((a, b) => a + b, 0) / intervals.length;
  
    const seconds = avgInterval / sampleRate;
    const bpm = 60 / seconds;
  
    return Math.round(bpm);
  }
  