through2 = require('through2')
gutil = require('gulp-util')
Vinyl = require('vinyl')
path = require('path')
fs = require('fs')

Mustache = require('mustache')
SVGO = require('svgo')
svgo = new SVGO


module.exports = (opts = {}) ->
	if typeof opts is 'string'
		opts = {name: opts}

	opts.template ?= fs.readFileSync(__dirname + '/template.mustache', 'utf8')
	opts.name ?= 'svg.css'
	opts.prefix ?= 'svg-'
	opts.postfix ?= ''

	parsedData =
		items: []
		prefix: opts.prefix
		postfix: opts.postfix


	eachFile = (file, enc, callback) ->
		if file.isStream()
			error = new gutil.PluginError('gulp-svg-to-css', 'Streams are not supported!')
			@emit('error', error)
			callback()
			return

		unless file.isBuffer()
			callback()
			return

		svgCode = file.contents.toString('utf8')
		fileName = path.parse(file.path).name
		svgo.optimize svgCode, (result) ->
			parsedData.items.push
				dataurl: 'data:image/svg+xml,' + encodeURIComponent(result.data)
				filename: fileName
			callback()


	endStream = (callback) ->
		cssCode = Mustache.render(opts.template, parsedData)
		buffer = new Buffer(cssCode, 'utf8')
		@push new Vinyl
			path: opts.name
			contents: buffer
		callback()



	return through2.obj(eachFile, endStream)

