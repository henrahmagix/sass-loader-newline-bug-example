# sass-loader-newline-bug-example

An example of webpack's sass-loader not correctly compiling newlines in a `.scss` file when imported from within the `node_modules` directory, whereas `node-sass` used directly compiles it correctly.

The issue is in a `url()` of an inline svg, in this case a rubbish bin icon in [Mavo](http://mavo.io/): the newlines in the SCSS source are not compiled correctly, but they are via regular imports and also when compiled directly with node-sass.

The result is broken CSS. Importing from `node_modules` seems to be the reason for this, and I've no idea why.

System: OS X 10.11.6 | node v7.5.0 | npm v4.6.1 | shell Bash

## Steps

- `npm test`
- Open `dist/app.css` and confirm the results below
- Open `mavo.css` and see how everything is fine

### Correct results
These parts of the CSS file will load correctly in the browser.

- See the correct `\A` in the `.rubbish-bin-copied-without-inline-svg-function::before` rule
    + This came from `src/sass/_copied-from-mavo-defs.scss` via `@import copied-from-mavo-defs`
- See the correct `\a` in the `.rubbish-bin-copied-with-copied-inline-svg-function::before` rule
    + This came from the same import as above but includes the missing `inline-svg` function copied from `mavo/src-css/_defs.scss`

### Incorrect results
These parts will not load correctly in the browser. Since importing `~mavo/src-css/mavo.scss` directly will result in the `.rubbish-bin` rule at the top of the file, this means none of the rest of the rules in the stylesheet, which are compiled correctly, are applied in the browser. No styles, no fun :cry:

- See the newlines with missing `\A` or `\a` encoded newline escapes in the `.via-import-resolver::before` rule
    + This came from importing `mavo/src-css/_defs.scss` via sass-loader's `~` import resolver and using the provided `%rubbish-bin` extension
- See the same result in the last definition
    + This was the same as above but directly importing `mavo/src-css/_defs.scss` via the relative `node_modules` path

For more info on sass-loader's `~` import resolver, see https://github.com/webpack-contrib/sass-loader#imports
