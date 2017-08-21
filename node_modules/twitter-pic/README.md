# TwitterPic

Post pictures into Twitter easily.

## Installing

`npm install twitter-pic`

## Usage

```
var TwitterPic = require('twitter-pic'),
    request    = require('request')
;

var t = new TwitterPic({
    consumer_key:    'w',
    consumer_secret: 'x',
    token:           'y',
    token_secret:    'z'
});


// details about the params below can be found in
// https://dev.twitter.com/docs/api/1/post/statuses/update_with_media
t.update({
    status: 'This can be a status',
    media: request('https://avatars3.githubusercontent.com/u/1159695?s=460'),
    // in_reply_to_status_id: 000000,
    // possibly_sensitive: false,
    // lat: 37.7821120598956,
    // long: -122.400612831116,
    // place_id: 'df51dec6f4ee2b2c',
    // display_coordinates: true
},
function (err, result) {
    if (err) {
        return console.error('Nope!', err);
    }

    console.log(result);
});
```
