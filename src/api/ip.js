export async function getUserCity() {
  const res = await fetch('https://ipapi.co/json/');

  if (!res.ok) {
    throw new Error('IP request failed');
  }

  const data = await res.json();

  return data.city;
}
