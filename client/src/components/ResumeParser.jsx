import React, { useState } from 'react';
import './ResumeParser.css';

export default function ResumeParser() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleParse = async () => {
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:9000/api/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('Parsing failed');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  const handleInput = (e) => {
    if(text.length < 10) {
      setError('Input must be more than 10 characters');
    }
    else setError('');
    setText(e);
  }

  return (
    <div className="container">
      <h1 className="heading">Resume Parser</h1>
      <textarea
        className="textarea"
        placeholder="Paste your resume text here..."
        value={text}
        onChange={(e) => handleInput(e.target.value)}
      />
      <br />
      <button className="button" onClick={handleParse}>
        Parse Resume
      </button>

      {isLoading && <div className="spinner"></div>}

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="result-container">
          <h2 className="result-heading">Parsed Data</h2>
          <pre className="pre">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
