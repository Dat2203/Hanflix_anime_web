import { useQuery } from "react-query";
import { getInfo } from "../../service/APIcall";

const useFetchInfo = (slug: string) => {
  return useQuery(["info", slug], () => getInfo(slug));
};

export default useFetchInfo;
