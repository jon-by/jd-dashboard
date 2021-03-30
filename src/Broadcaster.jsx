import React, { useEffect, useState } from "react";
import { Manager } from "socket.io-client";
import SongCard from "./SongCard";
import { COLORS, STATUS } from "./constants";
import Requester from "./Requester";
import { Song, ListWrapper } from "./Broadcaster.styled";
import ListStatus from "./ListStatus";
import Button from "./Button";
import {
  createList,
  removeSongFromList,
  changeSongStatus,
  changeListStatus,
} from "./TwitchApi";
const Broadcaster = () => {
  const [songList, setSongList] = useState([]);
  const [songListStatus, setSongListStatus] = useState("active");
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    window.Twitch.ext.onAuthorized(function (authentication) {
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
        console.log(list);
        setSongList(list.slice(1));
        setSongListStatus(list[0]);
      });
    }
  }, [auth]);

  return songListStatus === STATUS.active ||
    songListStatus === STATUS.paused ? (
    <div>
      <ListStatus
        songListStatus={songListStatus}
        onChange={setSongListStatus}
        changeListStatus={changeListStatus}
        token={auth}
      />
      <ListWrapper>
        {songList.map((song, index) => {
          return (
            <Song key={index} danced={song.song.danced}>
              <SongCard
                showControls={true}
                {...song.song}
                removeSong={removeSongFromList}
                changeSongStatus={changeSongStatus}
                token={auth.token}
                extremeCost={song.song.difficulty}
              />
              <Requester danced={song.song.danced} {...song.viewer} />
            </Song>
          );
        })}
      </ListWrapper>
    </div>
  ) : (
    <Button bgColor={COLORS.DARK_PINK} onClick={() => createList("148003044")}>
      Create List
    </Button>
  );
};

export default Broadcaster;
