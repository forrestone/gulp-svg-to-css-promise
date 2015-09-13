var through2 = require('through2');
var gutil = require('gulp-util');
var Vinyl = require('vinyl');
var path = require('path');
var fs = require('fs');

var Mustache = require('mustache');
var SVGO = require('svgo');
var svgo = new SVGO;

const DEFAULT_NAME = 'svg.css';
const DEFAULT_PREFIX = 'svg-';
const DEFAULT_POSTFIX = '';


module.exports = function (opts) {
	opts = opts || {};

	if (typeof opts === 'string') {
		opts = {name: opts};
	}

	if (opts.template == null) {
		opts.template = fs.readFileSync(__dirname + '/template.mustache', 'utf8');
	}

	if (opts.name == null) {
		opts.name = DEFAULT_NAME;
	}

	if (opts.prefix == null) {
		opts.prefix = DEFAULT_PREFIX;
	}

	if (opts.postfix == null) {
		opts.postfix = DEFAULT_POSTFIX;
	}

	var parsedData = {
		items: [],
		prefix: opts.prefix,
		postfix: opts.postfix
	};


	function eachFile(file, enc, callback) {
		if (file.isStream()) {
			this.emit('error', new gutil.PluginError(
				'gulp-svg-to-css',
				'Streams are not supported!'
			));
			return callback();
		}

		if (file.isBuffer()) {
			var svgCode = file.contents.toString('utf8');
			var fileName = path.parse(file.path).name;

			svgo.optimize(svgCode, function (result) {
				var svgCode = encodeURIComponent(result.data);
				var dataUrl = 'data:image/svg+xml,' + svgCode;

				parsedData.items.push({
					dataurl: dataUrl,
					filename: fileName,
					svgcode: svgCode
				});

				callback();
			});
			return;
		}

		return callback();
	}



	function endStream(callback) {
		var cssCode = Mustache.render(opts.template, parsedData);

		this.push(new Vinyl({
			path: opts.name,
			contents: new Buffer(cssCode, 'utf8')
		}));

		callback();
	}


	return through2.obj(eachFile, endStream);
};

