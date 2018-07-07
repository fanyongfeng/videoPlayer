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
      this.video = createDom('video', 'your browser don`t support HTML5 video tag', option);
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
      this.emitEvent(errorTypes.warn, 'no stream');
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

  /**
   *  creat root div and controls, appent video in root
   */
  _createVideoFrame() {
    this.root = this.video.parentElement;
    if (!this.root) {
      this.emitEvent('warn', 'should creat a root dom');
      this.root = findDom('body');
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
    this
      .root
      .appendChild(this.poster);
    addClass(this.root, ROOT_CLASS);
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