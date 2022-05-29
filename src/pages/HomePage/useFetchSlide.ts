import { useQuery } from "react-query";
import { getSlide } from "../../service/APIcall";

const useFetchSlide = () => {
  return useQuery("slides", getSlide);
};

export default useFetchSlide;
