import {extractMetadata} from './core/metadata';
import {analyseAudio} from './core/audioEngine';
import {classifyGenre} from './core/genreClassifier';
import {evaluateRules} from './core/rulesEngine';
import {getCached, setCached} from './core/cache';

let processedVideoId= null;

async function init(){
    const video= document.querySelector('video');
    if(!video) return;

    const metadata= extractMetadata(video);
    if(!metadata?.videoId) return;

    if (metadata.videoId === processedVideoId) return;
    processedVideoId= metadata.videoId;

    const cached= await getCached(metadata.videoId);
    if(cached){
        console.log('Using cached data for videoId:', metadata.videoId);
        applySkip(video, cached.skipTime)
        return;
    }

    const features= await analyseAudio(video);
    const genreResult= classifyGenre(metadata, features);
    const decision= evaluateRules(metadata, genreResult,features);

    if (decision.skip){
        applySkip(video, decision.skipTime);
        await setCached(metadata.videoId, decision);
    }
}

function applySkip(video, time){
    if (video.duration > time + 10){
        video.currentTime= time;
    }
}

const observer= new MutationObserver(init);
observer.observe(document.body, {childList: true, subtree: true});

init();