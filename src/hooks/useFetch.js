import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getApiById } from "../services/axiosInterceptors";

const useFetch = (route) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const id = location.search.split("=")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getApiById(route, id)
          .then((res) => {
            if (res.data.success) {
              setData(res.data.data);
            }
          })
          .catch((err) => {
            throw new Error(err);
          });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export { useFetch };
