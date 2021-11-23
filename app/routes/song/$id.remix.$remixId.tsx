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
        title: "🎹 Remix 🎹",
        description: "Remix page"
    };
};

export default function RemixPage() {
    const remix = useLoaderData<Remix>();

    return (
        <section>
            <h2>Remix: {remix.id}</h2>
            <span>{remix.name}</span>
        </section>
    );
}
