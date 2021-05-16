import React, { useEffect, useState } from "react";
import { classes } from "./classes";
import logo from "../../assets/logo.svg";
import { useParams, useHistory } from "react-router";
import Modal from "./../../components/Dialog/Dialog";
import { Link } from "react-router-dom";

function Confirm() {
  const { path } = useParams();
  const [isModalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  const createModalProps = {
    isOpen: isModalOpen,
    closeModal: () => setModalOpen(false),
    title: "Your room id",
    buttonText: "Go to workspace",
    mainContent: "Your room is created : 12323455",
    buttonHandler: () => history.push("/workspace/12"),
  };
  const JoinModalContent = () => {
    return (
      <input
        class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        id="inline-full-name"
        type="text"
        value="Jane Doe"
      />
    );
  };
  const joinModalProps = {
    isOpen: isModalOpen,
    closeModal: () => setModalOpen(false),
    title: "Enter room id",
    buttonText: "Join",
    mainContent: <JoinModalContent />,
    buttonHandler: () => history.push("/workspace/12"),
  };

  const openModal = () => setModalOpen(true);
  return (
    <div className={classes.home}>
      <div className={classes.logo}>
        <Link to="/home">
          <img src={logo} alt="logo" className={classes.logoImg} />
        </Link>
      </div>

      <div className={classes.joinCtr}>
        <button className={classes.joinBtn} onClick={openModal}>
          {false ? (
            <>
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-500 inline"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Getting ready
            </>
          ) : (
            "Are you ready ?"
          )}
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
