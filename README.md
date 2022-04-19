# 前端异常监控 SDK

## Feature

- 监控 js 运行异常
- 监控资源加载异常
- 监控接口请求异常
- 监控页面性能指标
- 日志服务采用阿里云的 SLS

## Install

```nodejs
npm i femonitor-thb
```

## Usage

```js
injectJsError; // 监控js运行异常
injectXHR; // 监控接口请求异常
timing; //监控performance性能指标
startAll; //监控上述两种
```
