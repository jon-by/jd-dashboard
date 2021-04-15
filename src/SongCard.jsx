import React from "react";
import TicketIcon from "./TicketIcon";
import { Card, Thumb, Source, Info, Difficulty } from "./SongCard.style";
import SongControls from "./SongControls";
import Spinner from "./Spinner";
import SongCardOverlay from "./SongCardOverlay";

const difficulties = [null, "Easy", "Medium", "Hard", "Extreme"];
const modes = [null, "Solo", "Duet", "Trio", "Dance Crew"];

const SongCard = ({
  id,
  cost,
  name,
  artist,
  difficulty,
  coaches,
  thumb,
  source,
  danced,
  showControls = false,
  clickable = true,
  removeSong,
  changeSongStatus,
  token,
  onBanSong,
  showOverlay = false,
  onClick = null,
  overlay,
  ...props
}) => {
  return (
    <Card
      onClick={() =>
        onClick &&
        onClick({
          id,
          cost,
          name,
          artist,
          difficulty,
          coaches,
          thumb,
          source,
          danced,
        })
      }
      {...props}
      clickable={clickable}
      danced={danced}
    >
      {showOverlay && <SongCardOverlay overlay={overlay} />}
      <Thumb>
        <img loading="lazy" src={thumb} alt={name + " - " + artist} />
        <Source>{source}</Source>
      </Thumb>
      <Info>
        <p className="title">{name}</p>
        <p className="artist">
          <b>Artist: </b>
          {artist}
        </p>
        <div>
          <Difficulty>
            {cost}&nbsp;
            <TicketIcon />
          </Difficulty>
          <Difficulty>
            {difficulties[difficulty > 4 ? 4 : difficulty]}
          </Difficulty>
          <Difficulty>{modes[coaches]}</Difficulty>
        </div>
      </Info>

      {showControls && (
        <SongControls
          danced={danced}
          removeSong={removeSong}
          changeSongStatus={changeSongStatus}
          songId={id}
          token={token}
        />
      )}
    </Card>
  );
};

export default SongCard;
