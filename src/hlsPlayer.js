import Player from './player';
import { parserM3u8Index } from './utils/m3u8Parser';
import {loader} from './utils/loader'

class HlsPlayer extends Player {
  constructor(options) {
    super(options);
    this.indexUrl = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
    if (!HlsPlayer.isSupported) {
      this.emitEvent('error', ['Your Browser is not supported']);
    }
    this.loadM3u8File();
  }

  static isSupported() {
    return  MediaSource &&
    typeof mediaSource.isTypeSupported === 'function' &&
    mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  }

  loadM3u8File() {
    loader.get(this.indexUrl).then(res => {
      const m3u8Index = res.data;
      const m3u8List = parserM3u8Index(res.data);
      debugger
    });
  }

  
}

export default HlsPlayer;