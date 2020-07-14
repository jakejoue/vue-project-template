# 介绍

vue-project-tmplate 是个 vue 模板项目。它由 vue-cli3 脚手架搭建而来，对开发规范进行了相关定义，并集成了一些常用的 vue 插件以及相关配置项，让 vue 开发变得规范简洁。包含的功能如下：

-   目录结构的规范和定义
-   规范化组件开发示例
-   [eslint](https://eslint.org/) + [prettier](https://prettier.io/) 代码规范管理的集成
-   [vue-router](https://router.vuejs.org/zh/) 路由和使用示例
-   [vuex](https://vuex.vuejs.org/zh/) 状态管理器和使用示例
-   [iviewUI](https://iviewui.com/docs/introduce) 的集成
-   [Less](https://iviewui.com/docs/introduce) 组件化样式开发示例
-   其他常用工具类的集成等

# 开始

## 目录结构

---

> vue-project-tmplate 目录结构如下：

```
.
├── vue.config.js
├── package.json
├── packages
│   └── markdown-loader.js
├── public
│   ├── images
│   ├── lib
│   ├── config
│   │   ├── application.js
│   │   ├── application.dev.js
│   │   └── application.prod.js
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── assets
│   │   ├── styles
│   │   │   ├── custom.less
│   │   │   └── iview.less
│   │   └── img
│   │       └── logo.png
│   ├── plugins
│   │   ├── comp-manager
│   │   │   ├── index.js
│   │   │   ├── Delete.vue
│   │   │   └── Confirm.vue
│   │   ├── axios.js
│   │   └── iview.js
│   ├── store
│   ├── router
│   │   ├── page.js
│   │   ├── home.js
│   │   ├── error.js
│   │   └── index.js
│   ├── utils
│   │   ├── application.js
│   │   ├── http.js
│   │   └── misc.js
│   ├── components
│   ├── layouts
│   │   ├── includes
│   │   │   ├── Aside.vue
│   │   │   ├── Header.vue
│   │   │   ├── Nav.vue
│   │   │   └── Footer.vue
│   │   ├── Default.vue
│   │   ├── Page.vue
│   │   └── Error.vue
│   ├── views
│   │   ├── Api.md
│   │   ├── Guide.md
│   │   └── Main.vue
│   ├── main.js
│   └── App.vue
├── babel.config.js
└── README.md
```

> 来看看这些都有什么用：

| 文件/目录     | 描述   |
| :-------------: | ------ |
| packages      | 没有发布到npm上的私有包 |
| public        | 单元格 |
| src           | 单元格 |
| vue.config.js | 单元格 |
| package.json  | 单元格 |
