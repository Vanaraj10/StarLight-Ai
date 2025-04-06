import { createContext } from "react";
import runChat from "../config/gemini"
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input,setInput]=useState('');
    const [recentPrompt,setRecentPrompt]=useState('');
    const [prevPrompt,setPreviousPrompt]=useState([]);
    const [showResults,setShowResults]=useState(false);
    const [loading,setLoading]=useState(false);
    const [resultData,setResultData]=useState('');


    function formatMarkdown(input) {
        // Escape HTML
        input = input
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      
        // Code block: ```
        input = input.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
      
        // Inline code: `code`
        input = input.replace(/`([^`]+)`/g, '<code>$1</code>');
      
        // Headings: ###, ##, #
        input = input.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        input = input.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        input = input.replace(/^# (.*$)/gim, '<h1>$1</h1>');
      
        // Bold: **text**
        input = input.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
        // Italic: *text*
        input = input.replace(/(?<!\*)\*(?!\*)(.*?)\*(?<!\*)/g, '<em>$1</em>');
      
        // Links: [text](url)
        input = input.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>');
      
        // Blockquotes: > text
        input = input.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
      
        // Ordered lists: 1. item
        input = input.replace(/^\d+\.\s(.*)/gm, '<li>$1</li>');
        input = input.replace(/(<li>.*<\/li>)/gms, '<ol>$1</ol>');
      
        // Unordered lists: - item
        input = input.replace(/^- (.*)/gm, '<li>$1</li>');
        input = input.replace(/(<li>.*<\/li>)/gms, '<ul>$1</ul>');
      
        // New lines to <br>, except inside <pre>
        input = input.replace(/(?<!<\/pre>)\n/g, '<br>');
      
        return input;
      }
      
    const onSent = async (prompt) => {
        setResultData('');
        setLoading(true); // Set loading to true before starting the async operation
        setShowResults(true);
        setRecentPrompt(input);
        setPreviousPrompt(prev => [...prev, input]);
    
        try {
            const response = await runChat(input);

            let formatted = formatMarkdown(response);
            setResultData(formatted);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setResultData("An error occurred while fetching the response.");
        } finally {
            setLoading(false);
            setInput('');
        }
    };
    const contextValue = {
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPreviousPrompt,
        showResults,
        setShowResults,
        loading,
        setLoading,
        resultData,
        setResultData,
        onSent
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;