import React, { useEffect, useState } from "react";
import { Manager } from "socket.io-client";
import SongCard from "./SongCard";
import { COLORS, STATUS } from "./constants";
import Requester from "./Requester";
import { Song } from "./Broadcaster.styled";
import ListStatus from "./ListStatus";
import Button from "./Button";
import { createList } from "./TwitchApi";
const Broadcaster = () => {
  const [songList, setSongList] = useState([]);
  const [songListStatus, setSongListStatus] = useState("active");

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
    socket.on("148003044", (list) => {
      console.log(list);
      setSongList(list.slice(1));
      setSongListStatus(list[0]);
    });
  }, []);

  return songListStatus === STATUS.active ||
    songListStatus === STATUS.paused ? (
    <div>
      <ListStatus
        songListStatus={songListStatus}
        onChange={setSongListStatus}
      />
      {songList.map((song, index) => {
        return (
          <Song key={index}>
            <SongCard showControls={true} {...song.song} />
            <Requester {...song.viewer} />
          </Song>
        );
      })}
    </div>
  ) : (
    <Button bgColor={COLORS.DARK_PINK} onClick={() => createList("148003044")}>
      Create List
    </Button>
  );
};

export default Broadcaster;
