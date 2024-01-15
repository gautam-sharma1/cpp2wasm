"use client"
import Editor from '@monaco-editor/react';
export default function _Editor({ defaultCode, defaultLanguage, handleCodeChange, width }) {
    // todo: width and height
    return <div>
        <Editor height="70vh" width={width} defaultLanguage={defaultLanguage} defaultValue={defaultCode} onChange={handleCodeChange} />
    </div>

}