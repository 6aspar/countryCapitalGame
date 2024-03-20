import { useEffect, useState } from "react";
import "./App.css";

const matchedPairs: any = [];

export const MatchGame = (data: any) => {
  const [errors, setErrors] = useState(0);
  const [selectedCapital, setSelectedCapital] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const pairs = Object.entries(data.data);
  const pairsArr: any = [];

  useEffect(() => {
    pairs.map((item) => {
      pairsArr.push(item);
    });
  }, []);

  const clearCurrent = () => {
    setSelectedCountry(null);
    setSelectedCapital(null);
  };

  useEffect(() => {
    if (selectedCountry && selectedCapital) {
      if (selectedCountry[0] === selectedCapital[0]) {
        matchedPairs.push(selectedCountry);
        if (matchedPairs.length === pairs.length) {
          alert("VICTORY!");
        }
        clearCurrent();
      } else {
        if (errors == 2) {
          alert("GAME OVER!");
        }
        setErrors((prevErr) => prevErr + 1);
        clearCurrent();
      }
    }
  }, [selectedCapital, selectedCountry]);

  const matched = (item: any) => {
    matchedPairs.map((pair: any) => {
      if (pair[0] === item[0]) {
        return true;
      }
    });
    return false;
  };

  return (
    <>
      <div>
        {pairs?.map((item: any) => {
          return (
            <button
              id={"button" + item[0]}
              disabled={matched(item)}
              className={matched(item) ? "matched" : ""}
              onClick={() => setSelectedCountry(item)}
            >
              {item[0]}
            </button>
          );
        })}
      </div>

      <div>
        {pairs?.map((item: any) => {
          return (
            <button onClick={() => setSelectedCapital(item)}>{item[1]}</button>
          );
        })}
      </div>
      <h1>Errors: {errors}</h1>
    </>
  );
};
