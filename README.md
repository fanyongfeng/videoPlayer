# videoPlayer

## start

rollup config rollup.config.js -c -w

open http://localhost:10001/index.html

## use player
```
import Player from 'Player';
const player = new Player({
  id: 'example',
  autoplay: 'false'
  ...
})
```
- stram
```
  player.srcObject = stream;
```