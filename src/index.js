import './polyfills';
import Player from './player';
import SwfPlayer from './flvPlayer';
import LivingPlayer from './hlsPlayer';
import './index.less';

window.Player = Player;

export default Player;

export const FlvPlayer = SwfPlayer;
export const HlsPlayer = LivingPlayer;
window.FlvPlayer = FlvPlayer;
window.HlsPlayer = HlsPlayer;