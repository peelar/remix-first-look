import { useParams } from "remix";

export default function SongPage() {
    const { id } = useParams()
    return (
        <section>
            <h2>Remix: {id}:</h2>
        </section>
    );
}
