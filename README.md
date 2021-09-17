## 1.创建项目
```js
mkdir antdesign
cd antdesign

yarn add webpack  webpack-cli webpack-dev-server  ts-loader  mini-css-extract-plugin  html-webpack-plugin css-loader babel-loader autoprefixer   @types/jest enzyme @types/enzyme classnames @types/classnames  @babel/preset-env @babel/preset-react  @babel/core  @babel/plugin-proposal-class-properties  @babel/plugin-proposal-decorators  less  less-loader postcss-loader  @types/react @types/react-dom  typescript --dev

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
    "skipLibCheck": true
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
	return <button>{props.children}</button>;
}

export default Button;
export {ButtonProps}
```