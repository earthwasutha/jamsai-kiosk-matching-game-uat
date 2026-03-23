"use client";
import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import { useBoundStore } from "@/app/stores/useBoundStore";

export const FlipCardGame = ({ onFinish, time }) => {
  const [cards, setCards] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [score, setScore] = useState(0);
  const { setHistoryFlip, historyFlip, pattern } = useBoundStore(
    (state) => state
  );
  useEffect(() => {
    // setCards(shuffleArray([...pattern]));
    setCards(pattern);
  }, []);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };


  const flipCard = (card, index) => {
    if (lockBoard || card.flipped) return;
    setHistoryFlip({ value: index, time });
    if (card === firstCard) return;

    //setHistoryFlip({value: index,time});›‹

    if (!firstCard) {
      setFirstCard(card);
      setCards(
        cards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
      );
      return;
    }
    setCards(
      cards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c))
    );
    setLockBoard(true);

    if (firstCard.value === card.value) {
      setTimeout(() => {
        setCards(
          cards.map((c) =>
            c.value === card.value ? { ...c, matched: true, flipped: true } : c
          )
        );
        setScore(score + 10);
        if (score + 10 >= 60) {
          onFinish([...historyFlip, { value: index, time }]);
        }
        resetBoard();
      }, 500);
    } else {
      setTimeout(() => {
        setCards(
          cards.map((c) =>
            c.id === card.id || c.id === firstCard.id
              ? { ...c, flipped: false }
              : c
          )
        );
        resetBoard();
      }, 750);
    }
  };

  const resetBoard = () => {
    setFirstCard(null);
    setLockBoard(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[90%] mt-0 grid grid-cols-3 !gap-x-2  gap-y-2 kiosk:!gap-x-0 kiosk:!gap-y-8 p-5">
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => flipCard(card, index)}
            isMatched={card.matched}
          />
        ))}
      </div>
    </div>
  );
};
