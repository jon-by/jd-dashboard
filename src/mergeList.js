const fs = require("fs");
const { nanoid } = require("nanoid");

const unlimited = require("./musicListFinal.json");
const jogos = require("./jd-tracklist.json");

const jd_list = jogos.reduce((acc, curr) => {
  const songListKeys = Object.keys(curr.tracks);
  const excludedKeys = ["Just Dance Unlimited", "Removed Songs"];
  const validTracks = songListKeys
    .filter((key) => !excludedKeys.includes(key))
    .map((key) => curr.tracks[key])
    .flat();
  acc[curr.game] = validTracks.map((track) => ({ ...track, id: nanoid() }));
  return acc;
}, {});

jd_list["unlimited"] = unlimited.map((track) => ({ ...track, id: nanoid() }));

try {
  fs.writeFileSync("jd-tracklist-db.json", JSON.stringify(jd_list));
} catch (error) {
  console.log(error);
}
