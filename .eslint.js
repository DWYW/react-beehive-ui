module.exports = {
   "parser": "babel-eslint",
   "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
         "jsx": true,
         "experimentalObjectRestSpread": true,
         "modules": true
      }
   },
   "env": {
      "browser": true,
      "node": true,
      "es6": true
   },
   "plugins": [
      "react"
   ],

   "globals": {
      // "WeixinJSBridge": true,
      // "wx": true
   },

   "rules": {
      //监测错误的代码
      "no-redeclare": 1, //不允许重声名
      "no-undef": 2, //不允许使用未定义的，排除在globals中定义过的
      "no-dupe-args": 1, //禁止重复参数
      "no-dupe-keys": 1, //禁止重复键值
      "no-duplicate-imports": 1, //禁止引入重复的模块

      //不符合规范的书写 code style
      "no-extra-semi": 1, //禁止不必要的分号
      "no-unused-vars": 1, //禁止未使用的变量
      "indent": [1, 3], //缩进 (注意 switch 语句)
      "key-spacing": 1, //键值对的格式 ，（使用后  style={{width:'3px'}}也会报错，需要有空格）
      "object-curly-spacing": [1, "never"], //{}开始和结束前不允许有空格
      "no-useless-computed-key": 1, //禁止object计算键
      "semi-style": [1, "last"], //执行语句分号的位置 last在句末，first在开头
      // "space-infix-ops": 1, //运算符左右有空格
      "switch-colon-spacing": 1, //switch 语句 冒号 左右间隔  default {"after": true, "before": false}
      "space-unary-ops": [1, {
         "words": true,
         "nonwords": false
      }], //对一元运算符的间隙限制
      "camelcase": [1, {
         "properties": "always"
      }], //驼峰命名
      "no-multiple-empty-lines": [1, {
         max: 1
      }], //最大空行数
      "no-trailing-spaces": [1, {
         "skipBlankLines": true
      }], //不允许行末空格
      "semi-spacing": [1, {
         "before": false,
         "after": true
      }], //分号的前面不允许空格，后面需要有空格

      //about react eslint
      "react/jsx-uses-vars": 1,//未使用的引用  需要开启 no-unused-vars
      "react/jsx-uses-react": 1,//https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-uses-react.md  需要开启no-unused-var
      "react/jsx-key": 1, //使用key
      "react/jsx-no-duplicate-props": 1, //禁止重复的 props
      "react/no-unknown-property": 1, //禁止不正确的属性

      //code style react eslint
      "react/jsx-pascal-case": 1, //组件名称遵循pascal case 命名
      "react/jsx-curly-spacing": [1, {
         "when": "never"
      }],//jsx 里打括号开始和结束前不允许有空格
      "react/no-danger": 1, //warning dangerouslySetInnerHTML
      "react/jsx-filename-extension": [1, {
         "extensions": [".js", ".jsx"]
      }]
   }
}