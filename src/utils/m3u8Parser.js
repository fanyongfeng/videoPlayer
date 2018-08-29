import qs from 'qs';

const LEVEL_PLAYLIST_REGEX_FAST = new RegExp([
  /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source, // duration (#EXTINF:<duration>,<title>), group 1 => duration, group 2 => title
  /|(?!#)(\S+)/.source, // segment URI, group 3 => the URI (note newline is not eaten)
  /|#EXT-X-BYTERANGE:*(.+)/.source, // next segment's byterange, group 4 => range spec (x@y)
  /|#EXT-X-PROGRAM-DATE-TIME:(.+)/.source, // next segment's program date/time group 5 => the datetime spec
  /|#.*/.source // All other non-segment oriented tags will match with all groups empty
].join(''), 'g');

const LEVEL_PLAYLIST_REGEX_SLOW = /(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(VERSION):(\d+))|(?:#EXT-X-(MAP):(.+))|(?:(#)([^:]*):(.*))|(?:(#)(.*))(?:.*)\r?\n?/;

const MP4_REGEX_SUFFIX = /\.(mp4|m4s|m4v|m4a)$/i;


export const parserM3u8Index = (data) => {
  const list = data.match(LEVEL_PLAYLIST_REGEX_FAST);
  let result  = [];
  if (list && list[0] === "#EXTM3U") {
    list.forEach((item, index) => {
      if (item.indexOf('NAME') > -1) {
        const info = qs.parse(item.split(':')[1], { delimiter: ',' });
        const url = list[index + 1];
        result.push({...info, url});
      }
    });
  }
  return result;
}

export const parserM3u8Ts = (data) => {
  const list = data.match(LEVEL_PLAYLIST_REGEX_FAST);
  let result  = [];
  if (list && list[0] === "#EXTM3U") {
    list.forEach((item, index) => {
      if (item.indexOf('EXTINF') > -1) {
        const duration = parseInt(item.split(':')[1], 10);
        const url = list[index + 1];
        result.push({duration, url});
      }
    });
  }
  return result;
}