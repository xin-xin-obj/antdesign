## 1.创建项目
```js
mkdir antdesign
cd antdesign

yarn add webpack  webpack-cli webpack-dev-server  ts-loader  mini-css-extract-plugin  html-webpack-plugin css-loader babel-loader autoprefixer   @types/jest enzyme @types/enzyme classnames @types/classnames  @babel/preset-env @babel/preset-react  @babel/core  @babel/plugin-proposal-class-properties  @babel/plugin-proposal-decorators  less  less-loader postcss-loader  @types/react @types/react-dom  typescript @types/node @babel/preset-typescript @babel/plugin-transform-runtime @babel/runtime --dev

yarn add react  react-dom 

```

## 2.配置项目
### 2.1 webpack.config.js
webpack.config.js
```js
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cwd = process.cwd();
const babelConfig = {
    presets: ['@babel/preset-react', '@babel/preset-env'],
    plugins: [
        [
            '@babel/plugin-proposal-decorators',
            {
                legacy: true,
            },
        ],
        '@babel/plugin-proposal-class-properties',
    ]
}
module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        antdesign: "./index.js"
    },
    output: {
        path:path.resolve('dist'),
        filename: "[name].js",
        library: 'antdesign',
        libraryTarget: 'umd'
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        alias: {
            'antdesign': cwd,
        }
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: ["autoprefixer"],
                            },
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: ["autoprefixer"],
                            },
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/i,
                type: 'asset'
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
    ]
};
```

### 2.2 .babelrc
.babelrc
```js
{
    "presets": ["@babel/preset-react", "@babel/preset-env","@babel/preset-typescript"],
    "plugins": [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime"
    ]
}
```

### 2.3 tsconfig.json
tsconfig.json
```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "antdesign": ["components/index.tsx"],
      "antdesign/es/*": ["components/*"]
    },
    "strictNullChecks": true,
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "jsx": "preserve",
    "noUnusedParameters": true,
    "noUnusedLocals": true,
    "noImplicitAny": true,
    "target": "es6",
    "lib": ["dom", "es2017"],
    "skipLibCheck": true,
    "types": ["node"]
  },
  "exclude": ["node_modules", "lib", "es"]
}
```

### 2.3 index.js
index.js
```js
module.exports = require('./components');
```

### 2.4 components\index.tsx
components\index.tsx
```js
import Button,{ButtonProps} from './button';
export default Button;
export { ButtonProps}
```

### 2.5 button\index.tsx
components\button\index.tsx
```js
import Button from './button';
export type { ButtonProps} from './button';
export default Button;
```

### 2.6 button\button.tsx
components\button\button.tsx
```js
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { children } = props;
  return <button type="button">{children}</button>;
};

export default Button;
export { ButtonProps };
```

## 3.安装Storybook
### 3.1 安装
```js
yarn add @storybook/react  @storybook/addon-actions  @storybook/addon-essentials @storybook/addon-links 
```

### 3.2 .storybook\main.js
.storybook\main.js
```js
module.exports = {
  "stories": [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
```

### 3.3 components\Welcome.stories.mdx
components\Welcome.stories.mdx

```md
<Meta title="组件总览/介绍" />

## 组件总览
antd 为 Web 应用提供了丰富的基础 UI 组件，我们还将持续探索企业级应用的最佳 UI 实践

## 通用
- Button 按钮
- Icon 图标
- Typography 排版

## 布局
- Divider 分割线
- Grid 栅格
- Layout 布局
- Space 间距

## 导航
- Affix 固钉
- Breadcrumb 面包屑
- Dropdown 下拉菜单
- Menu 导航菜单
- Pagination 分页
- PageHeader 页头
- Steps 步骤条

## 数据录入
- AutoComplete 自动完成
- Checkbox 多选框
- Cascader 级联选择
- DatePicker 日期选择框
- Form 表单
- InputNumber 数字输入框
- Input 输入框
- Mentions 提及
- Rate 评分
- Radio 单选框
- Switch 开关
- Slider 滑动输入条
- Select 选择器
- TreeSelect 树选择
- Transfer 穿梭框
- TimePicker 时间选择框
- Upload 上传

## 数据展示
- Avatar 头像
- Badge 徽标数
- Comment 评论
- Collapse 折叠面板
- Carousel 走马灯
- Card 卡片
- Calendar 日历
- Descriptions 描述列表
- Empty 空状态
- Image 图片
- List 列表
- Popover 气泡卡片
- Statistic 统计数值
- Tree 树形控件
- Tooltip 文字提示
- Timeline 时间轴
- Tag 标签
- Tabs 标签页
- Table 表格


## 反馈
- Alert 警告提示
- Drawer 抽屉
- Modal 对话框
- Message 全局提示
- Notification 通知提醒框
- Progress 进度条
- Popconfirm 气泡确认框
- Result 结果
- Spin 加载中
- Skeleton 骨架屏

## 其他
- Anchor 锚点
- BackTop 回到顶部
- ConfigProvider 全局化配置

```

### 3.3 package.json
package.json
```diff
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack serve",
+   "storybook": "start-storybook -p 6006",
+   "build-storybook": "build-storybook"
  },
}
```


