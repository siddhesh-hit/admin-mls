import { useState, useEffect } from "react";

import { getApi } from "../services/axiosInterceptors";

const useFetch = (route) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getApi(route)
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
