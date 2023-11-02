import React, { useState } from "react";
import "./Dice.css";

const Dice = () => {
  const [rolling, setRolling] = useState(false);
  const [diceRolls, setDiceRolls] = useState([[]]);

  const generateDots = (number) => {
    // Positions for dots on the front face of the cube
    const dotPositions = {
      1: [{ className: "dot-center" }],
      2: [{ className: "dot-top-left" }, { className: "dot-bottom-right" }],
      3: [{ className: "dot-top-left" }, { className: "dot-center" }, { className: "dot-bottom-right" }],
      4: [
        { className: "dot-top-left" },
        { className: "dot-bottom-right" },
        { className: "dot-top-right" },
        { className: "dot-bottom-left" },
      ],
      5: [
        { className: "dot-top-left" },
        { className: "dot-bottom-right" },
        { className: "dot-top-right" },
        { className: "dot-bottom-left" },
        { className: "dot-center" },
      ],
      6: [
        { className: "dot-top-left" },
        { className: "dot-bottom-right" },
        { className: "dot-top-right" },
        { className: "dot-bottom-left" },
        { className: "dot-middle-left" },
        { className: "dot-middle-right" },
      ],
    };

    return dotPositions[number];
  };

  const rollDice = () => {
    if (!rolling) {
      setRolling(true);
      const numberOfDice = diceRolls.length;
      const randomNumbers = Array.from({ length: numberOfDice }, () => Math.floor(Math.random() * 6) + 1);
      const diceRollResults = randomNumbers.map((number) => generateDots(number));
      setDiceRolls(diceRollResults);
      setTimeout(() => {
        setRolling(false);
      }, 1500); // Duration of the rolling animation (in milliseconds)
    }
  };


  return (
    <div className="dice-container">
      <div className="dice-wrapper">
        {diceRolls.map((diceRoll, index) => (
          <div key={index} className={`dice ${rolling ? "rolling" : ""}`}>
            <div className="cube">
              {[...Array(6)].map((_, i) => (
                <div key={i + 1} className={`face face-${i + 1}`}>
                  {i + 1 === 1 && // Render dots only on the front face (index 1)
                    diceRoll.map((dot, idx) => <div key={idx} className={`dot ${dot.className}`}></div>)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={rollDice} disabled={rolling}>
        Roll Dice
      </button>
      <div className="radio-group">
        <div className="radio-button">
          <input
            type="radio" id="one-die" name="diceNumber" value={1}
            checked={diceRolls.length === 1}
            onChange={() => setDiceRolls([[]])}
          />
          <label htmlFor="one-die">1 Die</label>
        </div>
        <div className="radio-button">
          <input
            type="radio" id="two-dice" name="diceNumber" value={2}
            checked={diceRolls.length === 2}
            onChange={() => setDiceRolls([[], []])}
          />
          <label htmlFor="two-dice">2 Dice</label>
        </div>
      </div>
    </div>
  );
};

export default Dice;