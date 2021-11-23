import type { LoaderFunction, MetaFunction } from "remix";
import { json, Link, useLoaderData, useParams } from "remix";
import { getRemixes, Remix } from "~/src/api";

export const loader: LoaderFunction = async ({ params: { id } }) => {
    if (!id) {
        throw new Response("Not Found", { status: 404 });
    }

    const { data: songs } = await getRemixes({ songId: id })

    return json(songs);
};

export const meta: MetaFunction = () => {
    return {
        title: "🎧 Song 🎧",
        description: "Song page"
    };
};

export default function SongPage() {
    const remixes = useLoaderData<Remix[]>();
    const { id } = useParams()
    return (
        <section>
            <h2>Song: {id} remixes:</h2>
            <ul>
                {remixes.map(remix => (
                    <li key={remix.id}>
                        <Link to={`/song/${remix.song}/remix/${remix.id}`} prefetch="intent">
                            {remix.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
