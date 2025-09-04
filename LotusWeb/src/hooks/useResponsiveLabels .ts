import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLabelCount } from "../store/slices/chartResponsiveSlice";

export const useResponsiveLabels = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let count = 13;

      if (width >= 1460) count = 13;
      else if (width >= 1360) count = 12;
      else if (width >= 1260) count = 11;
      else if (width >= 1160) count = 9;
      else if (width >= 1060) count = 9;
      else count = 8;

      dispatch(setLabelCount(count));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
};
