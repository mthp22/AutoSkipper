export function evaluateRules(metadata, genreResult, features) {
    if (metadata.length < 90) {
      return { skip: false };
    }
  
    if (genreResult.confidence < 0.6) {
      return { skip: false };
    }
  
    let skipTime = 30;
  
    if (genreResult.genre === "amapiano") skipTime = 34;
    if (genreResult.genre === "deep_house") skipTime = 30;
  
    return {
      skip: true,
      skipTime,
      genre: genreResult.genre,
      bpm: features.bpm
    };
  }
  