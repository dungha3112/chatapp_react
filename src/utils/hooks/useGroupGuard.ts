import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGroupByIdApi } from "../api";

export const useGroupGuard = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const controller = new AbortController();

  useEffect(() => {
    console.log("fetchung groups ...");
    setLoading(true);

    getGroupByIdApi(parseInt(id!))
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id]);

  return { loading, error };
};
