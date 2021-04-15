import React, { useEffect } from "react";
import { Wrapper, SongList, Header, Title } from "./BannedSongList.styled";
import SongCard from "./SongCard";
import FilterSection from "./FilterSection";

const BannedSongList = ({
  songList,
  title,
  showFilter = false,
  showOverlay = false,
  onClick,
  overlay,
  setSearchTerm,
}) => {
  return (
    <Wrapper>
      <Header>
        <Title>{title}</Title>
        {showFilter && <FilterSection onChange={setSearchTerm} />}
      </Header>
      <SongList>
        {songList.map((song) => {
          return (
            <SongCard
              overlay={overlay}
              onClick={onClick}
              showOverlay={showOverlay}
              key={song.id}
              {...song}
            />
          );
        })}
      </SongList>
    </Wrapper>
  );
};

export default BannedSongList;
