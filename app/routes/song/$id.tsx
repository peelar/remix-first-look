import { useParams } from "remix";

import type { MetaFunction, LoaderFunction } from "remix";
import { useLoaderData, json, Link } from "remix";

type RemixesData = Array<{ name: string; to: string }>;

export const loader: LoaderFunction = () => {
    const data: RemixesData = [
        {
            to: "/song/c2456ed4-9b1f-4635-8f81-5cbc93d61105/remix/38ff4f49-5f08-45bd-a122-aa1cf14ba83c",
            name: "George Michael - Careless Whisper [Peelar REMIX]"
        },
        {
            to: "/song/38ff4f49-5f08-45bd-a122-aa1cf14ba83c/remix/246a6ab0-0b31-4bd2-91a6-feb0db2d9705",
            name: "Rick Astley - Never Gonna Give You Up [Peelar Remix]"
        },
    ]

    return json(data);
};

export const meta: MetaFunction = () => {
    return {
        title: "🎧 Song page 🎧",
        description: "Song page"
    };
};

export default function SongPage() {
    const remixes = useLoaderData<RemixesData>();
    const { id } = useParams()
    return (
        <section>
            <h2>Song: {id} remixes:</h2>
            <ul>
                {remixes.map(song => (
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
