import React, { useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { useState } from "react";
import { Context } from "../../context/context";

const Sidebar = () => {
  const [extented, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompts } = useContext(Context);

  function toggleSidebar() {
    setExtended(!extented);
  }

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={toggleSidebar}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div className="new-chat">
          <img className="plus" src={assets.plus_icon} alt="" />
          {extented ? <p>New Chat</p> : null}
        </div>
        {extented ? (
          <div className="recent">
            <p className="recent-title">Recent</p>
            {Array.isArray(prevPrompts) && prevPrompts.length > 0 ? (
              prevPrompts.map((item, index) => (
                <div className="recent-entry" key={index}>
                  <img src={assets.message_icon} alt="" />
                  <p>{item}</p>
                </div>
              ))
            ) : (
              <p>No recent prompts</p> // Optional: Display a message if there are no prompts
            )}
          </div>
        ) : null}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} />
          {extented ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} />
          {extented ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} />
          {extented ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
