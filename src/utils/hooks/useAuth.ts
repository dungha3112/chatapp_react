import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getStatusApi } from "../api";

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { user, updateAuthUser } = useContext(AuthContext);
  const controller = new AbortController();

  useEffect(() => {
    getStatusApi()
      .then((res) => {
        updateAuthUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [updateAuthUser]);

  return { loading, user };
};
