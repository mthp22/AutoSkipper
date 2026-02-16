export function extractMetadata(){
    const playerData= window.ytInitialPlayerResponse?.videoDetails;
    if(!playerData) return null;

    return {
        title: playerData.title,
        length: parseInt(playerData.lengthSeconds),
        videoId: playerData.videoId,
        keywords: playerData.keywords || [],
    }
}