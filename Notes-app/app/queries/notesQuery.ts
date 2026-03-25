import { useQuery } from "@tanstack/react-query";
import { getAllNotes } from "../backend/notes";

//Creating a custom hook
export const useNoteList = () => {
  return useQuery({
    queryKey: ["notes"], //caching the data (very important)
    queryFn: getAllNotes,
  });
};
