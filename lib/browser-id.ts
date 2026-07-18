export function getBrowserId() {
  const key = "smash-fantasy-browser-id";

  let id = localStorage.getItem(key);

  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }

  return id;
}
