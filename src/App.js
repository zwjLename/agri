import React from "react";
import "./App.less";
import "./App.scss";

import hightLight from "./imgs/light.png";
import target from "./imgs/target.png";
import moment from "moment";
import { Meteorology } from "./components/Meteorology";
import { MapComponent } from "./components/MapComponent";
import { TerminalManage } from "./components/TerminalManage";
import { TerminalData } from "./components/TerminalData";
import { SunTime } from "./components/SunTime";
import { connect } from "react-redux";
import { getTerminalStatus } from "./api/api";
import { temids } from "./components/const.tsx";

const WEEK = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
function App({ terminal }) {
  const [onlineNum, setOnlineNum] = React.useState(0); // 终端在线个数
  const [offlineNum, setOfflineNum] = React.useState(0); // 终端离线个数
  // 组件刚挂载时
  React.useEffect(() => {
    // 获取终端在线、离线个数
    getTerminalStatus({
      term_lst: temids,
    }).then((res) => {
      setOnlineNum(res.onnum);
      setOfflineNum(res.offnum);
    });
  }, []);
  return (
    <>
      <header>
        <div className="left">
          <div className="prefix-holder">
            <div className="header-pic-left"></div>
          </div>
          <div className="slash-holder"></div>
        </div>
        <div className="content flex-column">
          <div className="title">
            <div className="title-temp"> 江宁农业气象大数据可视化</div>
          </div>
          <div className="subtitle">
            <img src={target} className="ml10" alt="target"/>
            <div className="ml10">INTELLTGENT</div>
            <div className="ml20">JIANGNING</div>
            <div className="ml20">PRODUCT</div>
          </div>
        </div>

        <div className="right">
          <div className="slash-holder"></div>
          <div className="prefix-holder">
            <div className="header-pic-right"></div>
          </div>
        </div>
      </header>
      <img src={hightLight} className="hight-light" alt="highlight"/>
      <div className="main-content">
        <div className="left">
          <div className="flex-column main mt10">
            <div className="flex left-main-top">
              {/* 气象走势 */}
              <Meteorology />
            </div>
          </div>
        </div>
        <div className="left-slash-holder"></div>
        <div className="map">
          <div className="map-content mt20">
            <MapComponent />
          </div>
        </div>
        <div className="right-slash-holder"></div>
        <div className="right">
          <div className="flex-column main mt10">
            <div className="main-top ">
              <TerminalManage />
            </div>

            <div className="main-part-bottom">
              {terminal.terminalId ? <TerminalData /> : <SunTime />}
            </div>
          </div>
        </div>
      </div>
      <footer className="flex">
        <div className="left">
          <div className="line"></div>
        </div>
        <div className="left-slash-holder"></div>

        <div className="map flex flex-column">
          <div className="content-title flex flex-center">
            终端<span className="font-big">在线</span>：<span>{onlineNum}个</span>，<span className="font-big">离线</span>：
            <span>{offlineNum}个</span>
          </div>
          <div className="flex flex-center">
            <div>{moment().format("YYYY-MM-DD")}</div>
            <div className="ml10">{WEEK[moment().weekday()]}</div>
            <div className="ml10">{moment().format("HH:mm")}</div>
          </div>
        </div>
        <div className="right-slash-holder"></div>
        <div className="right">
          <div className="line"></div>
        </div>
      </footer>
    </>
  );
}

export default connect((state) => ({ terminal: state.terminal }))(App);
