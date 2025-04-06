import React from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";
import { useContext } from "react";

const Main = () => {
  const {
    onSent,
    setInput,
    input,
    showResults,
    loading,
    resultData,
    recentPrompt,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>StarLight AI ⭐</p>
        <img src={assets.starlight_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResults ? (
          <>
            <div className="greet">
              <p>
                <span>I am StarLight ⭐</span>
              </p>
              <br></br>
              <p>How Can I help you today?</p>
            </div>
            <div className='animation'>
            <img className="spin" src={assets.glowing_star_icon}></img>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.message_icon}></img>
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img className="spin" src={assets.glowing_star_icon}></img>
                <div className="chat-message" dangerouslySetInnerHTML={{ __html: resultData }}></div>
            </div>
          </div>
        )}
        <div className="main-bottom">
          <center>
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt"
            />
            <img onClick={() => onSent()} src={assets.send_icon} alt="" />
          </div>
          <p>Created by VJ_2303</p>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Main;
