import React from "react";
import TicketIcon from "./TicketIcon";
import { Card, Thumb, Source, Info, Difficulty } from "./SongCardStyle";
const getTrackCost = (difficulty) => {
  const cost = difficulty === 4 ? 5 : 1;
  return cost;
};

const difficulties = [null, "Easy", "Medium", "Hard", "Extreme"];
const modes = [null, "Solo", "Duet", "Trio", "Dance Crew"];

const SongCard = ({ name, artist, difficulty, coaches, thumb, source }) => {
  return (
    <Card>
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
    </Card>
  );
};

export default SongCard;
