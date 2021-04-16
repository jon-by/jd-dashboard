import React, { useEffect, useState } from "react";
import { Manager } from "socket.io-client";
import SongCard from "./SongCard";
import { COLORS, STATUS } from "./constants";
import Requester from "./Requester";
import ListStatus from "./ListStatus";
import Button from "./Button";
import RequestedSongList from "./RequestedSongList";
import { Wrapper } from "./Broadcaster.styled";
import {
  createList,
  removeSongFromList,
  changeSongStatus,
  changeListStatus,
  getTwitchConfig,
  twitch,
  authInit,
} from "./TwitchApi";
const Broadcaster = () => {
  const [songList, setSongList] = useState([]);
  const [songListStatus, setSongListStatus] = useState("active");

  useEffect(() => {
    authInit(function (authentication) {
      const manager = new Manager("http://localhost:3000", {
        transports: ["websocket"],
      });
      const socket = manager.socket("/songlist", {
        auth: { broadcaster: authentication.channelId },
      });
      socket.on("connect", () => {});
      socket.on(authentication.channelId, (list) => {
        console.log(list);
        setSongList(list.slice(1));
        setSongListStatus(list[0]);
      });
    });
  }, []);

  return songListStatus === STATUS.active ||
    songListStatus === STATUS.paused ? (
    <Wrapper>
      <ListStatus
        songListStatus={songListStatus}
        onChange={setSongListStatus}
        changeListStatus={changeListStatus}
      />
      <RequestedSongList
        songList={songList}
        onRemove={removeSongFromList}
        onStatusChange={changeSongStatus}
        showControls={true}
        clickable={false}
      />
    </Wrapper>
  ) : (
    <Button bgColor={COLORS.DARK_PINK} onClick={() => createList("148003044")}>
      Create List
    </Button>
  );
};

export default Broadcaster;
