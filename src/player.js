import EventEmitter from 'wolfy87-eventemitter';
import {
  findDom,
  createDom,
  addClass,
  removeClass,
  setAttribute
} from './utils/dom';
import errorTypes from './utils/error';

const defaultProps = {
  autoplay: true,
  control: false,
  src: '',
}

const ROOT_CLASS = 'tm-player';

class Player {
  constructor({
    id,
    options
  }) {
    options = { ...defaultProps,
      ...options
    };
    const {
      autoplay,
      control,
      muted
    } = options;
    const event = new EventEmitter();
    Player.prototype = Object.assign(Player.prototype, event.__proto__);
    this.setErrorListener();
    this.checkParams({
      id,
      options
    });
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
    this.createVideoFrame();
    this.setVideoEventListener();
  }

  get muted() {
    return this.video.muted;
  }

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

  /**
   *  creat root div, appent video in root
   */
  createVideoFrame() {
    this.root = this.video.parentElement;
    if (!this.root) {
      this.emitEvent(errorTypes.warn, 'should creat a root dom');
      return;
    }
    addClass(this.root, ROOT_CLASS);
  }

  setVideoEventListener() { //video origin event
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
    eventList.map(event => {
      this.video.addEventListener(event.origin, (...arg) => {
        this.emitEvent(event.instance, [...arg]);
      });
    })
  }

  get currentTime() {
    return this.video.currentTime;
  }

  set currentTime(time) {
    this.video.currentTime = time;
  }

  setErrorListener() {
    Object.keys(errorTypes).map(error => {
      this.addListeners(error, () => errorTypes[error]())
    });
  }

  checkParams(props) {
    if (!props.id) {
      this.emitEvent(errorTypes.warn, '缺少video Id');
    }
  }
}

export default Player;