import {detectBPM} from './bpmDetector';

export async function analyseAudio(video) {
    const ctx=new AudioContext();
    const source= ctx.createMediaElementSource(video);
    const analyser= ctx.createAnalyser();

    analyser.fftSize= 2048;
    
    source.connect(analyser);
    analyser.connect(ctx.destination);

    const buffer= new Float32Array(analyser.fftSize);
    const samples= [];

    const start= performance.now();
    while (performance.now() - start< 1200){
        analyser.getByteTimeDomainData(buffer);
        samples.push(...buffer);
        await new Promise(r=> setTimeout(r, 100));
    }

    ctx.close();

    const bpm= detectBPM(samples, ctx.sampleRate);

    return {bpm};
}