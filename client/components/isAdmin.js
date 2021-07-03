import { useRouter } from "next/router";
import { isAuthenticated } from "./api";

const isAdmin = (WrappedComponent) => {
  return (props) => {
    const role = parseInt(isAuthenticated());
    if (typeof window !== "undefined") {
      const Router = useRouter();
      if (!role) {
        Router.replace("/signin");
        return null;
      }

      if (role !== 2) {
        Router.replace("/signin");
        return null;
      }

      return <WrappedComponent {...props} />;
    }
    return null;
  };
};

export default isAdmin;
