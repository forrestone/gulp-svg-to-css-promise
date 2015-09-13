gulp = require 'gulp'
coffee = require 'gulp-coffee'


gulp.task 'coffee', ->
	gulp.src 'index.coffee'
	.pipe coffee bare: on
	.pipe gulp.dest '.'


gulp.task 'watch', ->
	gulp.watch 'index.coffee', ['coffee']


gulp.task 'default', [
	'coffee',
	'watch'
]

