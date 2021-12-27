import React from "react";
import { ArrowDownward } from "@mui/icons-material";
import "./featuredInfo.css"

export default function FeaturedInfo() {
  return (
    <div>
      <div className="featured">
        <div className="featuredItem">
          <div className="featuredTitle">Revanue</div>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">2$</span>
            <span className="featuredMoneyRate">
              -5.2 <ArrowDownward className="featuredIcon negative"/>
            </span>
          </div>
          <span className="featuredSub">Compared to last Month</span>
        </div>
        <div className="featuredItem">
          <div className="featuredTitle">Sales</div>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">2$</span>
            <span className="featuredMoneyRate">
              -5.2 <ArrowDownward className="featuredIcon negative" />
            </span>
          </div>
          <span className="featuredSub">Compared to last Month</span>
        </div>
        <div className="featuredItem">
          <div className="featuredTitle">Cost</div>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">2$</span>
            <span className="featuredMoneyRate">
              -5.2 <ArrowDownward className="featuredIcon"/>
            </span>
          </div>
          <span className="featuredSub">Compared to last Month</span>
        </div>
      </div>
    </div>
  );
}
