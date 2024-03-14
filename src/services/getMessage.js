export async function getMessage() {
  const res = await fetch(
    "https://cautious-system-g7vxq654gx3pj6-3000.app.github.dev/api"
  );
  return res.json();
}
