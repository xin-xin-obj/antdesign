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
const path = require('path');
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
  ],
};
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    antdesign: './index.js',
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    library: 'antdesign',
    libraryTarget: 'umd',
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
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      antdesign: cwd,
    },
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
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
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['autoprefixer'],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
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
        type: 'asset',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
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
    "strictNullChecks": true,
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "jsx": "react",
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
import Button, { ButtonProps } from './button';
export default Button;
export type { ButtonProps };
```

### 2.5 button\index.tsx

components\button\index.tsx

```js
import Button from './button';
export type { ButtonProps } from './button';
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

## 3.安装 Storybook

### 3.1 安装

```js
yarn add @storybook/react  @storybook/addon-actions  @storybook/addon-essentials @storybook/addon-links
```

### 3.2 .storybook\main.js

.storybook\main.js

```js
module.exports = {
  stories: [
    '../components/**/*.stories.mdx',
    '../components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
};
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

## 4.编写 Story

- [argtypes](https://storybook.js.org/docs/react/api/argtypes)

### 4.1 Welcome.stories.mdx

components\Welcome.stories.mdx

```mdx
<Meta title="Introduction/Welcome" />

## 介绍

这是一个 React 组件库

## 安装

npm install antdesign --save

## 使用

import 'antdesign/dist/antdesign.css';
import { Button } from 'antdesign';
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
  setupFiles: ['./tests/setup.js'],
};
```

### 5.4 tests\setup.js

tests\setup.js

```js
const React = require('react');
const Enzyme = require('enzyme');

const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');
Enzyme.configure({ adapter: new Adapter() });
```

### 5.5 index.test.tsx

components\button\_\_tests\_\_\index.test.tsx

```js
import React from 'react';
import { mount } from 'enzyme';
import Button from '..';
describe('Button', () => {
  it('mount correctly', () => {
    expect(() => mount(<Button>Follow</Button>)).not.toThrow();
  });
});
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
  testMatch: ['**/e2e/**/*.(spec|test).(j|t)sx'],
};
```

### 6.3 unit.jest.js

unit.jest.js

```js
module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  setupFiles: ['./tests/setup.js'],
  testMatch: ['**/unit/**/*.(spec|test).(js|ts|jsx|tsx)'],
  collectCoverage: true,
  collectCoverageFrom: [
    'components/**/*.(js|ts|jsx|tsx)',
    '!components/**/*.stories.(js|ts|jsx|tsx)',
    '!components/**/*.(spec|test).(js|ts|jsx|tsx)',
  ],
};
```

### 6.4 jest-puppeteer.config.js

jest-puppeteer.config.js

```js
module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
  },
  browserContext: 'default',
};
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
});
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
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  rules: {
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'react/jsx-filename-extension': 0,
    // https://github.com/typescript-eslint/typescript-eslint/issues/2540#issuecomment-692866111
    'no-use-before-define': 0,
  },
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

## 10. git hook
- [cygwin](https://cygwin.com/install.html)

### 10.1 安装

```js
yarn add husky
```

### 10.1 pre-commit

```js
npx husky add .husky/pre-commit "npx lint-staged"
```

.lintstagedrc
```js
{
    "*.(js|ts|jsx|tsx)": "npm run lint"
}
```

### 10.2 commit-msg
```js
yarn add commitizen cz-customizable @commitlint/cli @commitlint/config-conventional
```

.cz-config.js
```js
module.exports = {
  types: [
    { value: "feat", name: "feat:一个新特性" },
    { value: "fix", name: "fix:修复BUG" },
  ],
  scopes: [{ name: "sale" }, { name: "user" }, { name: "admin" }],
};
```

commitlint.config.js
```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

### 10.2 pre-push
npx husky add .husky/pre-push "npm run test"


## 11 布署
### 11.1 babel.config.js
babel.config.js
```js
module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: true,
      },
    ],
    ['@babel/plugin-transform-runtime'],
  ],
};

```

### 11.2 .eslintignore
.eslintignore
```diff
components/**/e2e/*
components/**/unit/*
components/**/*.stories.*
+lib
+es
```

### 11.3 package.json
package.json
```diff
{
  "name": "antdesign",
  "version": "1.0.0",
  "description": "React组件的企业级UI设计",
+ "main": "lib/index.js",
+ "module": "es/index.js",
+ "unpkg": "dist/antd.js",
+ "typings": "lib/index.d.ts",
  "scripts": {
    "dev": "webpack serve",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "test:unit": "jest --config unit.jest.js",
    "test:e2e": "jest --config e2e.jest.js",
    "test": "npm run test:unit && npm run test:e2e",
    "lint": "eslint --ext .js,.jsx,.ts,.tsx components/",
    "lint:fix": "eslint --fix --ext .js,.jsx,.ts,.tsx components/",
    "prepare": "husky install",
+   "commit": "cz",
+   "compile": "rimraf es lib && gulp compile",
+   "dist": "rimraf dist && webpack",
+   "build":"npm run dist && npm run compile",
+   "prepublishOnly": "npm run test && npm run lint && npm run build"
  },
+ "homepage": "https://github.com/zhangrenyang/antdesign",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/zhangrenyang/antdesign.git"
  },
