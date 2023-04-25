export const accessToken =
  "BQALvT7OHgcLlDA__NwC2NrThHVYnGkY14vU5nRKej9k20Vq6S-ID3VpJOL7vczyBUaj1l1N_JeM64f2iVXzj1_wPVR3vUlD5xiXIzffYkKDgs469rrS";

export const searchApi = (query, type) => {
  let response;

  const searchQuery = `https://api.spotify.com/v1/search?query=${query}&type=track&limit=20`;

  console.log(searchQuery);

  fetch(searchQuery, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.tracks.items[0].album);
    })
    .catch((err) => console.log(err));
};
