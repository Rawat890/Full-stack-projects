import supabase from "./supabase";
export const getAllNotes = async () => {
  const { data, error } = await supabase.from("notes").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export type CreateNoteInput = {
  title: string;
  content: string;
};

export const createNotes = async ({ title, content }: CreateNoteInput) => {
  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, content }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteNotes = async (id: number) => {
  const { error } = await supabase.from("notes").delete().eq("id", 1);
  if (error) {
    throw new Error(error.message);
  }
};
