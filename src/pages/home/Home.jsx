import React from "react";
import Chat from "../../components/chart/Chat";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import TopBar from "../../components/topBar/TopBar";
import Sidebar from "../../components/sidebar/Sidebar";
export default function Home() {
  return (
    <div>
      <TopBar />
      <div className="container">
        <Sidebar />
        <div className="home">
          <FeaturedInfo />
          <Chat
            data={userData}
            title="Phân tích dữ liệu người dùng"
            grid
            dataKey="Active User"
          />
          <div className="homeWidgets">
            <WidgetSm />
            <WidgetLg />
          </div>
        </div>
      </div>
    </div>
  );
}
