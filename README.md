# 使用文档

## 项目目录结构

- `src` 是后端程序目录，`web` 是前端目录。
- `web/src` 是源文件目录，里面有 `css`、`img`、`js`、`scss` 四个文件夹，其中 `scss` 用于存放开发阶段编译前的样式文件，`css` 用于存放开发阶段编译后的样式文件。
- `web/dist` 是构建目录，用于项目完成后的打包和交付。有 `css`、`js`、`img-compressed` 三个文件夹，其中 `img-compressed` 是图片压缩后的存放目录。
- `config.php` 是项目程序配置文件
- `database.php` 是项目数据库配置文件
- `index.php` 是项目程序主入口文件

## 前端使用说明

1. 安装 [Node 4.3.* ](https://nodejs.org/en/)
2. 安装 `cnpm`： `npm install -g cnpm --registry=https://registry.npm.taobao.org`
3. 在项目web目录运行：`cnpm install`，等待结束
3. 开发阶段运行项目：
 - 在项目根目录运行：`gulp dev`
4. 项目完成打包：`gulp build`(一般不用管)

## 后端使用说明

1. 下载安装 [composer](https://getcomposer.org) 包管理软件（注意：若安装过程出现未安装 OpenSSL 扩展错误，直接在 phpstudy 中开启）
2. 打开翻墙软件全局翻墙
3. 在当前文件夹运行命令行工具，执行命令`composer install`
