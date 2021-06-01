import React, { useEffect, useState, useContext } from "react";
import { classes } from "./classes";
import logo from "../../assets/logo.svg";
import { useParams, useHistory } from "react-router";
import Modal from "./../../components/Dialog/Dialog";
import { Link } from "react-router-dom";
import { getRoomId } from "./../../utils/roomIdGenerator";
import Spinner from "./../../components/Spinner/Spinner";
import { SocketContext } from "./../../socket/socket";
function Confirm() {
  const { path } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const [roomId, setRoomId] = useState(``);
  const [joinId, setJoinId] = useState(``);
  const history = useHistory();
  const socket = useContext(SocketContext);
  const createRoomButtonHandler = () => {
    history.replace(`/workspace/${roomId}`);
  };
  const joinRoomButtonHandler = () => {
    if (joinId.length < 6) return;
    history.replace(`/workspace/${joinId}`);
  };
  const createModalProps = {
    isOpen: isModalOpen,
    closeModal: () => setModalOpen(false),
    title: "Your room id",
    buttonText: "Go to workspace",
    mainContent: `Your room is created : ${roomId}`,
    buttonHandler: createRoomButtonHandler,
  };

  const onJoinIdChange = (e) => setJoinId(e.target.value);
  const JoinModalContent = () => {
    return (
      <input
        autofocus
        className={classes.joinInput}
        id="inline-full-name"
        type="text"
        placeholder="ex. abd-hjuy-pqr"
        value={joinId}
        onChange={onJoinIdChange}
      />
    );
  };
  const joinModalProps = {
    isOpen: isModalOpen,
    closeModal: () => setModalOpen(false),
    title: "Enter room id",
    buttonText: "Join",
    mainContent: <JoinModalContent />,
    buttonHandler: joinRoomButtonHandler,
  };

  const readyBtnHandler = async () => {
    let slug = await getRoomId();
    await setRoomId(slug);
    await setModalOpen(true);
  };
  return (
    <div className={classes.home}>
      <div className={classes.logo}>
        <Link to="/home">
          <img src={logo} alt="logo" className={classes.logoImg} />
        </Link>
      </div>

      <div className={classes.joinCtr}>
        <button className={classes.joinBtn} onClick={readyBtnHandler}>
          {path === "join" ? "Join with room id" : "Create new room"}
        </button>
        <div className={classes.joinDesc}>
          {path === "join"
            ? "Join existing room created by others"
            : "Create new room and share the id with others"}
        </div>
      </div>
      {path === "create" ? (
        <Modal {...createModalProps} />
      ) : (
        <Modal {...joinModalProps} />
      )}
    </div>
  );
}

export default Confirm;
