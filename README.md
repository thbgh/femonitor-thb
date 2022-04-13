# 前端异常监控 SDK

## Feature

- 监控 js 运行异常
- 监控接口请求异常
- 日志服务采用阿里云的SLS


## Install

```nodejs
npm i femonitor-thb
```

## Usage

```js
injectJsError; // 监控js运行异常
injectXHR; // 监控接口请求异常
startAll; //监控上述两种
```
