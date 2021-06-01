import React, { useEffect, useState, useContext } from "react";
import { classes } from "./classes";
import logo from "../../assets/logo.svg";
import { useParams } from "react-router";
import Modal from "./../../components/Dialog/Dialog";
import { Link } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import Collapse from "./../../components/Collapse/Collapse";

import List from "./../../components/Listbox/Listbox";
import { SocketContext } from "./../../socket/socket";
import SplitPane from "react-split-pane";
import ResultPane from "./../../components/ResultPane/ResultPane";

function Workspace() {
  const { id } = useParams();
  const [enabled, setEnabled] = useState(false);
  const [codeValue, setCodeValue] = useState(
    `// Write or paste your code here`
  );
  const languages = [
    { name: "Javascript", key: "javascript" },
    { name: "Python", key: "python" },
    { name: "HTML", key: "html" },
    { name: "CSS", key: "css" },
    { name: "Typescript", key: "typescript" },
  ];

  const themes = [
    { name: "Light", key: "light" },
    { name: "Dark", key: "vs-dark" },
  ];
  const [selected, setSelected] = useState(languages[0]);
  const [theme, setTheme] = useState(themes[0]);
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("JOIN_ROOM", id);
    // socket.emit("MESSAGE", codeValue);
    socket.on("JOIN_ROOM", () => {
      socket.emit("MESSAGE", codeValue);
    });
    socket.on("MESSAGE", (msg) => {
      console.log("msg from server" + msg);
      setCodeValue(msg);
    });
    return () => socket.disconnect();
  }, [id]);

  return (
    <div className={classes.home}>
      <div className={classes.logo}>
        <Link to="/home">
          <img src={logo} alt="logo" className={classes.logoImg} />
        </Link>
        <span className="text-indigo-500 font-semibold">( {id} )</span>
      </div>
      <div className={classes.infoCtr}>
        <div className={classes.collapse}>
          <Collapse
            title="Room and workspace information"
            content={`Room id : ${id}`}
          />
        </div>

        <div className="md:ml-8 md:w-1/4 w-full mb-6">
          <List
            list={languages}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="md:ml-4 md:w-1/4 w-full">
          <List list={themes} selected={theme} setSelected={setTheme} />
        </div>
      </div>
      <div class="w-screen hidden md:block">
        <SplitPane split="vertical" minSize="50%" allowResize>
          <div className={classes.editor}>
            <Editor
              height="100vh"
              defaultValue="// Write or paste your code here "
              defaultLanguage="javascript"
              language={selected.key}
              theme={enabled ? "vs-dark" : "light"}
              value={codeValue}
              onChange={(val) => {
                setCodeValue(val);

                socket.emit("MESSAGE", val);
              }}
            />
          </div>

          <ResultPane code={codeValue} lang={selected.key} />
        </SplitPane>
      </div>
      <div class="w-screen md:hidden">
        <div className={classes.editor}>
          <Editor
            height="100vh"
            defaultValue="// Write or paste your code here "
            defaultLanguage="javascript"
            language={selected.name}
            theme={theme.key}
            value={codeValue}
            onChange={(val) => {
              setCodeValue(val);

              socket.emit("MESSAGE", val);
            }}
          />
        </div>

        <ResultPane code={codeValue} lang={selected.key} />
      </div>
    </div>
  );
}

export default Workspace;
