import { useEffect, useState } from "react";
import "./App.css";

const matchedPairs: any = [];
const matchedButtonsIds: any = [];
let errorIds: any = [];

export const MatchGame = (data: any) => {
  const [errors, setErrors] = useState(0);
  const [selectedCapital, setSelectedCapital] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [capitalPairs, setCapitalPairs] = useState(Object.entries(data.data));
  const [shuffled, setShuffled] = useState(false)

  const countryPairs = Object.entries(data.data);

  useEffect(() => {
    if (!shuffled) {
      setCapitalPairs(
        Object.entries(data.data).sort(() => (Math.random() > 0.5 ? 1 : -1))
      );
      setShuffled(true)
    }
  }, []);

  const clearCurrent = () => {
    setSelectedCountry(null);
    setSelectedCapital(null);
    errorIds = [];
  };

  const hasMatched = (id: any) => {
    if (matchedButtonsIds.includes(id)) {
      return true;
    }

    return false;
  };

  const whichPairedStyles = (id: any) => {
    if (matchedButtonsIds.includes(id)) {
      return "matched";
    }

    if (errorIds.includes(id)) {
      return "error";
    }

    return "";
  };

  useEffect(() => {
    if (selectedCountry && selectedCapital) {
      clearCurrent();
      if (selectedCountry[0] === selectedCapital[0]) {
        matchedPairs.push(selectedCountry);
        matchedButtonsIds.push("button" + selectedCountry[0]);
        matchedButtonsIds.push("button" + selectedCountry[1]);
        if (matchedPairs.length === countryPairs.length) {
          alert("VICTORY!");
        }
      } else {
        if (errors == 2) {
          alert("GAME OVER!");
        }
        setErrors((prevErr) => prevErr + 1);
        errorIds.push("button" + selectedCountry[0]);
        errorIds.push("button" + selectedCapital[1]);
      }
    }
  }, [selectedCapital, selectedCountry]);

  return (
    <>
      <div>
        {countryPairs?.map((item: any) => {
          return (
            <button
              id={"button" + item[0]}
              disabled={hasMatched("button" + item[0])}
              className={whichPairedStyles("button" + item[0])}
              onClick={() => setSelectedCountry(item)}
            >
              {item[0]}
            </button>
          );
        })}
      </div>
      <div>
        {capitalPairs?.map((item: any) => {
          return (
            <button
              id={"button" + item[1]}
              disabled={hasMatched("button" + item[1])}
              className={whichPairedStyles("button" + item[1])}
              onClick={() => setSelectedCapital(item)}
            >
              {item[1]}
            </button>
          );
        })}
      </div>
      <h1>Errors: {errors}</h1>
    </>
  );
};
