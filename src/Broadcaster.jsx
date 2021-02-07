import React, { useEffect, useState } from "react";
import { Manager } from "socket.io-client";
import SongCard from "./SongCard";
import { STATUS } from "./constants";
import Requester from "./Requester";
import { Song } from "./Broadcaster.styled";
import ListStatus from "./ListStatus";

const songlist = [
  { status: "active" },
  {
    viewer: {
      name: "BeatrizXavierjd",
      id: 148003044,
    },
    song: {
      name: "Drum Go Dum",
      artist: "K/DA ft. Aluna, Wolftyla, and Bekuh BOOM",
      difficulty: 4,
      coaches: 4,
      thumb:
        "https://static.wikia.nocookie.net/justdance/images/5/54/Kdance_cover_generic.png",
      source: "2021",
    },
  },
];
const Broadcaster = () => {
  const [songList, setSongList] = useState(songlist.slice(1));
  const [songListStatus, setSongListStatus] = useState(songlist[0].status);

  useEffect(() => {
    console.log(songListStatus);
    const manager = new Manager("http://localhost:3000", {
      transports: ["websocket"],
    });
    const socket = manager.socket("/songlist", {
      auth: { broadcaster: 148003044, viewer: 148003044 },
    });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("148003044-148003044", ({ songList }) => {
      console.log(songList);
    });
  }, []);

  return (
    <div>
      <ListStatus
        songListStatus={songListStatus}
        onChange={setSongListStatus}
      />
      {songList.map((song, index) => {
        return (
          <Song>
            <SongCard {...song.song} />
            <Requester {...song.viewer} />
          </Song>
        );
      })}
    </div>
  );
};

export default Broadcaster;
