import React from "react";
import { Layout, Button, Menu, Icon, Checkbox, Drawer } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import store from "@/redux/store";

const { SubMenu } = Menu;

const { Header, Footer, Sider, Content } = Layout;
import CET from "@/config/CET6.js";
import "./index.scss";

const WindowWid = window.innerWidth;

const splitArrayByLength = (arr, length) => {
  var result = [];
  while (arr.length > 0) {
    result.push(arr.splice(0, length));
  }
  return result;
};

const CetModule = splitArrayByLength(CET, 20);

const isPhoneShow = (visDom) => {
  if (store.getState().userStore.windowWidth < 800) {
    return visDom;
  } else {
    return "";
  }
  console.log(store.getState().userStore.windowWidth);
};

const isPhoneNotShow = (visDom) => {
  if (store.getState().userStore.windowWidth < 800) {
    return "";
  } else {
    return visDom;
  }
};

const WordMainItem = (props) => {
  const checkHandle = (e) => {
    props.checkboxChange(e, props.index);
  };
  return (
    <div style={{ height: "100%" }}>
      <div className="item-word">
        <div className="item-word-left">{props.wordInfo.word}</div>
        <div className="item-word-right">
          <Checkbox
            checked={props.wordInfo.checked}
            onChange={checkHandle}
          ></Checkbox>
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

const SideMenu = (props) => {
  return (
    <Menu
      theme="light"
      onClick={props.handleClick}
      selectedKeys={[props.current]}
    >
      {props.cetModuleList.map((e, index) => {
        return (
          <Menu.Item key={index}>
            <span>第 {index + 1} 部分</span>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

class wordHome extends React.Component {
  constructor(props) {
    super(props);
    // console.log(CET);
    this.state = {
      showBox: "login", // 默认显示登录表单，可切换成注册表单
      cetModuleList: CetModule,
      mainConList: CetModule[0],
      current: "0",
      WindowWid,
      collapsed: true,
      visible: false,
    };
  }
  componentWillMount() {
    console.log("载入阶段之前！");
  }

  componentDidMount() {
    console.log("载入阶段！");
  }

  componentWillUnmount() {}

  handleClick = ({ item, key, keyPath, domEvent }) => {
    console.log(this.state, item, key, keyPath, domEvent);
    const data = this.state.cetModuleList[Number(key)];
    this.setState({ mainConList: data });
    this.setState({ current: key });
  };

  handleDrawerClick = (menu) => {
    this.onClose();
    this.handleClick(menu);
  };

  toggleCollapsed = () => {
    this.setState({ collapsed: !this.state.collapsed });
    this.setState({ visible: !this.state.visible });
  };

  onClose = () => {
    this.setState({ visible: false });
  };

  checkboxChange = (event, index) => {
    console.log(event.target.checked);
    const content = this.state.mainConList.map((e, ind) => {
      if (index == ind) {
        return {
          ...e,
          checked: event.target.checked,
        };
      } else {
        return e;
      }
    });
    this.setState({ mainConList: content });
    // const =this.state.mainConList.findIndex((e) => e.word == word.word);
  };

  render() {
    console.log(">>>>>视图更新");
    return (
      <Layout style={{ height: "100%" }}>
        <Header className="header">
          {isPhoneShow(
            <Button
              type="primary"
              style={{ marginRight: "18px" }}
              onClick={this.toggleCollapsed}
            >
              <Icon type={this.state.collapsed ? "menu-unfold" : "menu-fold"} />
            </Button>
          )}
          Word Memory
        </Header>
        <Layout>
          <Sider
            className="sider"
            width={this.props.windowWidth < 800 ? 0 : "200px"}
          >
            <SideMenu
              current={this.state.current}
              cetModuleList={this.state.cetModuleList}
              handleClick={this.handleClick}
            ></SideMenu>
          </Sider>
          <Content>
            {/* 内容 */}
            <div className="word-main" key={this.state.current}>
              {this.state.mainConList.map((item, index) => {
                return (
                  <div className="word-main-item">
                    <WordMainItem
                      wordInfo={item}
                      checkboxChange={this.checkboxChange}
                      index={index}
                    ></WordMainItem>
                  </div>
                );
              })}
            </div>
          </Content>
        </Layout>
        {/* 遮挡层 */}
        <Drawer
          placement="left"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          width="40%"
        >
          <div className="w100 h100">
            <SideMenu
              current={this.state.current}
              cetModuleList={this.state.cetModuleList}
              handleClick={this.handleDrawerClick}
            ></SideMenu>
          </div>
        </Drawer>
      </Layout>
    );
  }
}

let mapStateToProps = (state) => ({
  windowWidth: state.userStore.windowWidth,
});

let mapDispatchToProps = (dispatch) => ({
  // login(username) {
  // 	dispatch(login(username));
  // }
});

export default connect(mapStateToProps, null)(wordHome);
// export default wordHome;
