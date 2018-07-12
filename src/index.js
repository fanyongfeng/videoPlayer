import './polyfills';
import Player from './player';
import SwfPlayer from './flvPlayer';
import './index.less';

window.Player = Player;

export default Player;

export const FlvPlayer = SwfPlayer;
window.FlvPlayer = FlvPlayer;