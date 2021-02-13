import React, { useEffect, useState } from "react";
import { Manager } from "socket.io-client";
import SongCard from "./SongCard";
import { COLORS, STATUS } from "./constants";
import Requester from "./Requester";
import { Song } from "./Broadcaster.styled";
import ListStatus from "./ListStatus";
import { getCookie } from "./utils";
import Button from "./Button";
import { createList } from "./TwitchApi";

const broadcasterId = getCookie("Authentication");

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
    const manager = new Manager("http://localhost:3000", {
      transports: ["websocket"],
    });
    const socket = manager.socket("/songlist", {
      auth: { broadcaster: 148003044 },
    });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on(broadcasterId, ({ songList }) => {
      console.log(songlist);
    });
  }, []);

  return songListStatus !== STATUS.active &&
    songListStatus !== STATUS.paused ? (
    <div>
      <ListStatus songListStatus={false} onChange={setSongListStatus} />
      {songList.map((song, index) => {
        return (
          <Song>
            <SongCard {...song.song} />
            <Requester {...song.viewer} />
          </Song>
        );
      })}
    </div>
  ) : (
    <Button
      bgColor={COLORS.DARK_PINK}
      onClick={() => createList(broadcasterId)}
    >
      Create List
    </Button>
  );
};

export default Broadcaster;
