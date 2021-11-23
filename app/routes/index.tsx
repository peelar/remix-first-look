import type { LoaderFunction, MetaFunction } from "remix";
import { json, Link, useLoaderData } from "remix";
import { getSongs, Song } from "~/src/api";

export const loader: LoaderFunction = async () => {
  const { data: songs } = await getSongs()

  return json(songs);
};

export const meta: MetaFunction = () => {
  return {
    title: "🎵 Songs 🎵",
    description: "List of songs!"
  };
};

export default function SongsPage() {
  const songs = useLoaderData<Song[]>();

  return (
    <section>
      <h2>List of songs:</h2>
      <ul>
        {songs.map(song => (
          <li key={song.id}>
            <Link to={`/song/${song.id}`} prefetch="intent">
              {song.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
