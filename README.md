# 使用文档

## 前端使用说明（炜贤撰写）

1. 安装 Node 4.3.*
2. 安装 cnpm： `npm install -g cnpm --registry=https://registry.npm.taobao.org`
3. 在项目根目录运行：`cnpm install`，等待结束
3. 开发阶段运行项目：
 - 在 `web` 目录内运行：`gulp dev`
4. 项目完成后打包：
 - 在 `web` 目录内运行： `gulp build`(一般不用管)

## 项目前端目录结构

**前端项目目录是 Web**

Web 目录内：

`src` 是源文件目录，里面有 `css`、`img`、`js`、`scss` 四个文件夹，其中 `scss` 用于存放开发阶段编译前的样式文件，`css` 用于存放开发阶段编译后的样式文件。

`dist` 是构建目录，用于项目完成后的打包和交付。有 `css`、`js`、`img-compressed` 三个文件夹，其中 `img-compressed` 是图片压缩后的存放目录。

## 后端使用说明（启华撰写）
