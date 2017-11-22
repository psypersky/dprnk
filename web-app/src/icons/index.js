const fs = require('fs');
const path = require('path');
const debug = require('debug')('app:iconfont');

function createIconsScss(iconFontConfig) {
  const fontPath = iconFontConfig.fontDest;
  const cssClass = "icon";
  const fileName = path.resolve(__dirname, iconFontConfig.sassDest);

  return function (glyphs, options) {
    // CSS templating, e.g.
    // console.log(glyphs, options);

    const fontName = options.fontName;

    let scss =
      `//////////////////////////////////////////////// \n` +
      `//                                            // \n` +
      `//    This file is auto generated             // \n` +
      `//    DON'T MODIFY                            // \n` +
      `//    everything will be overwriten by gulp   // \n` +
      `//                                            // \n` +
      `//////////////////////////////////////////////// \n\n\n\n` +

      `@font-face { \n` +
      `  font-family: "${fontName}"; \n` +
      `  src: url('${fontPath}${fontName}.eot'); \n` +
      `  src: url('${fontPath}${fontName}.eot?#iefix') format('eot'), \n` +
      `    url('${fontPath}${fontName}.woff2') format('woff2'), \n` +
      `    url('${fontPath}${fontName}.woff') format('woff'), \n` +
      `    url('${fontPath}${fontName}.ttf') format('truetype'), \n` +
      `    url('${fontPath}${fontName}.svg#${fontName}') format('svg'); \n` +
      `} \n` +
      ` \n` +
      `%${cssClass}-styles { \n` +
      `  font-family: "${fontName}"; \n` +
      `    -webkit-font-smoothing: antialiased; \n` +
      `    -moz-osx-font-smoothing: grayscale; \n` +
      `  font-style: normal; \n` +
      `  font-variant: normal; \n` +
      `  font-weight: normal; \n` +
      `  // speak: none; // only necessary if not using the private unicode range (firstGlyph option) \n` +
      `  text-decoration: none; \n` +
      `  text-transform: none; \n` +
      `}` +
      "\n\n\n"
      ;

    for (let i = 0; i < glyphs.length; i++) {
      const glyph = glyphs[i];

      scss +=
        `.${glyph.name}:before {` +
        `  @extend %${cssClass}-styles;` +
        `  content: "${glyph.unicode}";` +
        ` }\n`
        ;
    }

    fs.writeFileSync(fileName, scss);
    debug("scss file for icons, created");
  };
}

module.exports = createIconsScss;
