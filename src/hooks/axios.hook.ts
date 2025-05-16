import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";

const useAxios = (config: AxiosRequestConfig) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios(config);
        setResponse(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [config]);

  return { response, error, loading };
};

export default useAxios;
