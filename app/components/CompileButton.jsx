"use client";
export default function CompileButton({ handleClick, isCompiling }) {
  return isCompiling ? (
    <button className="btn btn-primary">
      <span className="loading loading-spinner"></span>
      Compiling
    </button>
  ) : (
    <button onClick={handleClick} className="btn btn-primary">
      Compile
    </button>
  );
}
