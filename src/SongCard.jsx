import React from "react";
import TicketIcon from "./TicketIcon";
import { Card, Thumb, Source, Info, Difficulty } from "./SongCardStyle";
import SongControls from "./SongControls";
import Spinner from "./Spinner";
const getTrackCost = (difficulty) => {
  const cost = difficulty === 4 ? 5 : 1;
  return cost;
};

const difficulties = [null, "Easy", "Medium", "Hard", "Extreme"];
const modes = [null, "Solo", "Duet", "Trio", "Dance Crew"];

const SongCard = ({
  id,
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
  ...props
}) => {
  return (
    <Card {...props} danced={danced}>
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
            {getTrackCost(difficulty)}&nbsp;
            <TicketIcon />
          </Difficulty>
          <Difficulty>{difficulties[difficulty]}</Difficulty>
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
