const fs = require("fs-extra");
const path = require("path");
const minify = require("html-minifier").minify;
require("colors-cli/toxic");
const {
  createSVG,
  createTTF,
  createEOT,
  createWOFF,
  createHTML,
  copyTemplate
} = require("./utils");

module.exports = function create(options) {
  if (!options) options = {};
  // 输出文件路径
  options.dist = options.dist || path.join(process.cwd(), "dist");
  // svg资源文件路径
  options.src = options.src || path.join(process.cwd(), "svg");
  options.fontsDist = path.join(options.dist, "fonts");
  options.unicodeStart = options.unicodeStart || 10000;
  options.svg2ttf = options.svg2ttf || {};
  options.emptyDist = options.emptyDist;
  options.fontName = options.fontName || "icomoon";
  options.svgicons2svgfont = options.svgicons2svgfont || {};
  options.svgicons2svgfont.fontName = options.fontName;
  options.classNamePrefix = options.classNamePrefix || "e6-icon";
  options.website = {};
  
  fs.emptyDirSync(options.dist);
  fs.emptyDirSync(options.fontsDist);

  let cssString = [];
  let cssIconHtml = [];
  let fontClassPath = path.join(options.dist, "index.html");

  return createSVG(options)
    .then((UnicodeObject) => {
      Object.keys(UnicodeObject).forEach(name => {
        let _code = UnicodeObject[name];
        cssIconHtml.push(`<li class="class-icon"><i class="${options.classNamePrefix}-${name}"></i><p class="name">${options.classNamePrefix}-${name}</p></li>`);
        cssString.push(`.${options.classNamePrefix}-${name}:before { content: "\\${_code.charCodeAt(0).toString(16)}"; }\n`);
      });
    })
    .then(()=> createTTF(options))
    .then(() => createEOT(options))
    .then(() => createWOFF(options))
    .then(() => {
      const font_temp = path.resolve(__dirname, "styles");
      return copyTemplate(font_temp, options.dist, {
        fontname: options.fontName,
        cssString: cssString.join(""),
        timestamp: new Date().getTime(),
        prefix: options.classNamePrefix || options.fontName
      });
    })
    .then(filePaths => {
      // output log
      filePaths && filePaths.length > 0 && filePaths.forEach(filePath =>
          console.log(`${"SUCCESS".green} Created ${filePath} `)
        );
    })
    .then(() => {
        // default template
        options.website.template = path.join(__dirname, "website", "index.ejs");
        // template data
        this.tempData = { ...options.website,
          _link: `${options.fontName}.css`,
          _IconHtml: cssIconHtml.join(""),
        };
        return createHTML({
          outPath: options.website.template,
          data: this.tempData
        });
      // }
    })
    .then(str => {
      if (options.website) {
        fs.outputFileSync(
          fontClassPath,
          // minify(str, { collapseWhitespace: true, minifyCSS: true })
          minify(str)
        );
        console.log(`${"SUCCESS".green} Created ${fontClassPath} `);
      }
    })
}