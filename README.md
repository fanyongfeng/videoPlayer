# videoPlayer

An HTML5 Video (flv/living stream/hls) Player 

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
- stream
```
  player.srcObject = stream;
```

- mp4
```
  player.src = mp4Url;
  //addeventlistener
  player.addEventListener('ready', callback);
  ...
```

- flv
```
```

- hls
```
```