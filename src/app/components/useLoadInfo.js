import { useEffect, useState } from "react";
import { getItems } from "../utils/utils";

export const useLoadInfo = (searchProps, type) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ status: false, msg: "" });
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    let fetchUrl = "";
    if (Object.keys(searchProps).length !== 0) {
      fetchUrl += "/?";
      const urlParams = new URLSearchParams();
      for (let key in searchProps) {
        urlParams.append(key, searchProps[key]);
      }
      fetchUrl += urlParams.toString();
    }
    getItems(fetchUrl, type)
      .then((result) => {
        setError({ status: false, msg: "" });
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setData([]);
        setError({ status: true, msg: err.message });
        setLoading(false);
      });
  }, [searchProps, type]);

  return { loading, data, error };
};
