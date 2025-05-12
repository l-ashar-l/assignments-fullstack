import React from 'react';
import ResumeParser from './components/ResumeParser';

export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Intelligent Resume Parser</h1>
      <ResumeParser />
    </div>
  );
}
