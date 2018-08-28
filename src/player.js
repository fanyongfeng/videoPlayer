import EventEmitter from 'wolfy87-eventemitter';
import {
  findDom,
  createDom,
  addClass,
  removeClass,
  setAttribute,
  typeOf
} from './utils/dom';
import errorTypes from './utils/error';

const defaultProps = {
  autoplay: true,
  control: false,
  muted: false,
  scale: '16:9', // 视频比例
  poster: [], // array or string
  src: ''
}

const eventList = [{
  origin: 'canplay',
  instance: 'ready'
}, {
  origin: 'volumechange',
  instance: 'volumechange'
}, {
  origin: 'play',
  instance: 'play'
}, {
  origin: 'pause',
  instance: 'pause'
}, {
  origin: 'loadeddata',
  instance: 'loadeddata'
}, {
  origin: 'error',
  instance: 'error'
}, {
  origin: 'durationchange',
  instance: 'durationchange'
}];

const ROOT_CLASS = 'tm-player';

class Player {
  constructor(options) {
    options = {
      ...defaultProps,
      ...options
    };
    this.options = options;
    const {
      autoplay,
      control,
      muted,
      id
    } = options;
    const event = new EventEmitter();
    Object.assign(Player.prototype, event.__proto__);
    this.setErrorListener();
    this.checkParams(options);
    this.video = findDom(`#${id}`);
    const option = {
      autoplay,
      control: false,
      muted
    };
    if (!this.video) {
      this.video = createDom('video', 'your browser don`t support HTML5 video tag', option, 'video');
    } else {
      setAttribute(this.video, option)
    }
    this._createVideoFrame();
    this._setVideoEventListener();
  }

  get muted() {
    return this.video.muted;
  }

  /**
   *
   * @param {boolean} muted
   * @memberof Player
   */
  set muted(muted) {
    this.video.muted = muted;
  }

  /**
   * destory
   */
  dispose() {
    removeClass(this.root, ROOT_CLASS);
    this.removeEvent();
    this.video = null;
  }

  /**
   *
   *
   * @param {string} poster
   * @returns
   * @memberof Player
   */
  setPoster(poster) {
    if (typeOf(poster) !== 'string')
      return;
    this._posterImg.src = poster;
  }

  get srcObject() {
    return null;
  }

  set srcObject(stream) {
    if (!stream) {
      this.emitEvent('warn', 'no stream');
      return;
    }
    this.video.srcObject = stream;
  }

  get currentTime() {
    return this.video.currentTime;
  }

  set currentTime(time) {
    this.video.currentTime = time;
  }

  set src(url) {
    this.options.src = url;
    this.video.setAttribute("src", url);
    this.video.load();
  }

  get src() {
    return this.options.src;
  }

  pause() {
    this.video.pause();
  }

  play() {
    this.video.play();
  }

  /**
   *  creat root div and controls, appent video in root
   */
  _createVideoFrame() {
    const wrapper = this.video.parentElement;
    const scaleInfo = this.options.scale.split(":");
    const scalePercent = scaleInfo[1] / scaleInfo[0]
    if (!wrapper) {
      this.emitEvent('warn', 'should creat a root dom');
      wrapper = findDom('body');
    }
    let posterUrl = this.options.poster;
    if (typeOf(this.options.poster) === 'array') {
      const length = this.options.poster;
      posterUrl = this.options.poster[Math.floor(Math.random() * length)];
    }
    this._posterImg = createDom('img', '', {
      src: posterUrl
    }, 'poster');
    this.poster = createDom('div', '', {}, 'poster-wrapper hide');
    this
      .poster
      .appendChild(this._posterImg);
    this.root = createDom('div', '', {}, ROOT_CLASS);
    this.root.appendChild(this.poster);
    this.root.appendChild(this.video);
    wrapper.appendChild(this.root);
    addClass(this.root, ROOT_CLASS);
    this.root.style.paddingBottom = scalePercent * 100 + '%';
    this.poster.show = (visible) => {
      !visible && addClass(this.poster, 'hide');
      visible && removeClass(this.poster, 'hide');
    }
  }

  _setVideoEventListener() { //video origin event
    eventList.map(event => {
      this
        .video
        .addEventListener(event.origin, (...arg) => {
          this.emitEvent(event.instance, [...arg]);
        });
    })
  }

  setErrorListener() {
    Object
      .keys(errorTypes)
      .map(error => {
        console.log(errorTypes[error])
        this.addListeners(error, [errorTypes[error]]);
      });
  }

  checkParams(props) {
    if (!props.id) {
      this.emitEvent('error', ['must have a video Id']);
    }
  }
}

export default Player;