import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompt, setPrevPrompt] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");


  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 60 * index);
  };

  const onSent = async (e, prompt) => {
    e.preventDefault();
    setResultData("");
    setLoading(true);
    setShowResult(true);

    const currentPrompt = prompt !== undefined ? prompt : input;
    setRecentPrompt(currentPrompt);

    if (!prompt) {
      setPrevPrompt((prev) => [...prev, input]);
    }

    let response = await run(currentPrompt);

    const responseArray = response.split("**");

    const boldFormattedResponse = responseArray.map((item, index) => {
      return index % 2 !== 0 ? `<b>${item}</b>` : item;
  }).join("");

    const lineBreakFormattedResponse = boldFormattedResponse.split("*").join("</br>");
    const formattedResponseArray = lineBreakFormattedResponse.split(" ");
    
    for (let i = 0; i < formattedResponseArray.length; i++) {
      const nextWord = formattedResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
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
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
