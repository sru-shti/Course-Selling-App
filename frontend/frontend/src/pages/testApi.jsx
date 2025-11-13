import { useEffect } from "react";
import axiosInstance from "../api/axiosConfig";

function TestApi() {
  useEffect(() => {
    axiosInstance.get("/course")
      .then((res) => console.log("Data:", res.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return <h2>Testing API Connection...</h2>;
}

export default TestApi;
