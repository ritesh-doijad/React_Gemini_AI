import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiAddLargeLine } from "react-icons/ri";
import { FiMessageSquare } from "react-icons/fi";
import { MdHelpOutline } from "react-icons/md";
import { RiHistoryLine } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { Context } from "../context/Context";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { prevPrompt, onSent, setRecentPrompt } = useContext(Context);
  const changeExtend = () => {
    setExtended((prev) => !prev);
  };

  const loadPrompt = async (e, prompt) => {
    e.preventDefault();
    setRecentPrompt(prompt);
    await onSent(e, prompt);
  };

  return (
    <div className="bg-[#1E1F20] max-w-64 inline-flex flex-col justify-between py-6 px-2 h-screen">
      <div className="top text-white">
        <span
          onClick={changeExtend}
          className="p-2.5 flex hover:bg-[#303131] cursor-pointer rounded-full justify-center items-center w-12 h-12"
        >
          <RxHamburgerMenu size="1.5em" />
        </span>
        <div className="inline-flex bg-[#1A1A1C] py-3 px-5  rounded-[50px] mt-10 gap-3 items-center text-[#666667]">
          <span>
            <RiAddLargeLine />
          </span>
          {extended && <p className="text-[14px] ">New chat</p>}
        </div>
        {extended && (
          <div className="recent mt-3 ">
            <p className="ml-3 text-[14px] mb-5">Recent</p>
            <div className="max-h-[45vh] result-overflow">
              {prevPrompt.map((item, index) => {
                return (
                  <div
                    onClick={(e) => loadPrompt(e, item)}
                    key={index}
                    className="flex items-center cursor-pointer gap-3 mt-1 hover:bg-[#303131] py-1.5 pl-4 pr-6 rounded-[50px]"
                  >
                    <span className="mt-1">
                      <FiMessageSquare />
                    </span>
                    <p>{item.slice(0, 22)} ...</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="bottom text-white mb-5">
        <div className="flex items-center gap-3 hover:bg-[#303131] py-1.5 pl-4 pr-6 rounded-[50px] mt-2">
          <span>
            <MdHelpOutline size="1.4em " />
          </span>
          {extended && <p className="text-[14px] ">Help</p>}
        </div>
        <div className="flex items-center gap-3 hover:bg-[#303131] py-1.5 pl-4 pr-6 rounded-[50px] mt-2">
          <span>
            <RiHistoryLine size="1.3em " />
          </span>
          {extended && <p className="text-[14px] ">Activity</p>}
        </div>
        <div className="flex items-center gap-3 hover:bg-[#303131] py-1.5 pl-4 pr-6 rounded-[50px] mt-2">
          <span>
            <IoSettingsOutline size="1.2em " />
          </span>
          {extended && <p className="text-[14px] ">Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
