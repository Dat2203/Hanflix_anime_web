import { useQuery } from "react-query";
import { getSource } from "../../service/APIcall";
import { Source } from "../../interface";

const useFetchSource = (
  animeId: number,
  episodeIndex: number,
  enabled?: boolean
) => {
  return useQuery<Source>(
    ["source", { animeId, episodeIndex }],
    () => getSource(animeId, episodeIndex),
    { enabled }
  );
};

export default useFetchSource;
