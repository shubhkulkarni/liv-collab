import axios from "axios";

const runPython = async (code) => {
  return await axios.post(`https://flask-newapi.herokuapp.com/post`, { code });
};

export default runPython;
