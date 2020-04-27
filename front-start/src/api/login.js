import axios from "@/util/request";

const getCode = sid => {
  return axios.get("/getCaptcha", {
    params: { sid }
  });
};

const forget = async option => {
  return axios.post("/forget", {
    ...option
  });
};

export { getCode, forget };
