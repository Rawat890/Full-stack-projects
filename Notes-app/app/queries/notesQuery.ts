import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNotes, deleteNotes, getAllNotes } from "../backend/notes";

//Creating a custom hook
export const useNoteList = () => {
  return useQuery({
    queryKey: ["notes"], //caching the data (very important)
    queryFn: getAllNotes,
  });
};

// add notes - mutation i.e. add, delete, update
export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};

// delete notes
export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteNotes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
