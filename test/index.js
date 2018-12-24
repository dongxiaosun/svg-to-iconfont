const svgtofont = require("../src");
const path = require("path");
const rootPath = path.resolve(process.cwd(), "test");
svgtofont({
  dist: path.resolve(rootPath, "dist"), // output path(输出文件目录)
  src: path.resolve(rootPath, "svg"), // svg path(svg资源路径)
  fontName: "", // font name （字体名称）
  classNamePrefix: "" // class name prefix （class前缀）
}).then(() => {
  console.log("done!");
});
