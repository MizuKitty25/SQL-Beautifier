import { useState } from "react";
import { format } from "sql-formatter";
import copyIcon from "./assets/copy.png";
import "./App.css";

export default function App() {
  const [inputSql, setInputSql] = useState("");
  const [outputSql, setOutputSql] = useState("");

  const beautifySql = () => {
    try {
      const formatted = format(inputSql);
      setOutputSql(formatted);
    } catch {
      setOutputSql("Invalid SQL");
    }
  };

  const copyOutput = async () => {
    await navigator.clipboard.writeText(outputSql);
  };

  const getLineNumbers = (text = "") => {
    const lines = text.split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  };

  return (
    <div className="page">
    <div className="appContainer">
    <h1>SQL Beautifier</h1>

      <div className="editorContainer">

        {/* LEFT INPUT */}
        <div className="editorWrapper">
          <div className="toolbar">
            <span>Input</span>
          </div>

          <div className="editor">
            <pre className="lineNumbers">
              {getLineNumbers(inputSql)}
            </pre>

            <textarea
              value={inputSql}
              onChange={(e) => setInputSql(e.target.value)}
              placeholder="Paste SQL here..."
            />
          </div>
        </div>

        {/* CENTER BUTTON */}
        <div className="middle">
          <button onClick={beautifySql}>FORMAT ➜</button>
        </div>

        {/* RIGHT OUTPUT */}
        <div className="editorWrapper">
          <div className="toolbar">
            <span>Output</span>

            <button className="iconBtn" onClick={copyOutput}>
              <img src={copyIcon} alt="copy" />
            </button>
          </div>

          <div className="editor">
            <pre className="lineNumbers">
              {getLineNumbers(outputSql)}
            </pre>

            <textarea
              value={outputSql}
              readOnly
              placeholder="Formatted SQL..."
            />
          </div>
        </div>

      </div>
    </div>
      </div>

  );
}