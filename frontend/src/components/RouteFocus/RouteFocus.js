import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const RouteFocus = () => {
  const location = useLocation();

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (main) {
      main.focus();
    }
  }, [location.pathname]);

  return null;
};

export default RouteFocus;