## 4.编写Story
- [argtypes](https://storybook.js.org/docs/react/api/argtypes)

### 4.1 Welcome.stories.mdx
components\Welcome.stories.mdx
```mdx
<Meta title="Introduction/Welcome" />

## 介绍
这是一个React组件库

## 安装

npm install antdesign --save

## 使用

import 'antdesign/dist/antdesign.css';
import {Button} from 'antdesign';

```

### 4.2 button.stories.tsx
components\button\button.stories.tsx
```js
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import Button from ".";

export default {
  title: "通用/Button按钮",
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button onClick={action("clicked")} {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: '按钮'
};
```

## 5.单元测试
- [configuration](https://jestjs.io/docs/configuration)
- [code-transformation](https://jestjs.io/docs/code-transformation)

### 5.1 安装依赖
```js
yarn add @wojtekmaj/enzyme-adapter-react-17
```

### 5.2 package.json
```diff
{
  "scripts": {
    "build": "webpack",
    "dev": "webpack serve",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
+   "test": "jest --config .jest.js"
  }
}
```

### 5.3 .jest.js
.jest.js
```js
module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    setupFiles: ['./tests/setup.js']
};
```

### 5.4 tests\setup.js
tests\setup.js
```js
const React = require('react');
const Enzyme = require('enzyme');

const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')
Enzyme.configure({ adapter: new Adapter() });
```

### 5.5 index.test.tsx
components\button\__tests__\index.test.tsx
```js
import React from 'react';
import { mount } from 'enzyme';
import Button from '..';
describe('Button', () => {
    it('mount correctly', () => {
        expect(() => mount(<Button>Follow</Button>)).not.toThrow();
    });
})
```

## 6.集成测试和代码覆盖率
### 6.1 安装依赖
```js
yarn add puppeteer jest-environment-puppeteer @types/puppeteer @types/jest-environment-puppeteer jest-puppeteer  jest-image-snapshot @types/jest-image-snapshot @babel/runtime --dev
```

### 6.2 e2e.jest.js
```js
module.exports = {
    verbose: true,
    testEnvironment: 'jest-environment-puppeteer',
    setupFiles: ['./tests/setup.js'],
    preset: 'jest-puppeteer',
    testMatch:["**/e2e/**/*.(spec|test).(j|t)sx"]
};
```

### 6.3 unit.jest.js
unit.jest.js
```js
module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    testMatch:["**/unit/**/*.(spec|test).(js|ts|jsx|tsx)"],
    collectCoverage:true,
    collectCoverageFrom:[
    'components/**/*.(js|ts|jsx|tsx)',
    '!components/**/*.stories.(js|ts|jsx|tsx)',
    "!components/**/*.(spec|test).(js|ts|jsx|tsx)"
    ]
};
```

### 6.4 jest-puppeteer.config.js
jest-puppeteer.config.js
```js
module.exports = {
    launch: {
        dumpio: true,
        headless: process.env.HEADLESS !== 'false'
    },
    browserContext: 'default'
}
```

### 6.5 unit\index.test.tsx
components\button\unit\index.test.tsx
```js
import React from 'react';
import { mount } from 'enzyme';
import Button from '..';
describe('Button', () => {
    it('mount correctly', () => {
        expect(() => mount(<Button>Follow</Button>)).not.toThrow();
    });
})
```

### 6.6 snapshot.spec.tsx
components\button\e2e\snapshot.spec.tsx
```js
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Button from '..';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
const toMatchSnapshot = configureToMatchImageSnapshot({
  customSnapshotsDir: `${process.cwd()}/snapshots`,
  customDiffDir: `${process.cwd()}/diffSnapshots`,
});
expect.extend({ toMatchSnapshot });
describe('Button snapshot', () => {
  it('screenshot should correct', async () => {
    await jestPuppeteer.resetPage();
    await page.goto(`file://${process.cwd()}/tests/index.html`);
    const html = ReactDOMServer.renderToString(<Button>按钮</Button>);
    await page.evaluate(innerHTML => {
      document.querySelector('#root')!.innerHTML = innerHTML;
    }, html);
    const screenshot = await page.screenshot();
    expect(screenshot).toMatchSnapshot();
  })
});
```

### 6.7 tests\index.html
tests\index.html
```js
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Amazing Antd</title>
    <style>
      body {
        border: 5px solid #1890ff;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## 7.eslint
### 7.1 安装
```js
yarn add @typescript-eslint/parser eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks and eslint-plugin-jsx-a11y eslint-config-airbnb
```

### 7.2 .eslintrc.js
.eslintrc.js

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb'
  ],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  rules:{
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': 0,
    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    'no-use-before-define': 0
  }
};
```

### 7.3 package.json
package.json

```diff
{
 "scripts": {
    "build": "webpack",
    "dev": "webpack serve",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "test:unit": "jest --config unit.jest.js",
    "test:e2e": "jest --config e2e.jest.js",
    "test": "npm run test:unit && npm run test:e2e",
+   "lint": "eslint --ext .js,.jsx,.ts,.tsx components/",
+   "lint:fix": "eslint --fix --ext .js,.jsx,.ts,.tsx components/"
  },
}
```

### 7.4 .eslintignore
.eslintignore
```js
components/**/e2e/*
components/**/unit/*
components/**/*.stories.*
```


## 8.prettier
### 8.1 安装依赖
```js
yarn add prettier eslint-config-prettier eslint-plugin-prettier
```

### 8.2 .eslintrc.js
.eslintrc.js
```diff
module.exports = {
  parser: '@typescript-eslint/parser',
+ extends: ['airbnb', 'prettier'],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
+ plugins: ['prettier'],
  rules: {
+   'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': 0,
    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    'no-use-before-define': 0,
  },
};
```

### 8.3 .prettierrc
.prettierrc
```json
{
  "singleQuote": true
}
```

### 8.4 button\index.tsx
components\button\index.tsx
```diff
+            const title = "hello";
```

### 8.5 .vscode\settings.json
.vscode\settings.json
```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "files.autoSave": "afterDelay"
}
```

## 9.editorconfig
### 9.1 .editorconfig
```js
# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*.{js,css}]
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
```