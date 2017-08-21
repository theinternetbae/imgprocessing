'use strict';

var request = require('request');

var TwitterPic = function (auth) {
    this._auth = auth;
};

TwitterPic.prototype.update = function (params, callback) {
    var form, req, value, key;

    req = request.post('https://api.twitter.com/1.1/statuses/update_with_media.json', {
        oauth: this._auth
    }, function (err, res, body) {
        var parsedBody = JSON.parse(body);

        if (parsedBody.errors && parsedBody.errors[0] && parsedBody.errors[0].message) {
            return callback(parsedBody.errors[0].message, parsedBody);
        }

        callback(null, parsedBody);
    });

    // add parameters to the req
    form = req.form();

    // for each param that was specified
    for (key in params) {
        value = params[key];
        // if it's the media, assert that field key is correct
        if (key === 'media' || key === 'media[]') {
            // can't add multiple pictures due to this issue:
            // https://github.com/felixge/node-form-data/issues/38
            //
            // if (isArray(value)) {
            //     value.forEach(function (fileStream) {
            //         form.append('media[]', fileStream);
            //     });
            // } else {
            //     form.append('media[]', value);
            // }
            form.append('media[]', value);
        } else {
            // not an array, just add the param
            form.append(key, value);
        }
    }
};

module.exports = TwitterPic;

// example error:

// {
//     "errors": [
//         {
//             "message": "Invalid or expired token",
//             "code": 89
//         }
//     ]
// }

// example success:

// {
//     "created_at": "Mon Apr 07 00:21:45 +0000 2014",
//     "id": 452964408738988000,
//     "id_str": "452964408738988033",
//     "text": "W00t? http://t.co/VhpaWhfae3",
//     "source": "<a href=\"https://github.com/marcooliveira\" rel=\"nofollow\">enei-2014</a>",
//     "truncated": false,
//     "in_reply_to_status_id": null,
//     "in_reply_to_status_id_str": null,
//     "in_reply_to_user_id": null,
//     "in_reply_to_user_id_str": null,
//     "in_reply_to_screen_name": null,
//     "user": {
//         "id": 14758166,
//         "id_str": "14758166",
//         "name": "Marco Oliveira",
//         "screen_name": "sonicspot",
//         "location": "Portugal",
//         "description": "@baboom CTO - @IndigoUnited co-founder - @bower contributor - Tech enthusiast, open-source advocate, good life lover & entrepreneur - http://t.co/hlhPvRpA48",
//         "url": "http://t.co/m4z9OIvlTG",
//         "entities": {
//             "url": {
//                 "urls": [
//                     {
//                         "url": "http://t.co/m4z9OIvlTG",
//                         "expanded_url": "http://marcooliveira.com/",
//                         "display_url": "marcooliveira.com",
//                         "indices": [
//                             0,
//                             22
//                         ]
//                     }
//                 ]
//             },
//             "description": {
//                 "urls": [
//                     {
//                         "url": "http://t.co/hlhPvRpA48",
//                         "expanded_url": "http://instabit.ch",
//                         "display_url": "instabit.ch",
//                         "indices": [
//                             134,
//                             156
//                         ]
//                     }
//                 ]
//             }
//         },
//         "protected": false,
//         "followers_count": 340,
//         "friends_count": 321,
//         "listed_count": 23,
//         "created_at": "Tue May 13 12:51:08 +0000 2008",
//         "favourites_count": 382,
//         "utc_offset": 3600,
//         "time_zone": "Lisbon",
//         "geo_enabled": true,
//         "verified": false,
//         "statuses_count": 752,
//         "lang": "en",
//         "contributors_enabled": false,
//         "is_translator": false,
//         "is_translation_enabled": false,
//         "profile_background_color": "1F1D1D",
//         "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/791836842/c48ea2d100bce191dc422fa6acd7dbc5.jpeg",
//         "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/791836842/c48ea2d100bce191dc422fa6acd7dbc5.jpeg",
//         "profile_background_tile": true,
//         "profile_image_url": "http://pbs.twimg.com/profile_images/2261290141/Marco_Oliveira_normal.jpg",
//         "profile_image_url_https": "https://pbs.twimg.com/profile_images/2261290141/Marco_Oliveira_normal.jpg",
//         "profile_banner_url": "https://pbs.twimg.com/profile_banners/14758166/1358713024",
//         "profile_link_color": "29115E",
//         "profile_sidebar_border_color": "000000",
//         "profile_sidebar_fill_color": "F6F6F6",
//         "profile_text_color": "383233",
//         "profile_use_background_image": true,
//         "default_profile": false,
//         "default_profile_image": false,
//         "following": false,
//         "follow_request_sent": false,
//         "notifications": false
//     },
//     "geo": null,
//     "coordinates": null,
//     "place": null,
//     "contributors": null,
//     "retweet_count": 0,
//     "favorite_count": 0,
//     "entities": {
//         "hashtags": [],
//         "symbols": [],
//         "urls": [],
//         "user_mentions": [],
//         "media": [
//             {
//                 "id": 452964408575418400,
//                 "id_str": "452964408575418368",
//                 "indices": [
//                     6,
//                     28
//                 ],
//                 "media_url": "http://pbs.twimg.com/media/BklAus0IYAAeaAF.jpg",
//                 "media_url_https": "https://pbs.twimg.com/media/BklAus0IYAAeaAF.jpg",
//                 "url": "http://t.co/VhpaWhfae3",
//                 "display_url": "pic.twitter.com/VhpaWhfae3",
//                 "expanded_url": "http://twitter.com/sonicspot/status/452964408738988033/photo/1",
//                 "type": "photo",
//                 "sizes": {
//                     "large": {
//                         "w": 460,
//                         "h": 460,
//                         "resize": "fit"
//                     },
//                     "thumb": {
//                         "w": 150,
//                         "h": 150,
//                         "resize": "crop"
//                     },
//                     "small": {
//                         "w": 340,
//                         "h": 340,
//                         "resize": "fit"
//                     },
//                     "medium": {
//                         "w": 460,
//                         "h": 460,
//                         "resize": "fit"
//                     }
//                 }
//             }
//         ]
//     },
//     "favorited": false,
//     "retweeted": false,
//     "possibly_sensitive": false,
//     "lang": "is"
// }
