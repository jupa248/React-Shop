/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TApiResponse } from "../../Models/types";
import axios from "axios";

export const useFetchPLP = (url: string): TApiResponse => {
  const [status, setStatus] = useState<Number>(0);
  const [statusText, setStatusText] = useState<String>("");
  const [data, setData] = useState<string>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const getData = async () => {
    setLoading(true);
    try {
      const apiResponse = await axios.get(url);
      setStatus(apiResponse.status);
      setStatusText(apiResponse.statusText);
      setData(apiResponse.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return { status, statusText, data, error, loading };
};

export default useFetchPLP;
