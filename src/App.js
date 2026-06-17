import React, { useState } from "react";
import "./App.css";

function App() {
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [analysisType, setAnalysisType] = useState("script");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const getFinalVerdict = (aiProbability) => {
    const score = Number(aiProbability);

    if (score >= 80) {
      return "🤖 Likely AI Generated";
    }

    if (score >= 50) {
      return "⚡ Possibly AI Assisted";
    }

    return "👨‍💻 Likely Human Written";
  };

  const analyzeContent = () => {
    setLoading(true);

    setTimeout(() => {
      const aiScore = Math.floor(Math.random() * 100);
      const plagiarismScore = Math.floor(Math.random() * 40);

      setResult({
        plagiarismScore,
        originalityScore: 100 - plagiarismScore,
        aiProbability: aiScore,
        humanProbability: 100 - aiScore,
        matchedSources: [
          "Wikipedia Article",
          "Research Paper",
          "Internal Repository"
        ]
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <main className="container">
      <h1 className="title">
        🛡️ Plagiarism & AI Detection System
      </h1>

      <div className="form-group">
        <label
          htmlFor="analysisType"
          className="label"
        >
          Analysis Type
        </label>

        <select
          id="analysisType"
          className="select-box"
          value={analysisType}
          onChange={(e) =>
            setAnalysisType(e.target.value)
          }
        >
          <option value="script">
            Script / Document
          </option>

          <option value="code">
            Source Code
          </option>
        </select>
      </div>

      <div className="form-group">
        <label
          htmlFor="content"
          className="label"
        >
          Paste Content
        </label>

        <textarea
          id="content"
          className="text-area"
          placeholder="Paste content here..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label
          htmlFor="fileUpload"
          className="label"
        >
          Upload File
        </label>

        <input
          id="fileUpload"
          type="file"
          className="file-input"
          onChange={handleFileUpload}
        />

        {file && (
          <p className="file-name">
            📄 {file.name}
          </p>
        )}
      </div>

      <button
        type="button"
        className="analyze-btn"
        onClick={analyzeContent}
        disabled={loading}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Content"}
      </button>

      {result && (
        <section
          className="result-card"
          aria-live="polite"
        >
          <h2 className="result-title">
            📊 Analysis Result
          </h2>

          <div className="result-item">
            <span>Plagiarism Score</span>
            <span>
              {result.plagiarismScore}%
            </span>
          </div>

          <div className="result-item">
            <span>Originality Score</span>
            <span>
              {result.originalityScore}%
            </span>
          </div>

          <div className="result-item">
            <span>AI Probability</span>
            <span>
              {result.aiProbability}%
            </span>
          </div>

          <div className="result-item">
            <span>Human Probability</span>
            <span>
              {result.humanProbability}%
            </span>
          </div>

          <div className="verdict">
            {getFinalVerdict(
              result.aiProbability
            )}
          </div>

          <div className="sources">
            <h3>📚 Matched Sources</h3>

            <ul>
              {result.matchedSources.map(
                (source, index) => (
                  <li key={index}>
                    {source}
                  </li>
                )
              )}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;