import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MainLayout from "./components/MainLayout";
import SqlBeautifier from "./pages/SqlBeautifier";
import TextDiffChecker from "./pages/TextDiffChecker";
import JsonFormatter from "./pages/JsonFormatter";
import Base64Tool from "./pages/Base64Tool";
import { useState, useEffect } from "react";

function App() {
  const [dark, setDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const basename = import.meta.env.DEV ? "/" : "/SQL-Beautifier/";
  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route
          element={
            <MainLayout
              open={sidebarOpen}
              setOpen={setSidebarOpen}
              dark={dark}
              setDark={setDark}
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/sql-beautifier" element={<SqlBeautifier />} />
          <Route path="/text-diff" element={<TextDiffChecker dark={dark} />} />
          <Route path="/json-formatter" element={<JsonFormatter />} />
          <Route path="/base64" element={<Base64Tool />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;