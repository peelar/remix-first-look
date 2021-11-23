import { PostgrestResponse } from "@supabase/postgrest-js";
import { supabase } from "./utils/supabaseClient";

export type Remix = {
  id: string;
  created_at: string;
  name: string;
  song: string;
};

export const getRemixes = async ({ songId }: { songId: string }) => {
  return (await supabase
    .from("remixes")
    .select("*")
    .eq("song", songId)) as PostgrestResponse<Remix[]>;
};

export const getRemix = async ({ id }: { id: string }) => {
  return (await supabase
    .from("remixes")
    .select("*")
    .eq("id", id)) as PostgrestResponse<Remix>;
};

export type Song = {
  id: string;
  created_at: string;
  name: string;
};

export const getSongs = async () => {
  return (await supabase.from("songs").select("*")) as PostgrestResponse<
    Song[]
  >;
};

export const addRemix = async (remix: Omit<Remix, "id" | "created_at">) => {
  return await supabase.from("remixes").insert([
    {
      ...remix,
    },
  ]);
};
