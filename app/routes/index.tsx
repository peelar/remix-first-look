import React from "react";
import { ActionFunction, Form, json, Link, LoaderFunction, MetaFunction, redirect, useActionData, useLoaderData, useTransition } from "remix";
import { addRemix, getSongs, Song } from "~/src/api";

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

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const song = formData.get("song");

  if (!name || !song || typeof name !== "string" || typeof song !== "string") {
    return json(["Name or song was not provided"], { status: 400 });
  }

  const { data } = await addRemix({ name, song })
  const remix = data?.[0]

  if (remix) {
    return redirect(`/song/${song}/remix/${remix.id}`);
  } else {
    throw new Response("Error!", { status: 500 });
  }
};

const AddRemixModal = ({ open }: { open: boolean }) => {
  return (
    <dialog id="remix" open={open}>
      <AddRemixForm />
    </dialog>
  )
}

const AddRemixForm = () => {
  const songs = useLoaderData<Song[]>();
  const transition = useTransition();
  const actionData = useActionData();

  return (
    <Form method="post">
      <fieldset>
        <label>
          Name
          <input type="text" name="name" placeholder="Remix name" />
        </label>
        <label>
          Song
          <select name="song">
            {songs.map(song => (
              <option value={song.id} key={song.id}>
                {song.name}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      {actionData && (
        <ul>
          {actionData.map((error: string, index: string) => (
            <li className="error" key={index}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <button type="submit">{transition.state === "submitting" ? "Loading..." : "Submit"}</button>
    </Form>
  )
}

export default function SongsPage() {
  const songs = useLoaderData<Song[]>();
  const [open, setOpen] = React.useState(false)

  return (
    <section>
      <button onClick={() => setOpen(true)}>Submit a remix</button>
      <AddRemixModal open={open} />
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
