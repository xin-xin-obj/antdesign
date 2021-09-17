## 1.创建项目
```js
mkdir antdesign
cd antdesign

yarn add webpack  webpack-cli webpack-dev-server  ts-loader  mini-css-extract-plugin  html-webpack-plugin css-loader babel-loader autoprefixer   @types/jest enzyme @types/enzyme classnames @types/classnames  @babel/preset-env @babel/preset-react  @babel/core  @babel/plugin-proposal-class-properties  @babel/plugin-proposal-decorators  less  less-loader postcss-loader  @types/react @types/react-dom  typescript @types/node --dev

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
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: babelConfig,
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelConfig
                    },
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                        }
                    },
                ],
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

### 2.2 tsconfig.json
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
export type { ButtonProps } from './button';
export { default as Button } from './button';
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
import React, { ButtonHTMLAttributes } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  
}
const Button: React.FC<ButtonProps> = (props:ButtonProps) => {
	let {children,...rest}=props;
	return <button {...rest}>{children}</button>;
}

export default Button;
export {ButtonProps}
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
<Meta title="介绍 /使用说明" />

## 介绍
这是一个React组件库

## 安装

npm install antdesign --save

## 使用


import 'antdesign/dist/antdesign.css';
import {Button} from 'antdesign';

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
  title: "Component/Button",
  component: Button
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button onClick={action("clicked")} {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: '按钮'
};
```