import supabase from "./supabase";

const getAllNotes = async () => {
  const { data, error } = await supabase.from("notes").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const createNotes = async (title: string, content: string) => {
  const { data, error } = await supabase
    .from("countries")
    .insert({ title, content })
    .select()
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

const deleteNotes = async (id: number) => {
  const { error } = await supabase.from("notes").delete().eq("id", 1);
  if (error) {
    throw new Error(error.message);
  }
};

export default { createNotes, getAllNotes, deleteNotes };
