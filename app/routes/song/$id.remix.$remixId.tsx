import { json, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { getRemix, Remix } from "~/src/api";

export const loader: LoaderFunction = async ({ params: { remixId } }) => {
    if (!remixId) {
        throw new Response("Not Found", { status: 404 });
    }

    const { data: songs } = await getRemix({ id: remixId })

    const song = songs?.[0]
    return json(song);
};

export const meta: MetaFunction = () => {
    return {
        title: "🎧 Song page 🎧",
        description: "Song page"
    };
};

export default function SongPage() {
    const remix = useLoaderData<Remix>();

    return (
        <section>
            <h2>Remix: {remix.id}</h2>
            <span>{remix.name}</span>
        </section>
    );
}
