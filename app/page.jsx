"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import defaultLanguageConstants from "@/app/lib/constants";
import _Editor from "@/app/components/Editor";
import CompileButton from "@/app/components/CompileButton";
import Button from "@/app/components/Button";
import Terminal from "@/app/components/Terminal";
import ResizableEditors from "@/app/components/ResizableEditors";
import Code from "@/app/components/Code";
import Head from "next/head";
import "dotenv/config";

export default function Home() {
  const [state, setState] = useState([]);
  const [generatedJsCode, setGeneratedJsCode] = useState("");
  const [cppCode, setCppCode] = useState(
    defaultLanguageConstants.CPP.defaultCode
  );
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
    setState({ status: "warning", text: "Recompiling and Downloading" });
    // Data to be sent in the request body (can be an object or any valid JSON string)
    const data = {
      code: cppCode,
    };

    // Headers to include in the request (optional)
    const headers = {
      "Content-Type": "application/json",
      // Add any other headers if needed
    };

    // Configure the fetch options
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data), // Convert the data to JSON format
      mode: "cors", // Set the CORS mode
    };

    // Perform the POST request
    const response = await fetch(
      process.env.NEXT_PUBLIC_GCLOUD_CLOUD_RUN_DOWNLOAD_URL,
      options
    );
    console.log(response);
    if (!response.ok) {
      setState({ status: "error", text: "Error Downloading" });
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Extract the filename from Content-Disposition header
    // Check if Content-Disposition header is present
    const contentDisposition = response.headers.get("Content-Disposition");
    const filename = contentDisposition
      ? contentDisposition.split("filename=")[1] || "downloaded-file"
      : "downloaded-file";

    // Create a Blob from the response
    const blob = await response.blob();

    // Create an anchor element to trigger the download
    const a = document.createElement("a");
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
    setState({ status: "warning", text: "Compiling" });
    // Data to be sent in the request body (can be an object or any valid JSON string)
    const data = {
      code: cppCode,
    };

    // Headers to include in the request (optional)
    const headers = {
      "Content-Type": "application/json",
      // Add any other headers if needed
    };

    // Configure the fetch options
    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data), // Convert the data to JSON format
      mode: "cors", // Set the CORS mode
    };

    // Perform the POST request
    const response = await fetch(
      process.env.NEXT_PUBLIC_GCLOUD_CLOUD_RUN_COMPILE_URL,
      options
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const res = await response.json();
    const output = res.compiled_output;
    if (output.status === "success") {
      console.log("setting compiled code");
      setGeneratedJsCode(output.compiled_code);
      setState({ status: "success", text: "Compiled Successfully! ✅" });
      setBuildStatus(true);
    } else {
      setState({ status: "error", text: output.error_message });
      setBuildStatus(false);
      //setError("Compilation failed"); // Set an error message if needed
    }
    setLoading(false);
  }

  return (
    <>



      <main className="flex flex-col items-center p-4 md:p-8 lg:p-12 w-screen">
        <div className="w-full max-w-full">
          <ResizableEditors
            Editor1={
              <_Editor
                defaultCode={defaultLanguageConstants.CPP.defaultCode}
                defaultLanguage={defaultLanguageConstants.CPP.defaultLanguage}
                handleCodeChange={handleCppCodeChange}
                width={"60vw"} // Adjusted from "90vh" to be more responsive
              />
            }
            Editor2={
              <_Editor
                key={generatedJsCode}
                defaultCode={generatedJsCode}
                defaultLanguage={defaultLanguageConstants.JS.defaultLanguage}
                handleCodeChange={handleJSCodeChange}
                width={"40vw"} // Adjusted from "55vh" to be more responsive
              />
            }
          />
          <div className="text-center py-4 my-10 sm:py-10 flex justify-around ">
            <CompileButton handleClick={handleClick} isCompiling={loading} />
            {!loading ? (
              <Button
                handleClick={handleDownloadJSCodeClick}
                text={"Download JS and Wasm code"}
                disabled={!buildStatus}
              />
            ) : (
              <></>
            )}
          </div>

          <Terminal input={state} />
          <Code />
          <p>
            For more information on how to use the generated{" "}
            <u>Webassembly and JS code</u>, pleaser refer :
            <Link
              scroll={true}
              href="https://developer.mozilla.org/en-US/docs/WebAssembly"
            >
              {" "}
              <u>MDN Webassembly</u>
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