+ "files": [
+   "dist",
+   "es",
+   "lib"
+ ],
  "keywords": [
    "ant",
    "component",
    "components",
    "design",
    "framework",
    "frontend",
    "react",
    "react-component",
    "ui"
  ],
  "author": "zhangrenyang",
  "license": "MIT",
  "dependencies": {},
  "devDependencies": {
    "@types/jest-environment-puppeteer": "^4.4.1",
    "@types/puppeteer": "^5.4.4",
    "jest-puppeteer": "^5.0.4",
    "@babel/core": "^7.15.5",
    "@babel/plugin-proposal-class-properties": "^7.14.5",
    "@babel/plugin-proposal-decorators": "^7.15.4",
    "@babel/plugin-transform-runtime": "^7.15.0",
    "@babel/preset-env": "^7.15.6",
    "@babel/preset-react": "^7.14.5",
    "@babel/preset-typescript": "^7.15.0",
    "@babel/runtime": "^7.15.4",
    "@commitlint/cli": "^13.1.0",
    "@commitlint/config-conventional": "^13.1.0",
    "@storybook/addon-actions": "^6.3.8",
    "@storybook/addon-essentials": "^6.3.8",
    "@storybook/addon-links": "^6.3.8",
    "@storybook/preset-create-react-app": "^3.2.0",
    "@storybook/react": "^6.3.8",
    "@types/classnames": "^2.3.1",
    "@types/enzyme": "^3.10.9",
    "@types/jest": "^27.0.1",
    "@types/jest-image-snapshot": "^4.3.1",
    "@types/node": "^16.9.2",
    "@types/react": "^17.0.21",
    "@types/react-dom": "^17.0.9",
    "@typescript-eslint/parser": "^4.31.1",
    "@wojtekmaj/enzyme-adapter-react-17": "^0.6.3",
    "autoprefixer": "^10.3.4",
    "babel-loader": "^8.2.2",
    "commitizen": "^4.2.4",
    "css-loader": "^6.2.0",
    "cz-customizable": "^6.3.0",
    "enzyme": "^3.11.0",
    "eslint": "^7.32.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-config-prettier": "^8.3.0",
    "eslint-plugin-import": "^2.24.2",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-react": "^7.25.2",
    "eslint-plugin-react-hooks": "^4.2.0",
    "gulp": "^4.0.2",
    "gulp-babel": "^8.0.0",
    "gulp-cli": "^2.3.0",
    "gulp-typescript": "^6.0.0-alpha.1",
    "html-webpack-plugin": "^5.3.2",
    "husky": "^7.0.2",
    "jest": "^27.2.0",
    "jest-environment-puppeteer": "^5.0.4",
    "jest-environment-puppeteer-jsdom": "^4.3.1",
    "jest-image-snapshot": "^4.5.1",
    "less": "^4.1.1",
    "less-loader": "^10.0.1",
    "merge2": "^1.4.1",
    "mini-css-extract-plugin": "^2.3.0",
    "postcss-loader": "^6.1.1",
    "prettier": "^2.4.1",
    "pretty-quick": "^3.1.1",
    "puppeteer": "^10.2.0",
    "rimraf": "^3.0.2",
    "through2": "^4.0.2",
    "ts-loader": "^9.2.5",
    "typescript": "^4.4.3",
    "webpack": "^5.53.0",
    "webpack-cli": "^4.8.0",
    "webpack-dev-server": "^4.2.1"
  },
  "peerDependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}

```

### 11.4 .storybook\main.js
.storybook\main.js
```diff
module.exports = {
  "stories": [
    "../components/Introduction.stories.mdx",
    "../components/Install.stories.mdx",
    "../components/Components.stories.mdx",
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ]
}
```

### 11.5 .travis.yml
.travis.yml
```yml
language: node_js
node_js:
  - "stable"
cache:
  directories:
  - node_modules
env:
  - CI=true
script:
  - npm run build-storybook
deploy:
  provider: pages
  skip_cleanup: true
  github_token: $GITHUB_TOKEN
  local_dir: storybook-static
  on:
    branch: master
```

### 11.6 babel.config.js
babel.config.js
```js
module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: true,
      },
    ],
    ['@babel/plugin-transform-runtime'],
  ],
};

```

### 11.7 gulpfile.js
gulpfile.js
```js
module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: 'auto',
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 11'],
        },
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-typescript',
      {
        isTSX: true,
      },
    ],
    ['@babel/plugin-transform-runtime'],
  ],
};
```

### 11.8 components\Components.stories.mdx
components\Components.stories.mdx
```js
<Meta title="开始/组件总览" />

## 组件总览
antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。

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

### 11.9 components\index.tsx
components\index.tsx
```js
export { default as Button } from './button';
```

### 11.10 components\Install.stories.mdx
components\Install.stories.mdx
```js
<Meta title="开始/安装使用" />

## 安装
使用 npm 或 yarn 安装#
我们推荐使用 npm 或 yarn 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。


npm install antdesign --save



yarn add antd


## 浏览器引入
在浏览器中使用 script 和 link 标签直接引入文件，并使用全局变量 antdesign
我们在 npm 发布包内的 antdesign/dist 目录下提供了 antdesign.js 和 antdesign.css

## 示例


import { Button } from 'antdesign';
ReactDOM.render(<Button>按钮</Button>, mountNode);


引入样式：

import 'antd/dist/antdesign.css';

```

### 11.12  components\Introduction.stories.mdx
components\Introduction.stories.mdx
```js
<Meta title="开始/介绍" />

## Ant Design of React
antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。
```

### 11.13 umd\index.html
umd\index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="antdesign.js"></script>
</head>
<body>
    <div id="root"></div>
    <script>
        ReactDOM.render(React.createElement(antdesign.Button,null,'按钮'),document.getElementById('root'));
    </script>
</body>
</html>
```


##
- [在代码提交之前使用esLint校验代码](https://blog.csdn.net/visionke/article/details/92817269)
- [Leveraging Type-Only imports and exports with TypeScript 3.8](https://medium.com/javascript-in-plain-english/leveraging-type-only-imports-and-exports-with-typescript-3-8-5c1be8bd17fb)
- [Type-Only Imports and Export](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html)
- [ESLint 配置](https://www.jianshu.com/p/bf0ffe8e615a)
