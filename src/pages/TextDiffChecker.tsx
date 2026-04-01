import { useState } from "react";
import ReactDiffViewer from "react-diff-viewer-continued";
import "./TextDiffChecker.css";

export default function TextDiffChecker() {
  const [leftText, setLeftText] = useState("");
  const [rightText, setRightText] = useState("");

  const [compareLeft, setCompareLeft] = useState("");
  const [compareRight, setCompareRight] = useState("");
  const [splitView, setSplitView] = useState(true);

  const [showDiff, setShowDiff] = useState(false);

  const compareText = () => {
    setCompareLeft(leftText);
    setCompareRight(rightText);
    setShowDiff(true);
  };

  return (
    <div className="page">
      <div className="appContainer">
        <h1>Text Difference Checker</h1>

        <div className="editorContainer">
          
          {/* LEFT EDITOR */}
          <div className="editorWrapper">
            <div className="toolbar">Text Before</div>

            <textarea
              value={leftText}
              onChange={(e) => setLeftText(e.target.value)}
              placeholder="Paste first text..."
            />
          </div>

          {/* BUTTON */}
          <div className="middle">
  <button
    disabled={!leftText || !rightText}
    onClick={compareText}
  >
    COMPARE ➜
  </button>

  <button onClick={() => setSplitView(!splitView)}>
    {splitView ? "Unified View" : "Split View"}
  </button>
</div>

          {/* RIGHT EDITOR */}
          <div className="editorWrapper">
            <div className="toolbar">Text After</div>

            <textarea
              value={rightText}
              onChange={(e) => setRightText(e.target.value)}
              placeholder="Paste second text..."
            />
          </div>

        </div>

        {/* DIFF RESULT */}
        {showDiff && (
  <div className="diffWrapper">
    <ReactDiffViewer
      oldValue={compareLeft}
      newValue={compareRight}
      splitView={splitView}
      showDiffOnly={false}
      useDarkTheme={document.body.classList.contains("dark")}
    />
  </div>
)}

      </div>
    </div>
  );
}