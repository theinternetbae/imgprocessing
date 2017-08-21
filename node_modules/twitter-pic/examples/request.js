'use strict';

var TwitterPic = require('../index'),
    request    = require('request')
;

var t = new TwitterPic({
    "consumer_key":    "",
    "consumer_secret": "",
    "token":           "",
    "token_secret":    ""
});

t.update({
    status: 'w00t?',
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
        console.error('Nope!', err);
    }

    console.log(result);
});
