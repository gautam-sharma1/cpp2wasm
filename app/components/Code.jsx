import React from "react";

export default function Code() {
  return (
    <div className="my-10">
      <div
        tabIndex={0}
        className="collapse collapse-arrow border border-base-300 bg-base-200"
      >
        <div className="collapse-title">
          <div className="font-semibold mb-5">Example Usage</div>
        </div>
        <div className="collapse-content">
          <ul>
            <ol>
              Download the generated JS and wasm files and place it in your
              project directory
            </ol>

            <li>
              Add a {`<button>`} element as shown below, just above the first
              opening {`<script>`}{" "}
            </li>
            <pre data-prefix=">" className="text-warning">
              <code>{`<button id="mybutton">Run myFunction</button>`}</code>
            </pre>
            <br></br>
            <li>
              Now add the following code at the end of the first {`<script>`}{" "}
              element:
            </li>
            <pre className="text-success">
              <code>{`document.getElementById("mybutton").addEventListener("click", () => {
  alert("check console");
  const result = Module.ccall(
    "myFunction", // name of C function
    null, // return type
    null, // argument types
    null, // arguments
  );
});`}</code>
            </pre>
          </ul>
        </div>
      </div>
    </div>
  );
}
