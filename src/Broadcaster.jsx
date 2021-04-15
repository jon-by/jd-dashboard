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
} from "./TwitchApi";
const Broadcaster = () => {
  const [songList, setSongList] = useState([]);
  const [songListStatus, setSongListStatus] = useState("active");
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const config = getTwitchConfig();
    console.log(config);
    twitch.onAuthorized(function (authentication) {
      setAuth(authentication);
    });
  }, []);
  useEffect(() => {
    if (auth) {
      const manager = new Manager("http://localhost:3000", {
        transports: ["websocket"],
      });
      //console.log(auth);
      const socket = manager.socket("/songlist", {
        auth: { broadcaster: auth.channelId },
      });
      socket.on("connect", () => {
        //console.log("connected");
      });
      socket.on(auth.channelId, (list) => {
        // console.log(list);
        setSongList(list.slice(1));
        setSongListStatus(list[0]);
      });
    }
  }, [auth]);

  return auth &&
    (songListStatus === STATUS.active || songListStatus === STATUS.paused) ? (
    <Wrapper>
      <ListStatus
        songListStatus={songListStatus}
        onChange={setSongListStatus}
        changeListStatus={changeListStatus}
        token={auth}
      />
      <RequestedSongList
        songList={songList}
        onRemove={removeSongFromList}
        onStatusChange={changeSongStatus}
        token={auth.token}
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
