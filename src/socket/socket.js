import React from "react";
import socketio from "socket.io-client";

const SOCKET_URL = "https://pure-woodland-56426.herokuapp.com/";

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = React.createContext();
