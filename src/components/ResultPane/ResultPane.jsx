import React, { useState, useEffect } from "react";
import classes from "./classes";
import Switcher from "./../Switch/Switch";
import ConsoleFeed from "./../Console/ConsoleFeed";
import runPython from "./../../services/pythonRunner";

function ResultPane({ code, lang }) {
  const [result, setResult] = useState({});

  const [autoRun, setAutoRun] = useState(true);
  const [opLoading, setOpLoading] = useState(false);
  const autoRunAllowedFor = ["javascript"];
  const getResult = async () => {
    try {
      console.log = function (a) {
        return a;
      };
      let output = await JSON.stringify(eval(code));

      await setResult({ data: output });
      console.log = window.console.log;
    } catch (e) {
      console.log = window.console.log;
      await setResult({ error: e });
    }
  };

  const DISABLED = autoRunAllowedFor.includes(lang) && autoRun;

  const getPythonOutput = async () => {
    try {
      setOpLoading(true);
      let resp = await runPython(code);
      if (!resp.data["Code Output"]) throw new Error("Errors in your code :(");
      await setResult({ data: resp.data["Code Output"] });
      setOpLoading(false);
    } catch (e) {
      await setResult({ error: e });
      setOpLoading(false);
    }
  };

  useEffect(() => {
    if (autoRun && lang === "javascript") {
      getResult();
    }
  }, [code]);

  const runProgram = () => {
    if (!autoRun && lang === "javascript") getResult();
    else if (lang === "python") getPythonOutput();
  };
  return (
    <div className={classes.resultCtr}>
      <div className={classes.title}>
        {result.error ? (
          <div className="font-semibold text-red-600 opacity-100">Error</div>
        ) : (
          <div className="font-semibold text-indigo-600">Output ({lang})</div>
        )}
        <div className="flex flex-wrap md:mt-0 mt-4 justify-between">
          <div
            className="text-purple-400 cursor-pointer mr-2"
            onClick={() => {
              setResult({});
            }}
          >
            clear
          </div>
          <button
            disabled={DISABLED}
            className={`${
              !DISABLED && "bg-indigo-500"
            } px-4 py-0.5  mr-1 text-white rounded-full focus:outline-none focus:ring-2 
              ring-indigo-500 ring-offset-white ring-offset-2 ${
                DISABLED && "bg-indigo-300 cursor-not-allowed"
              }`}
            onClick={runProgram}
          >
            Run ▶️
          </button>{" "}
          {autoRunAllowedFor.includes(lang) && (
            <Switcher
              enabled={autoRun}
              setEnabled={setAutoRun}
              label={"Auto-run"}
            />
          )}
        </div>
      </div>
      <div className="shadow-lg  rounded-lg h-full p-4 bg-white opacity-100">
        {lang === "html" && (
          <div>
            {" "}
            <iframe srcDoc={code} />
          </div>
        )}
        {lang === "css" && (
          <div>
            {"CSS output can be seen choosing HTML language and '<style>' tag"}
          </div>
        )}
        {["typescript"].includes(lang) && (
          <div>{"Typescript compiler support will be available soon..."}</div>
        )}
        {result.data && (
          <pre className="">
            {opLoading ? "Loading output..." : result.data}
          </pre>
        )}
        {result.error && (
          <div className="text-red-600">
            <div className="font-semibold">{result.error.name}</div>
            <div>{result.error.message}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResultPane;
