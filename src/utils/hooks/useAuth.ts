import { toast } from "react-toastify";
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
        toast.clearWaitingQueue();
        updateAuthUser(res?.data);
      })
      .catch((error) => {
        toast.clearWaitingQueue();
        console.log(error);

        // toast(String(error), { type: "error" });
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 1000);
      });

    return () => {
      controller.abort();
    };
  }, [updateAuthUser]);

  return { loading, user };
};
