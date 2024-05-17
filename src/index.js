import "babel-polyfill";
import React from "react";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import getRouter from "@/router/router";
import store from "./redux/store";
import "@/common/css/reset.scss";
import "@/common/font/iconfont.css";
// import '@/style/index.less'

function handleResize() {
  store.dispatch({
    type: "WINDOWWIDTH",
    width: window.innerWidth,
  });
  // console.log(store.getState().userStore.windowWidth);
}

window.addEventListener("resize", handleResize);

ReactDom.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>{getRouter()}</ConfigProvider>
  </Provider>,
  document.getElementById("app")
);
