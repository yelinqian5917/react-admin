import React from "react";
import { Layout, Button, Menu, Icon, Checkbox, Drawer } from "antd";
import { Scrollbars } from "react-custom-scrollbars";
import { connect } from "react-redux";
import store from "@/redux/store";

const Child = (props) => {
  const clickHandle = () => {
    props.giveEvent("给父组件的信息");
  };
  return (
    <div>
      <div>
        <button onClick={clickHandle}>子点击</button>
      </div>
    </div>
  );
};

class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  fatherEvent = (message) => {
    console.log("子组件给到的信息=", message);
  };
  render() {
    return (
      <div>
        <div>
          hellow
          <button>父</button>
          <Child giveEvent={this.fatherEvent}></Child>
        </div>
      </div>
    );
  }
}

export default Test;
