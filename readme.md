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


gulp.src('src/**/*.svg')
.pipe(svgToSss('svg.css'))
.pipe(gulp.dest('public_html/'));
```

generated css:
```css
.svg-filename,
.svg-filename-before:before,
.svg-filename-after:after{
	background-image:url('data:image/svg+xml,data')
}

.svg-filename2,
.svg-filename2-before:before,
.svg-filename2-after:after{
	background-image:url('data:image/svg+xml,data')
}
```

