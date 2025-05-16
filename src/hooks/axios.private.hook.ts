import { axiosPrivate } from "@/libs/axios/axios.private";
import { setServers } from "dns";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAxiosPrivate = () => {
  const { data: session, status } = useSession();
  console.log("axios private", session);
  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers = config.headers ?? {};

        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user
            ?.accessToken!}`;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [session]);

  return axiosPrivate;
};

export default useAxiosPrivate;
