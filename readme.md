gulp-svg-to-css
===
Plugin for gulp



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
{{#items}}
    .{{prefix}}{{filename}}{{postfix}},
    .{{prefix}}{{filename}}{{postfix}}-before:before,
    .{{prefix}}{{filename}}{{postfix}}-after:after{background-image:url('{{{dataurl}}}')}
{{/items}}
```

custom template:
```javascript
svgToSss({
	template: "...custom mustache template code..."
})
```


BONUS livereload svg after change
===

- 1) download chrome extension https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
- 2) open your site
- 3) run gulp
- 4) enable Livereload extension
- 5) try change svg files
- ???
- PROFIT =)

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
	watch('**/*.svg', function(){ gulp.start('svg') }
});


gulp.task('default', ['svg', 'watch']);

```