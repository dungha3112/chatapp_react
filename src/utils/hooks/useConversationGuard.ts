import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConversationByIdApi } from "../api";

export const useConversationGuard = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const controller = new AbortController();

  useEffect(() => {
    console.log("Fetching Conversation");
    setLoading(true);
    getConversationByIdApi(parseInt(id!))
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));

    return () => {
      controller.abort();
    };
  }, [id]);

  return { loading, error };
};
