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

|   文件/目录   | 描述                                                                                                                                            |
| :-----------: | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|   packages    | 没有发布到 npm 上的私有包                                                                                                                       |
|    public     | 外部静态文件目录，包含一个主页 index.html，外部 js 库文件 lib 目录，不需要通过 less 或者 vue 引用的 images 文件夹，以及外部配置文件夹 config 等 |
|      src      | 源码路径，进行开发工作的文件目录                                                                                                                |
| vue.config.js | vue 项目配置文件                                                                                                                                |
| package.json  | node 项目配置文件，包含常用的引用等                                                                                                             |

> src 源码目录：

| 文件/目录  | 描述                                                                  |
| :--------: | --------------------------------------------------------------------- |
|   assets   | 静态资源目录，需要通过模块引用的，包含一个 img 图片和 styles 样式目录 |
|  plugins   | vue 相关技术集成目录，如 iviewUI 框架，axios 以及一些自定义插件等     |
|   router   | 路由配置目录                                                          |
|   store    | vuex 状态仓库目录                                                     |
|   utils    | 公用 js 工具目录                                                      |
| components | 公共组件目录，这里组件应该都是没有任何业务关联的                      |
|  layouts   | 布局组件目录，规定界面的相关布局效果                                  |
|   views    | 业务组件目录，这里是主要业务系统开发的文件路径                        |
|  App.vue   | 初始化组件，这里会进行相关配置项的读取操作                            |

## 默认配置

---

> vue 项目配置：

```js
[import]: vue.config.js
```

> vue 相关插件配置（可在 plugins 相关路径进行查看）：

-   **_axios 配置_**

```js
[import]: src/plugins/axios.js
```

-   **_iview 配置_**

```js
[import]: src/plugins/iview.js
```

### 运行流程

> webpack 运行逻辑：

1. 读取配置项，即 vue.config.js 文件
2. 从主入口开始读取文件，默认为 main.js
3. 分析相关依赖，对不同的文件选用不同的 loader 进行处理
4. webpack 输出编译后的文件到 output 指定的目录，默认为 dist
5. 相关静态文件处理插件运行，如为 html 模板绑定指定的 title 和添加 js 引用

> vue-project-template 渲染流程和标准 vue 项目渲染流程一致，只是新增了配置项的读取：

1. 打开浏览器，main.js 运行，进行相关 vue 插件项的初始化

```js
[import]: src/main.js
```

2. App.vue 读取外部配置，并绑定 CONFIG 对象（可选），初始化完毕后渲染匹配的路由界面，渲染指定的 layout 和界面

```vue
[import]: src/App.vue
```

3. 界面渲染完毕

# 进阶

## 编码风格规范

vue-project-template 内部集成了 `eslint + prettier`

`eslint` 用来控制语法规则，不合规则的语法将不会通过编译  
`prettier` 是一个代码格式化工具，用来统一代码开发风格；同样的，不符合 perttier 风格的写法不会通过编译

通过运行 `npm lint` 可以修复简单的不合规范的写法，并提示出相关代码错误  
如果使用 vscode 开发工具，建议安装 eslint 和 prettier 插件，这样就可以直观在开发界面显示错误

> _如果是 vscode 编译器，在配置项中添加以下选项，就可以在保存文件的时候自动修复代码_

```json
  "editor.codeActionsOnSave": {
    // For ESLint
    "source.fixAll.eslint": true,
    // For TSLint
    "source.fixAll.tslint": true,
    // For Stylelint
    "source.fixAll.stylelint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
```

---

### 命名规范

-   **_文件夹_**

    -   对外输出的文件夹（内部存在一个 index.js 文件）统一采用以下命名，例：_`theme-api`_
    -   模块文件夹内部命名，可以根据喜好决定自己的命名风格

-   **_js 文件_**

    -   文件命名，一般工具集，例： _`miscUtil.js`_
    -   文件命名，类文件，例：_`Layer.js`_
    -   外部常量命名，例：_`const __VERSION_NUMBER__ = 1.00`_
    -   局部常量命名，例：_`const VERSION_NUMBER = 1.00`_ 或<br /> _`const VersionNumber = 1.00`_ 或<br /> _`const versionNumber = 1.00`_
    -   局部变量，例：_`let variableValue = 1.00;`_
    -   方法命名，例：_`function deepCopy() {}`_

-   **_vue 文件_**

    -   文件命名，例 _`MyButton.vue`_
    -   其他规范，请看**组件的定义和使用**

-   **_less，css 等样式文件_**
    -   文件命名，例 _`my-button.less`_
    -   id class 等命名，例 _`class = 'my-button'`_
    -   变量命名，例 _`@base-url: '~@/assets/';`_
    -   方法命名，例 _`@mix-style(@url) { }`_

> 命名规范目前没有良好的工具进行校验，只有通过各位的坚持  
> _形成良好的命名规范，可以让代码更加具有辨识性，更好维护，还有很多好处等待各位自己发掘_

### 组件定义和使用

-   **单文件组件的定义**
    > vue 生命周期如下：编写 vue 组件的时候，建议参照 vue 的声明周期顺序进行代码编写，建议顺序如下
    >
    > -   `name，mixin，components` 等静态配置项
    > -   `provide，store` 等对子组件提供数据的配置项
    > -   `props，inject，data，computed，watch`等数据源，参考顺序为从<br />`[外部数据] --> [内] --> [计算属性] --> [数据监视]`
    > -   `beforeCreate --> created --> beforeMount --> mounted --> beforeUpdate --> updated --> beforeDestroy --> destroyed`生命周期方法编写
    > -   `methods`方法和接口的编写

![vue生命周期](@/assets/img/lifecycle.png)

```vue
[import]: src/components/Custom.vue
```

-   **组件的定义和使用**

```vue

```

### 编码风格

## vue 插件开发

---

## 相关技术使用实践

---
