import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

type SongsData = Array<{ name: string; to: string }>;

export const loader: LoaderFunction = () => {
  const data: SongsData = [
    {
      to: "/song/c2456ed4-9b1f-4635-8f81-5cbc93d61105",
      name: "George Michael - Careless Whisper"
    },
    {
      to: "/song/38ff4f49-5f08-45bd-a122-aa1cf14ba83c",
      name: "Rick Astley - Never Gonna Give You Up"
    },
  ]

  return json(data);
};

export const meta: MetaFunction = () => {
  return {
    title: "🎵 Songs 🎵",
    description: "List of songs!"
  };
};

export default function SongsPage() {
  const songs = useLoaderData<SongsData>();

  return (
    <section>
      <h2>List of songs:</h2>
      <ul>
        {songs.map(song => (
          <li key={song.to} className="remix__page__resource">
            <Link to={song.to} prefetch="intent">
              {song.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
