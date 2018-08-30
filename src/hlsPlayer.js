import Player from './player';
import './utils/mux';
import { parserM3u8Index, parserM3u8Ts } from './utils/m3u8Parser';
import {loader} from './utils/loader';

const HD = 1080;
const mime = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"';
const indexUrl = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
class HlsPlayer extends Player {
  constructor(options) {
    super(options);

    if (!HlsPlayer.isSupported(mime)) {
      this.emitEvent('error', ['Your Browser is not supported']);
      return;
    }
    // this.bitRate = HD;
    this.loadM3u8File(indexUrl, (data) => {
      this.m3u8List = parserM3u8Index(data);
      console.log(this.m3u8List)
      this.loadM3u8File('https://video-dev.github.io/streams/x36xhzz/' + this.m3u8List[4].url, (data) => {
        this.tsList = parserM3u8Ts(data).slice(0, 4);
        this.loadVideo();
      });
    });
    this.transmuxer = new muxjs.mp4.Transmuxer(); 

    this.transmuxer.on('data', (segment) => {  
      let remuxedSegs = [];
      let remuxedBytesLength = 0;
      let remuxedInitSegment = null;
      let bytes = null;
      let offset = 0;
      remuxedSegs.push(segment);
      remuxedBytesLength += segment.data.byteLength;
      remuxedInitSegment = segment.initSegment;
      bytes = new Uint8Array(remuxedInitSegment.byteLength + remuxedBytesLength)
        bytes.set(remuxedInitSegment, offset);
        offset += remuxedInitSegment.byteLength;
        for (let j = 0, i = offset; j < remuxedSegs.length; j++) {
        bytes.set(remuxedSegs[j].data, i);
        i += remuxedSegs[j].byteLength;
      }
      this.mediaSource.sourceBuffers[0].appendBuffer(bytes);
    });
  }

  static isSupported(mime) {
    return  MediaSource &&
    typeof MediaSource.isTypeSupported === 'function' &&
    MediaSource.isTypeSupported(mime);
  }

  loadM3u8File(url, cb) {
    loader.get(url).then(res => cb(res.data));
  }

  loadVideo() {
    this.mediaSource = new MediaSource();
    this.video.src = URL.createObjectURL(this.mediaSource);
    this.mediaSource.addEventListener('sourceopen', this.handleSourceOpen);
  }

  handleSourceOpen = (e) => {
    const sourceBuffer = this.mediaSource.addSourceBuffer(mime);
    sourceBuffer.mode = 'segments'; 
    this.sourceBuffer = sourceBuffer;
    const fetchTs = () => {
      if (this.tsList.length === 0) {
        this.mediaSource.endOfStream();
        return;
      }
      const { url, duration } = this.tsList.shift();
      // if (!sourceBuffer.updating && this.mediaSource.readyState === 'open') {
      //   mediaSource.duration += duration;
      // }
 
      this.fetchSegmentAndAppend('https://video-dev.github.io/streams/x36xhzz/url_8/' + url);
    }
    sourceBuffer.addEventListener('updateend', () => {
      fetchTs();
    });
    fetchTs();
  }

  fetchSegmentAndAppend(segmentUrl) {
    loader({
      method: 'get',
      url: segmentUrl,
      responseType: 'arraybuffer'
    }).then(res => {
      this.transmuxer.push(new Uint8Array(res.data));
      this.transmuxer.flush();
    });
  }
}

export default HlsPlayer;