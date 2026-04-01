import { useState } from "react";
import copyIcon from "../assets/copy.png";
import "./SqlBeautifier.css"; // reuse same layout
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

export default function JsonFormatter() {

  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");

  const highlightedJson = outputJson
    ? hljs.highlight(outputJson, { language: "json" }).value
    : "";

 const formatJson = () => {
  try {
    // First try standard JSON parse
    const parsed = JSON.parse(inputJson);
    setOutputJson(JSON.stringify(parsed, null, 2));
  } catch {
    try {
      // Fallback: evaluate as JS object (handles unquoted keys)
      const parsed = new Function("return (" + inputJson + ")")();
      setOutputJson(JSON.stringify(parsed, null, 2));
    } catch {
      setOutputJson("Invalid JSON");
    }
  }
};

const minifyJson = () => {
  try {
    const parsed = JSON.parse(inputJson);
    setOutputJson(JSON.stringify(parsed));
  } catch {
    try {
      const parsed = new Function("return (" + inputJson + ")")();
      setOutputJson(JSON.stringify(parsed));
    } catch {
      setOutputJson("Invalid JSON");
    }
  }
};

  const copyOutput = async () => {
    await navigator.clipboard.writeText(outputJson);
  };

  const getLineNumbers = (text = "") => {
    const lines = text.split("\n").length;
    return Array.from({ length: lines }, (_, i) => i + 1).join("\n");
  };

  return (
    <div className="page">
      <div className="appContainer">

        <h1>JSON Formatter</h1>

        <div className="editorContainer">

          {/* LEFT INPUT */}
          <div className="editorWrapper">
            <div className="toolbar">
              <span>Input</span>
            </div>

            <div className="editor">
              <pre className="lineNumbers">
                {getLineNumbers(inputJson)}
              </pre>

              <textarea
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder="Paste JSON here..."
              />
            </div>
          </div>

          {/* MIDDLE BUTTONS */}
          <div className="middle">
            <button onClick={formatJson}>FORMAT ➜</button>
            <button onClick={minifyJson}>MINIFY</button>
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
                {getLineNumbers(outputJson)}
              </pre>

              <div className="scrollArea">
                <pre className="codeOutput">
                  <code dangerouslySetInnerHTML={{ __html: highlightedJson }} />
                </pre>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}