"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import defaultLanguageConstants from "@/app/lib/constants";
import _Editor from "@/app/components/Editor";
import CompileButton from "@/app/components/CompileButton";
import Button from "@/app/components/Button";
import Terminal from "@/app/components/Terminal";
import 'dotenv/config'

export default function Home() {
  const [state, setState] = useState([]);
  const [generatedJsCode, setGeneratedJsCode] = useState("");
  const [cppCode, setCppCode] = useState(defaultLanguageConstants.CPP.defaultCode);
  const [loading, setLoading] = useState(false);
  const [buildStatus, setBuildStatus] = useState(false);
  const [windowSize, setWindowSize] = useState(0);


  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleCppCodeChange(value) {
    setCppCode(value);
  }

  function handleJSCodeChange(value) {
    console.log("JS handler called");
  }

  async function handleDownloadJSCodeClick() {
    setLoading(true);
    setState({ "status": "warning", "text": "Recompiling and Downloading" });
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
      mode: 'cors', // Set the CORS mode
    };

    // Perform the POST request
    const response = await fetch(process.env.NEXT_PUBLIC_GCLOUD_CLOUD_RUN_DOWNLOAD_URL, options);
    console.log(response)
    if (!response.ok) {
      setState({ "status": "error", "text": "Error Downloading" });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Extract the filename from Content-Disposition header
    // Check if Content-Disposition header is present
    const contentDisposition = response.headers.get('Content-Disposition');
    const filename = contentDisposition ? contentDisposition.split('filename=')[1] || 'downloaded-file' : 'downloaded-file';

    // Create a Blob from the response
    const blob = await response.blob();

    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;

    // Append the anchor to the body and trigger a click
    document.body.appendChild(a);
    a.click();

    // Remove the anchor from the body
    document.body.removeChild(a);

    // Revoke the URL to free up resources
    window.URL.revokeObjectURL(url);

    setState({ status: "success", text: "File Downloaded Successfully ✅" });
    setLoading(false);
  }

  async function handleClick() {
    setLoading(true);
    setState({ "status": "warning", "text": "Compiling" });
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
      mode: 'cors', // Set the CORS mode
    };

    // Perform the POST request
    const response = await fetch(process.env.NEXT_PUBLIC_GCLOUD_CLOUD_RUN_COMPILE_URL, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();
    const output = res.compiled_output;
    if (output.status === "success") {
      console.log("setting compiled code");
      setGeneratedJsCode(output.compiled_code);
      setState({ "status": "success", "text": "Compiled Successfully! ✅" });
      setBuildStatus(true);
    } else {
      setState({ "status": "error", "text": output.error_message });
      setBuildStatus(false);
      //setError("Compilation failed"); // Set an error message if needed
    }
    setLoading(false);
  }


  return (
    <main className="flex flex-col items-center p-4 md:p-8 lg:p-12">
      <div className="flex flex-col sm:flex-row mb-10 md:mb-16 ">
        <div className="mx-auto sm:mx-4 md:mx-10 mt-6 sm:mt-0">  {/* Centered on small screens */}
          <h2 className="text-xl font-bold pb-4 sm:pb-6">C++ code editor</h2>
          <div className="border-indigo-500/100 rounded-lg border-4" style={{ display: " inline-block" }}>
            <_Editor
              defaultCode={defaultLanguageConstants.CPP.defaultCode}
              defaultLanguage={defaultLanguageConstants.CPP.defaultLanguage}
              handleCodeChange={handleCppCodeChange}
              width={windowSize.width >= 640 ? "50vw" : windowSize.width >= 520 ? "80vw" : "100vw"} // Adjusted from "90vh" to be more responsive
            />
          </div>

          <div className="text-center py-4 sm:py-10">
            <CompileButton handleClick={handleClick} />
          </div>
          {loading ? (<span className="loading loading-spinner loading-md"></span>) : <></>}
          <div className="divider divider-primary"></div>
          <h2>Build Output</h2>
          <div style={{ overflow: "hidden", display: "inline-block" }}>
            <div className="w-full md:w-96 p-4 border-white border-2 overflow-auto">
              <Terminal input={state} />
            </div>
          </div>
        </div>

        <div className="mx-auto sm:mx-4 md:mx-10 mt-6 sm:mt-0"> {/* Centered on small screens */}
          <h2 className="text-xl font-bold pb-4 sm:pb-6">JS generated code</h2>
          <div className="rounded-lg border-4" style={{ display: " inline-block" }}>
            <_Editor
              key={generatedJsCode}
              defaultCode={generatedJsCode}
              defaultLanguage={defaultLanguageConstants.JS.defaultLanguage}
              handleCodeChange={handleJSCodeChange}
              width={"30vw"} // Adjusted from "55vh" to be more responsive
            />
          </div>

          <div className="text-center py-4 sm:py-10">
            {!loading ? <Button handleClick={handleDownloadJSCodeClick} text={"Download JS code"} disabled={!buildStatus} /> : <></>}
          </div>
        </div>
      </div>
    </main >

  );
}
