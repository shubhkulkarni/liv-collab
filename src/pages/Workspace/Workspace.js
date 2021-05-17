import React, { useEffect, useState, useContext } from "react";
import { classes } from "./classes";
import logo from "../../assets/logo.svg";
import { useParams } from "react-router";
import Modal from "./../../components/Dialog/Dialog";
import { Link } from "react-router-dom";
import Editor, { useMonaco } from "@monaco-editor/react";
import Collapse from "./../../components/Collapse/Collapse";
import Switcher from "./../../components/Switch/Switch";
import List from "./../../components/Listbox/Listbox";
import { SocketContext } from "./../../socket/socket";

function Workspace() {
  const { id } = useParams();
  const [enabled, setEnabled] = useState(false);
  const [codeValue, setCodeValue] = useState(
    `// Write or paste your code here`
  );
  const languages = [
    { name: "javascript" },
    { name: "python" },
    { name: "html" },
    { name: "css" },
    { name: "typescript" },
  ];
  const [selected, setSelected] = useState(languages[0]);

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
      </div>
      <div className={classes.infoCtr}>
        <div className={classes.collapse}>
          <Collapse
            title="Room and workspace information"
            content={`Room id : ${id}`}
          />
        </div>

        <div className="md:ml-8 md:w-1/4 w-full">
          <List
            list={languages}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
        <div className="md:mt-0 mt-8 md:self-auto self-start">
          <Switcher enabled={enabled} setEnabled={setEnabled} label={""} />
        </div>
      </div>

      <div className={classes.editor}>
        <Editor
          height="100vh"
          defaultValue="// Write or paste your code here "
          defaultLanguage="javascript"
          language={selected.name}
          theme={enabled ? "vs-dark" : "light"}
          value={codeValue}
          onChange={(val) => {
            setCodeValue(val);

            socket.emit("MESSAGE", val);
          }}
        />
      </div>
    </div>
  );
}

export default Workspace;
