import React, { useState, useEffect } from "react";
import { Manager } from "socket.io-client";
import { Wrapper, SafeArea, Content, ListWrapper } from "./OverlayList.styled";
import SongCard from "./SongCard";
import RequestedSongList from "./RequestedSongList";
const OverlayList = () => {
  const [auth, setAuth] = useState(null);
  const [songList, setSongList] = useState([]);
  const [listStatus, setListStatus] = useState(null);
  useEffect(() => {
    if (auth) {
      const manager = new Manager("http://localhost:3000", {
        transports: ["websocket"],
      });
      const socket = manager.socket("/songlist", {
        auth: { broadcaster: auth.channelId },
      });
      socket.on("connect", () => {
        console.log("connected");
      });
      socket.on(auth.channelId, (list) => {
        setSongList(list.slice(1));
        setListStatus(list[0]);
      });
    }

    console.log(auth);
  }, [auth]);

  useEffect(() => {
    console.log(songList);
  }, [songList]);

  useEffect(() => {
    window.Twitch.ext.onAuthorized(function (authentication) {
      setAuth(authentication);
    });
  }, []);

  return (
    <Wrapper>
      <Content>
        <RequestedSongList songList={songList} showControls={false} />
      </Content>
    </Wrapper>
  );
};

export default OverlayList;
