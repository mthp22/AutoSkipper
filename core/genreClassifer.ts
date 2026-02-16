export function classifyGenre(metadata, features) {
    let confidence = 0;
    let genre = "unknown";
  
    const title = metadata.title.toLowerCase();
  
    if (title.includes("amapiano")) confidence += 0.5;
    if (title.includes("deep house")) confidence += 0.5;
  
    if (features.bpm >= 108 && features.bpm <= 115) {
      genre = "amapiano";
      confidence += 0.3;
    }
  
    if (features.bpm >= 115) {
      genre = "deep_house";
      confidence += 0.3;
    }
  
    return { genre, confidence };
  }
  