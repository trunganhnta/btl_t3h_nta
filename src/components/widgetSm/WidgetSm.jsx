import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import cat from "../../IMG/cat.jpg";

export default function WidgetSm() {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New join member</span>
      <ul className="widgetSmtList">
        <li className="widgetSmListItem">
          <img src={cat} alt="" className="widgetSmImg" />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anh</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Chi tiết
          </button>
        </li>
        <li className="widgetSmListItem">
          <img src={cat} alt="" className="widgetSmImg" />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anh</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            chi tiết
          </button>
        </li>
        <li className="widgetSmListItem">
          <img src={cat} alt="" className="widgetSmImg" />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anh</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Chi tiết
          </button>
        </li>
        <li className="widgetSmListItem">
          <img src={cat} alt="" className="widgetSmImg" />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">Anh</span>
            <span className="widgetSmUserTitle">Software Engineer</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            chi tiết
          </button>
        </li>
      </ul>
    </div>
  );
}
