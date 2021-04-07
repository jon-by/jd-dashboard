import React from "react";
import TicketIcon from "./TicketIcon";
import { Card, Thumb, Source, Info, Difficulty } from "./SongCardStyle";
import SongControls from "./SongControls";
import Spinner from "./Spinner";
import SongCardOverlay from "./SongCardOverlay";

const difficulties = [null, "Easy", "Medium", "Hard", "Extreme"];
const modes = [null, "Solo", "Duet", "Trio", "Dance Crew"];

const SongCard = ({
  extremeCost,
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
  removeSong,
  changeSongStatus,
  token,
  onBanSong,
  showOverlay = false,
  onClick,
  overlay,
  ...props
}) => {
  const getTrackCost = (difficulty) => {
    const cost = difficulty >= 4 ? extremeCost : 1;
    return cost;
  };
  return (
    <Card onClick={onClick} {...props} danced={danced}>
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
            {cost ? cost : getTrackCost(difficulty)}&nbsp;
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
