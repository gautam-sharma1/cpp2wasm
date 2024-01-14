"use client"
import Editor from '@monaco-editor/react';
export default function _Editor({ defaultCode, defaultLanguage, width, handleCodeChange }) {
    // todo: width and height
    return <Editor height="40vh" width={width} defaultLanguage={defaultLanguage} defaultValue={defaultCode} onChange={handleCodeChange} />;
}