import { useEffect, useState } from "react";
import { getIdFromURL, getItems } from "../utils/utils";

const mapDict = {
  character: ["episode", "episode"],
  episode: ["characters", "character"],
  location: ["residents", "character"],
};

export const useLoadAdditionalInfo = (id, type) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ status: false, msg: "" });
  const [info, setInfo] = useState({});
  const [additionalData, setAdditionalData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getItems(id, type)
      .then((result) => {
        setInfo(result);
        return result[mapDict[type][0]].map((item) => getIdFromURL(item));
      })
      .then((ids) => getItems(ids, mapDict[type][1]))
      .then((result) => {
        if (result.id) {
          setAdditionalData([result]);
        } else {
          setAdditionalData(result);
        }
        setLoading(false);
      })
      .catch((err) => {
        setInfo({});
        setAdditionalData([]);
        setError({ status: true, msg: err.message });
        setLoading(false);
      });
  }, [id]);

  return { loading, info, error, additionalData };
};
