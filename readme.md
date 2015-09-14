gulp-svg-to-css
===
Plugin for gulp: Packs svg files in css sprite inline



Install:
---
```
npm install gulp-svg-to-css --save-dev
```


Usage:
---

```javascript
var svgToSss = require('gulp-svg-to-css');

gulp.src('**/*.svg')
.pipe(svgToSss('svg.css'))
.pipe(gulp.dest('build/'));
```

generated css:
```css
.svg-filename,
.svg-filename-before:before,
.svg-filename-after:after{
	background-image:url('data:image/svg+xml,data...')
}

.svg-filename2,
.svg-filename2-before:before,
.svg-filename2-after:after{
	background-image:url('data:image/svg+xml,data...')
}
```

in html
```html
<div class='svg-filename'>
as background-image for element
</div>

<div class='svg-filename-before'>
as background-image for :before pseudo-element
</div>
```

Options:
---

```javascript
svgToSss({
	name:'svg.css', // default 'svg.css'
	prefix: 'ololo-', //  default 'svg-'
	postfix: '-trololo', //  default ''
})
```
result css:
```css
.ololo-filename-trololo,
.ololo-filename-trololo-before:before,
.ololo-filename-trololo-after:after{
	background-image:url('data:image/svg+xml,data...')
}
```

Custom template css:
---
This plugin use mustache template engine 

default template:
```mustache
.{{prefix}}{{filename}}{{postfix}},
.{{prefix}}{{filename}}{{postfix}}-before:before,
.{{prefix}}{{filename}}{{postfix}}-after:after{background-image:url('{{{dataurl}}}')}
```

custom template:
```javascript
svgToSss({
	template: "...custom mustache template code..."
})
```

Use with css preprocessors:
---
```javascript
svgToSss({
	name: 'vars.styl',
	template: "{{filename}} = '{{dataurl}}'"
})
.pipe(stylus())
```
result vars.styl:
```styl
filename1 = 'data:image/svg+xml,data...'
filename2 = 'data:image/svg+xml,data...'
filename3 = 'data:image/svg+xml,data...'
```


BONUS livereload svg after change
===

- Download chrome extension https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
- Open your site in chrome
- Run gulp default task
- Enable Livereload extension
- Try change svg files
- ???
- PROFIT

```javascript
var svgToSss = require('gulp-svg-to-css');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

gulp.task('svg', function(){
	return gulp.src('**/*.svg')
	.pipe(svgToSss('svg.css'))
	.pipe(gulp.dest('build/'))
	.pipe(livereload());
});

gulp.task('watch', function(){
	livereload.listen();
	watch('**/*.svg', function(){ gulp.start('svg') });
});

gulp.task('default', ['svg', 'watch']);
```