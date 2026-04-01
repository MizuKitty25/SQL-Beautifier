import { useState } from "react";
import "./Base64Tool.css";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

 const encodeBase64 = () => {
  const encoded = btoa(
    new TextEncoder().encode(input)
      .reduce((data, byte) => data + String.fromCharCode(byte), "")
  );
  setOutput(encoded);
};

 const decodeBase64 = () => {
  try {
    const binary = atob(input);

    const bytes = Uint8Array.from(
      binary,
      (char) => char.charCodeAt(0)
    );

    const decoded = new TextDecoder().decode(bytes);

    setOutput(decoded);
  } catch {
    setOutput("Invalid Base64 string.");
  }
};

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="base64Tool">
      <h1>Base64 Encoder / Decoder</h1>

      <textarea
        className="inputBox"
        placeholder="Enter text or Base64..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="buttons">
        <button onClick={encodeBase64}>Encode →</button>
        <button onClick={decodeBase64}>Decode →</button>
        <button onClick={clearAll}>Clear</button>
      </div>

      <textarea
        className="outputBox"
        placeholder="Result..."
        value={output}
        readOnly
      />

      <button className="copyBtn" onClick={copyOutput}>
        Copy Output
      </button>
    </div>
  );
}