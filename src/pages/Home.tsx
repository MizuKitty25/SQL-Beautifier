import { Link } from "react-router-dom";
import "./Home.css";

const tools = [
  {
    to: "/sql-beautifier",
    emoji: "🧹",
    label: "SQL Beautifier",
    desc: "Format and prettify messy SQL queries instantly",
    meta: "formatter · syntax",
  },
  {
    to: "/text-diff",
    emoji: "🔍",
    label: "Text Difference Checker",
    desc: "Compare two texts and highlight exactly what changed",
    meta: "compare · diff",
  },
  {
    to: "/json-formatter",
    emoji: "📦",
    label: "JSON Formatter",
    desc: "Format, validate, and inspect JSON with ease",
    meta: "formatter · validator",
  },
  {
    to: "/base64",
    emoji: "🔐",
    label: "Base64 Encoder / Decoder",
    desc: "Encode or decode any string to and from Base64",
    meta: "encode · decode",
  },
];

export default function Home() {
  return (
    <div className="page">
      <div className="appContainer">
        <div className="homeHeader">
          <h1>Developer Toolkit</h1>
          <p className="homeTitle">
            Tools for <strong>everyday</strong> dev work.
          </p>
          <p className="homeSub">
            A focused set of in-browser utilities — no installs, no accounts.
          </p>
        </div>

        <div className="toolGrid">
          {tools.map((t) => (
            <Link to={t.to} className="toolCard" key={t.to}>
              <span className="cardEmoji">{t.emoji}</span>
              <div className="cardContent">
                <h2>{t.label}</h2>
                <p>{t.desc}</p>
              </div>
              <div className="cardMeta">{t.meta}</div>
              <span className="cardArrow">↗</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}