import { useRouter } from "next/router";
import { isAuthenticated, destoryToken } from "./api";

const isStaff = (WrappedComponent) => {
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

      if (role < 1) {
        Router.replace("/signin");
        destoryToken();
        return null;
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default isStaff;
