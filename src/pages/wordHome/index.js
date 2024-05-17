import React from "react";
import { Layout, Button, Menu, Icon, Checkbox } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
const { SubMenu } = Menu;

const { Header, Footer, Sider, Content } = Layout;
import CET from "@/config/CET6.js";
import "./index.scss";

const splitArrayByLength = (arr, length) => {
  var result = [];
  while (arr.length > 0) {
    result.push(arr.splice(0, length));
  }
  return result;
};

const WordMainItem = (props) => {
  return (
    <div style={{ height: "100%" }}>
      <div className="item-word">
        <div className="item-word-left">{props.wordInfo.word}</div>
        <div className="item-word-right">
          <Checkbox></Checkbox>
        </div>
      </div>
      <div className="item-describe">
        {props.wordInfo.translations.map((trans) => {
          return (
            <div style={{ marginTop: "10px" }}>
              {trans.type + " " + trans.translation}
            </div>
          );
        })}
      </div>
    </div>
  );
};

class wordHome extends React.Component {
  constructor(props) {
    super(props);
    // console.log(CET);
    this.state = {
      showBox: "login", // 默认显示登录表单，可切换成注册表单
      cetModuleList: splitArrayByLength(CET, 20),
      mainConList: [],
    };
  }

  componentDidMount() {}

  componentWillUnmount() {}

  handleClick = ({ item, key, keyPath, domEvent }) => {
    console.log(this.state, item, key, keyPath, domEvent);
    const data = this.state.cetModuleList[Number(key)];
    // this.state
    this.setState({ mainConList: data });
  };

  render() {
    return (
      <Layout style={{ height: "100%" }}>
        <Header className="header">Header</Header>
        <Layout>
          <Sider className="sider">
            <Scrollbars autoHide>
              <Menu theme="light" onClick={this.handleClick}>
                {this.state.cetModuleList.map((e, index) => {
                  return (
                    <Menu.Item key={index}>
                      <span>第 {index + 1} 部分</span>
                    </Menu.Item>
                  );
                })}
              </Menu>
            </Scrollbars>
          </Sider>
          <Content>
            <Scrollbars autoHide>
              {/* 内容 */}
              <div className="word-main">
                {this.state.mainConList.map((item) => {
                  return (
                    <div className="word-main-item">
                      <WordMainItem wordInfo={item}></WordMainItem>
                    </div>
                  );
                })}
              </div>
            </Scrollbars>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default wordHome;
