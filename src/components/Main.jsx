import React, { useContext, useEffect, useRef } from "react";
import "../index.css";
import { assets } from "../assets/assets";
import { LuImagePlus } from "react-icons/lu";
import { IoMicOutline } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { AiOutlineCompass } from "react-icons/ai";
import { FaRegLightbulb } from "react-icons/fa6";
import { FaCode } from "react-icons/fa";
import { Context } from "../context/Context";

const Main = () => {
  const {
    prevPrompt,
    setPrevPrompt,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
  } = useContext(Context);

  const resultContainerRef = useRef(null);

  useEffect(() => {
    if (resultContainerRef.current) {
      resultContainerRef.current.scrollTop =
        resultContainerRef.current.scrollHeight;
    }
  }, [resultData]);

  const cardData = [
    {
      text: "Find flights to Miami for New Years. What's the usual temperature then?",
      icon: <FaCode size="1.5em" />,
    },
    {
      text: "Create a 12-week study plan for learning a new language",
      icon: <FaRegLightbulb size="1.5em" />,
    },
    {
      text: "Explore new travel destinations",
      icon: <AiOutlineCompass size="1.5em" />,
    },
    {
      text: "Watch a tutorial on a specific topic",
      icon: <img className="w-6" src={assets.youtube_icon} alt="YouTube" />,
    },
  ];

  return (
    <>
      <div className="flex-1 relative ">
        <nav className="text-white flex justify-between items-center p-6 ">
          <p className=" text-[20px]">Gemini</p>
          <span>
            <img className="w-10 rounded-full" src={assets.user_icon} alt="" />
          </span>
        </nav>
        <div className=" p-6 max-w-[900px] m-auto max-h-[70vh]  result-overflow">
          {!showResult ? (
            <>
              <div className="">
                <h1 className="leading-none text-[56px] font-semibold text-[#444746]">
                  <span className="gradient-text">Hello, Ritesh</span>
                  <br />
                  How can I help you today?
                </h1>
              </div>
              <div className="flex justify-center items-center mt-16 gap-3">
                {cardData.map((card, index) => (
                  <div
                    key={index}
                    className=" relative text-white p-5 w-[200px] h-[200px] bg-[#1E1F20] rounded-xl hover:bg-[#282A2C]"
                  >
                    <p className=" text-[16px] ">{card.text}</p>
                    <div className=" absolute bottom-3 right-3 w-10 h-10 bg-[#131314] rounded-full flex justify-center items-center">
                      {card.icon}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div
              ref={resultContainerRef}
              className="text-white max-h-[65vh] result-overflow"
            >
              <div className="flex items-center gap-5 font-semibold text-[18px]">
                <img
                  className="w-10 h-10 rounded-full"
                  src={assets.user_icon}
                  alt=""
                />
                <p>{recentPrompt}</p>
              </div>
              <div className=" flex mt-10 pr-10">
                <img className="w-11 h-11" src={assets.gemini_icon} alt="" />
                {loading ? (
                  <div className="w-full ml-3 flex flex-col gap-2.5">
                    <hr className=" loading-color " />
                    <hr className=" loading-color " />
                    <hr className=" loading-color " />
                  </div>
                ) : null}
                <p
                  className="ml-5 text-[17px] leading-8 text-[#ECECEC]"
                  dangerouslySetInnerHTML={{ __html: resultData }}
                ></p>
              </div>
            </div>
          )}
        </div>
        <div className="search-div absolute bottom-8 left-1/2 transform -translate-x-1/2 p-6 w-[900px] m-auto">
          <form onSubmit={onSent}>
            <div className="w-full gap-2 flex bg-[#1E1F20] p-3 mt-8 rounded-[50px]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your prompt here"
                type="text"
                className=" bg-transparent p-2.5 pl-5 outline-none w-[85%] text-white"
              />
              <div className="flex items-center text-white">
                <span className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-[#282A2C]">
                  <LuImagePlus size="1.3em" />
                </span>
                <span className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-[#282A2C]">
                  <IoMicOutline size="1.5em" />
                </span>
                <span className="w-14 h-14 flex items-center justify-center rounded-full hover:bg-[#282A2C]">
                  <VscSend size="1.3em" />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Main;
