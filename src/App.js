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
    <div className="container">
      <h1 className="title">
        🛡️ Plagiarism & AI Detection System
      </h1>

      <div className="form-group">
        <label className="label">
          Analysis Type
        </label>

        <select
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
        <label className="label">
          Paste Content
        </label>

        <textarea
          className="text-area"
          placeholder="Paste content here..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label className="label">
          Upload File
        </label>

        <input
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
        className="analyze-btn"
        onClick={analyzeContent}
        disabled={loading}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Content"}
      </button>

      {result && (
        <div className="result-card">
          <h2 className="result-title">
            📊 Analysis Result
          </h2>

          <div className="result-item">
            <span>Plagiarism Score</span>
            <span>{result.plagiarismScore}%</span>
          </div>

          <div className="result-item">
            <span>Originality Score</span>
            <span>{result.originalityScore}%</span>
          </div>

          <div className="result-item">
            <span>AI Probability</span>
            <span>{result.aiProbability}%</span>
          </div>

          <div className="result-item">
            <span>Human Probability</span>
            <span>{result.humanProbability}%</span>
          </div>

          <div className="verdict">
            {getFinalVerdict(
              result.aiProbability
            )}
          </div>

          
        </div>
      )}
    </div>
  );
}

export default App;