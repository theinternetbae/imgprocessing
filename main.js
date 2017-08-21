console.log("bot is starting");

//twit package
var Twit = require('twit');

var config = require('./config');

var T = new Twit(config);

//image downloader package
const download = require('image-downloader');

//image processing package
const Jimp = require("jimp");


var stream = T.stream('user');

		function down() {

			var stream = T.stream('user');

			 stream.on('direct_message', function (data) {
			 
				var req = data.direct_message.text;

					//download photo
					options = {
					  url: 'https://unsplash.it/400/600/?random',
					  dest: 'download/photo.jpg'        // Save to /path/to/dest/photo.jpg 
					}

					download.image(options)
					  .then(({ filename, image }) => {
					    console.log('File saved to', filename)
					  }).catch((err) => {
					    throw err
					  })


					  	// edit photo
						Jimp.read("download/photo.jpg").then(function (image) {

							image.brightness( -0.5 );
						   
					    	Jimp.loadFont(Jimp.FONT_SANS_32_WHITE).then(function (font) {
							    image.print(font, 20, 20, req, 2)
							     .write("upload/photo-edited.png"); // save;
							     console.log("file edited");
							});


						}).catch(function (err) {
						    console.log(err);
						});


						//tweet photo
						function twot() {
							
						var fs = require('fs');
						var b64content = fs.readFileSync('upload/photo-edited.png', { encoding: 'base64' });

						T.post('media/upload', { media_data: b64content }, function (err, data, response) {
						  // now we can assign alt text to the media, for use by screen readers and 
						  // other text-based presentations and interpreters 
						  var mediaIdStr = data.media_id_string
						  var altText = "Small flowers in a planter on a sunny balcony, blossoming."
						  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
						 
						  T.post('media/metadata/create', meta_params, function (err, data, response) {
						    if (!err) {
						      // now we can reference the media and post a tweet (media will attach to the tweet) 
						      var params = { status: '', media_ids: [mediaIdStr] }
						 
						      T.post('statuses/update', params, function (err, data, response) {
						        console.log(data)
						      })
						    }
						  })
						})



						}

						setTimeout(twot, 3000);
		

			});
		}


down();