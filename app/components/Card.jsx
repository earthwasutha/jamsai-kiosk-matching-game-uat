import React, { useEffect, useState } from "react";
import Image from "next/image";

export const Card = ({ card, onClick, isMatched }) => {
  const [displayedImage, setDisplayedImage] = useState(
    card.flipped ? card.value : null
  );

  const mappingCard = (card) => {
    const mapping = {
      "1": "/images/cards/new_card20260326/1.webp",
      "2": "/images/cards/new_card20260326/2.webp",
      "3": "/images/cards/new_card20260326/3.webp",
      "4": "/images/cards/new_card20260326/4.webp",
      "5": "/images/cards/new_card20260326/5.webp",
      "6": "/images/cards/new_card20260326/6.webp",
    };
    return mapping[card];
  };

  useEffect(() => {
    if (card.flipped || card.matched) {
      const timer = setTimeout(() => {
        setDisplayedImage(card.value);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setDisplayedImage(null);
      }, 250);
      return () => clearTimeout(timer);

    }
  }, [card.flipped, card.matched, card.value]);

  return (
    <div className="flex justify-center">
      <button
        className={`w-full overflow-hidden kiosk:w-36 aspect-[3/4] kiosk:aspect-auto kiosk:min-h-[207.5px] bg-[#fff] border-[2px] ${displayedImage ? "border-[none] " : "border-[#F66000]"
          }  rounded-[0.5em] ${card.flipped || card.matched ? "animate-flip " : "animate-flip-back"
          } ${isMatched ? "animate-scaleUp" : ""}`}
        onClick={onClick}
      >
        <div className="relative w-full" >
          {/* <div className="flex justify-center items-center w-full h-full min-h-[120px] kiosk:min-h-[300px]"> */}
          {displayedImage ? (
            <img
              className={`flex justify-center items-center w-full h-full object-contain rounded-[0.5em]  ${!card.flipped || !card.matched ? "transform scale-x-[-1]" : ""
                }`}
              src={mappingCard(displayedImage)}
              alt={displayedImage}
            />
          ) : (
            // <div
            //   className={`flex justify-center ${
            //     !displayedImage ? "block" : "hidden"
            //   }`}
            // >
            <div className="w-full h-full flex justify-center items-center">
              <div className="w-[50%] rounded-[0.5em]">
                {/* <div className="!flex !justify-center !items-center w-[50%] h-[50%] rounded-[1em]"> */}
                <img src="/images/logo.webp" alt="logo" className="w-full h-auto" />
              </div>
            </div>
          )}
        </div>
      </button>
    </div>
  );
};
