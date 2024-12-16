import "./Header.css";
import React from "react";
import { LuBird } from "react-icons/lu";
import { FiBell, FiMessageSquare, FiUserPlus } from "react-icons/fi";
import { SiAdguard } from "react-icons/si";
import { AiOutlineHome, AiOutlineShop, AiOutlineComment } from "react-icons/ai";

import { useNavigate ,useLocation } from "react-router-dom";
import { AttentionSeeker } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";

export const Header = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  return (
    <div className="header">

        <SiAdguard
          onClick={() => navigate("/")}
          className="header-logo"
          size={30}
        />
    
      <p    className="header-logo-p" onClick={() => navigate("/")}>Scamless</p>

      <div className="header-center">
        <div className="header-search">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="header-buttons">
        <Tooltip id="home-tooltip" content="Home" place="bottom" />
          <AiOutlineHome
            onClick={() => navigate("/")}
            data-tooltip-id="home-tooltip"
            className={`header-icon ${isActive("/") ? "active-icon" : ""}`}
            size={30}
          />

          <Tooltip id="marketplace-tooltip" content="Marketplace" place="bottom" />
          <AiOutlineShop
            onClick={() => navigate("/marketplace")}
            data-tooltip-id="marketplace-tooltip"
            className={`header-icon ${isActive("/marketplace") ? "active-icon" : ""}`}
            size={30}
          />

          <Tooltip id="feedback-tooltip" content="Feedback" place="bottom" />
          <AiOutlineComment
            onClick={() => navigate("/feedback")}
            data-tooltip-id="feedback-tooltip"
            className={`header-icon ${isActive("/feedback") ? "active-icon" : ""}`}
            size={30}
          />
        </div>
      </div>

      <div className="header-right">
        <FiBell className="header-icon" size={20} />
        <FiMessageSquare className="header-icon" size={20} />
        <FiUserPlus className="header-icon" size={20} />
      </div>
    </div>
  );
};
