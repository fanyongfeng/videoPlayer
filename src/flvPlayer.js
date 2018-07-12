import swf from './assets/player.swf';
import Player from './player';
import {
  findDom,
  createDom,
  addClass,
  removeClass,
  setAttribute,
  typeOf
} from './utils/dom';
class FlvPlayer extends Player {
  constructor(options) {
    super(options);
    this.renderSwfFrame();
  }

  renderSwfFrame() {
    this.root.removeChild(this.video);
    this.video = createDom('object', '', {
      type: 'application/x-shockwave-flash',
      width: '100%',
    }, 'video');
    const param1 = createDom('param', '', {
      name: 'movie',
      value: '/src/assets/player.swf'
      // value: swf
    });
    const param2 = createDom('param', '', {
      name: 'wmode',
      value: 'opaque'
    });
    const param3 = createDom('param', '', {
      name: 'src',
      value: this.options.src
    });

    this.video.appendChild(param1);
    this.video.appendChild(param2);
    this.video.appendChild(param3);
    if (this.options.autoplay) {
      const param = createDom('param', '', {
        name: 'autoplay',
        value: true
      });
      this.video.appendChild(param);
    }
    this.root.appendChild(this.video);
  }
}

export default FlvPlayer;