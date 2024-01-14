"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import defaultLanguageConstants from "@/app/lib/constants";
import _Editor from "@/app/components/Editor";
import CompileButton from "@/app/components/CompileButton";
import Terminal from "@/app/components/Terminal";

export default function Home() {
  const [state, setState] = useState([]);
  const [generatedJsCode, setGeneratedJsCode] = useState("");
  const [cppCode, setCppCode] = useState("");
  const [loading, setLoading] = useState(false);

  function handleCppCodeChange(value) {
    setCppCode(value);
  }

  function handleJSCodeChange(value) {
    console.log("JS handler called");
  }

  async function handleClick() {

    setState(["Compiling"]);

    // Data to be sent in the request body (can be an object or any valid JSON string)
    const data = {
      code: cppCode
    };

    // Headers to include in the request (optional)
    const headers = {
      'Content-Type': 'application/json',
      // Add any other headers if needed
    };

    // Configure the fetch options
    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data), // Convert the data to JSON format
    };

    // Perform the POST request
    const response = await fetch("/api/compile", options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    setLoading(true);
    const res = await response.json();
    const output = res.compiled_output;
    if (output.status === "success") {
      console.log("setting compiled code");
      setGeneratedJsCode(output.compiled_code);
      setState(["Compiled Successfully! ✅"]);
    } else {
      setState([output.error_message]);
      //setError("Compilation failed"); // Set an error message if needed
    }
    setLoading(false);
  }


  return (
    <main className="flex flex-col items-center p-24">
      <div className="flex flex-row mb-10">
        <div className="mx-10">
          <h2 className="text-2xl font-bold pb-6">C++ code editor</h2>
          <_Editor
            defaultCode={defaultLanguageConstants.CPP.defaultCode}
            defaultLanguage={defaultLanguageConstants.CPP.defaultLanguage}
            width={"80vh"}
            handleCodeChange={handleCppCodeChange}
          />
          <div className="text-center py-10">
            <CompileButton handleClick={handleClick} />
          </div>
          {loading ? (<span className="loading loading-spinner loading-md"></span>) : <></>}
          <div className="text-wrap max-w-8">
            <Terminal input={state} />
          </div>
        </div>

        <div className="mx-10">
          <h2 className="text-2xl font-bold pb-6">JS generated code</h2>
          <_Editor
            key={generatedJsCode}
            defaultCode={generatedJsCode}
            defaultLanguage={defaultLanguageConstants.JS.defaultLanguage}
            width={"40vh"}
            handleCodeChange={handleJSCodeChange}
          />
        </div>
      </div>
    </main>
  );
}
