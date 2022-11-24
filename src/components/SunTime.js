import React from "react";
import {Radiation} from "./Radiation";
import "./SunTime.scss";

// 日出日落
const SunTimeUI = ({
  time,
  mapData
}) => {
  return (
    <div className="suntime">
      <div className="content-title">农时分析</div>
      <Radiation className="radiation"/>
    </div>
  )
};
export const SunTime = SunTimeUI;