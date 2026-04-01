import { useState } from "react";
import { format } from "sql-formatter";
import copyIcon from "../assets/copy.png";
import "./SqlBeautifier.css";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

export default function SqlBeautifier() {
  const [inputSql, setInputSql] = useState("");
  const [outputSql, setOutputSql] = useState("");
  const highlightedSql = outputSql
  ? hljs.highlight(outputSql, { language: "sql" }).value
  : "";
 
  
 const formatSql = (sql: string) => {
  sql = sql.replace(/:\w+/g, "1");
  let formatted = format(sql, {
    keywordCase: "upper",
    indentStyle: "standard"
  });

  formatted = formatted
    .replace(/\nFROM\s+/g, "\nFROM ")
    .replace(/\nWHERE\s+/g, "\nWHERE ")
    .replace(/\nGROUP BY\s+/g, "\nGROUP BY ")
    .replace(/\nHAVING\s+/g, "\nHAVING ")
    .replace(/\nORDER BY\s+/g, "\nORDER BY ");

  formatted = formatted.replace(/GROUP BY ([^,]+),\n\s+/g, "GROUP BY $1, ");

  formatted = formatted.replace(
    /\n\s+(LEFT|RIGHT|INNER|OUTER|FULL)?\s*JOIN/g,
    "\n$1 JOIN"
  );

  formatted = formatted.replace(
    /(JOIN\s+[^\n]+)\s+ON\s+/g,
    "$1\n  ON "
  );

  formatted = formatted
    .replace(/\bsum\(/gi, "SUM(")
    .replace(/\bcount\(/gi, "COUNT(")
    .replace(/\bavg\(/gi, "AVG(")
    .replace(/\bmin\(/gi, "MIN(")
    .replace(/\bmax\(/gi, "MAX(");

  formatted = formatted.replace(
    /(SUM|COUNT|AVG|MIN|MAX)\((.*?)\)\s+([a-zA-Z_]+)/g,
    "$1($2) AS $3"
  );

  formatted = formatted.replace(/[ \t]+$/gm, "");

  return formatted.trim();
};

const beautifySql = () => {
  try {
    const formatted = formatSql(inputSql);
    setOutputSql(formatted);
  } catch {
    setOutputSql("Invalid SQL");
  }
};

  const extractSqlFromAppend = () => {
  try {
    const matches = inputSql.match(/sb\.append\("([\s\S]*?)"\);?/g);

    if (!matches) {
      setOutputSql("No sb.append() found");
      return;
    }

    const cleaned = matches
      .map(line =>
        line
          .replace(/sb\.append\("/, "")
          .replace(/"\);?/, "")
      )
      .join("");

    const formatted = formatSql(cleaned);

    setOutputSql(formatted);

  } catch {
    setOutputSql("Failed to extract SQL");
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
  <button onClick={extractSqlFromAppend}>EXTRACT SQL</button>
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

            <div className="scrollArea">
    <pre className="codeOutput">
      <code dangerouslySetInnerHTML={{ __html: highlightedSql }} />
    </pre>
  </div>
          </div>
        </div>

      </div>
    </div>
      </div>

  );
}