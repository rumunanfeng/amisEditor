import { defineConfig } from 'umi';
import path from 'path';
import MonacoWebpackPlugin from 'monaco-editor-webpack-plugin';

export default defineConfig({
  history: {
    type: 'hash',
  },
  base: '/',
  publicPath: './',
  hash: true,
  nodeModulesTransform: {
    type: 'none',
  },
  antd: {
    dark: true,
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  chunks: ['main'],
  styleLoader: {},
  outputPath: './dist',
  plugins: [path.join(__dirname, 'plugin')],
  externals: {
    'monaco-editor': 'window.monacoEditor',
    'froala-editor': 'window.froalaEditor',
    // exceljs: 'window.exceljs',
    echarts: 'window.echarts',
  },
  styles: ['https://cdn.bootcdn.net/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'],
  chainWebpack(memo: any) {
    memo.plugin('monaco-editor-webpack-plugin').use(MonacoWebpackPlugin, [
      {
        languages: ['json'],
      },
    ]);
    // 过滤掉momnet的那些不使用的国际化文件
    memo
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locale$/, /zh-cn/];
      });
  },
  fastRefresh: {},
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8899,
  },
});
