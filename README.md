svg-to-iconfont
---

Read a set of SVG icons and ouput a TTF/EOT/WOFF/SVG font, Generator of fonts from SVG icons.
将svg文件转换为字体图标

## Install

```bash
npm i svg-to-iconfont
```

## Usage

```js
const svgtoiconfont = require("../src");
const path = require("path");
const rootPath = path.resolve(process.cwd(), "test");
const svgtoiconfont = require("svg-to-iconfont");
 
svgtoiconfont({
  dist: path.resolve(rootPath, "dist"), // output path(输出文件路径)
  src: path.resolve(rootPath, "svg"), // svg path(svg资源路径)
  fontName: "icomoon", // font name （字体名称）
  classNamePrefix: "e6-icon", // class name prefix （class前缀）
}).then(() => {
  console.log('done!');
});
```