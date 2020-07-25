import React, { useState } from "react";

import Card from "./Card";

import HandStyles from "./Hand.module.css";

import {
  BATTLE_PLAYERS,
  BATTLE_ROUND_STEP,
} from "features/battle/useBattle";

function Hand(props) {
  const { player, battleHook } = props;
  const { hand } = player;
  const [hoverCard, setHoverCard] = useState(null);

  const { battle, castCreature } = battleHook;

  const cast = (card) => {
    castCreature({
      card,
      player: BATTLE_PLAYERS.PLAYER,
    })
    // card.onCast && card.onCast({ battle, player: BATTLE_PLAYERS.PLAYER, dispatch });
  };

  const getCanCastCard = (card) => {
    const isManaEnough = card.manaCost <= player.mana.actual;
    const isMainStep = battle.roundStep === BATTLE_ROUND_STEP.MAIN;
    return isManaEnough && isMainStep && isPlayerRound;
  };

  const isPlayerRound = battle.attackingPlayer === BATTLE_PLAYERS.PLAYER;

  const getCardStyle = (card) => {
    const style = {};
    const cardIndex = hand.indexOf(card);

    const cardHoverIndex = hand.indexOf(hoverCard);
    if (cardHoverIndex !== -1) {
      const cardDistance = Math.abs(cardHoverIndex - cardIndex);
      const scale = Math.max(1.2 - cardDistance / 8, 1);
      const translate = Math.max(80 - cardDistance * 15, 0);
      style["transform"] = `scale(${scale}) translateY(-${translate}px)`;
      style["zIndex"] = hand.length - cardDistance;
    }

    return style;
  };

  return (
    <div className={HandStyles.hand}>
      {hand.map((card, index) => (
        <Card
          style={getCardStyle(card)}
          onMouseEnter={() => setHoverCard(card)}
          onMouseLeave={() => setHoverCard(null)}
          key={index}
          canCast={getCanCastCard(card)}
          onCastCard={() => cast(card)}
          {...card}
        />
      ))}
    </div>
  );
}

export default Hand;
