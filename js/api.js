const ts = "1626905979";
const apikey = "c03b695d7be730b3b40399f6dfc3df7d";
const hash = "647fd37e10901b373f18cb88a3232bf7";

export const fetchCharacter = (page, limit) => {
  const params = {
    ts,
    apikey,
    hash,
    limit,
    offset: (page - 1) * limit,
  };
  const query = new URLSearchParams(params).toString();

  return fetch(`http://gateway.marvel.com/v1/public/characters?${query}`).then(
    (response) => response.json()
  );
};
