import { useRouter } from "next/router";
import { destoryToken, isAuthenticated } from "./api";

const isAdmin = (WrappedComponent) => {
  // eslint-disable-next-line
  return (props) => {
    const role = parseInt(isAuthenticated());
    if (typeof window !== "undefined") {
      const Router = useRouter();
      if (!role) {
        Router.replace("/signin");
        destoryToken();
        return null;
      }

      if (role !== 2) {
        Router.replace("/signin");
        destoryToken();

        return null;
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default isAdmin;
