import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState<any>([]);
  const [rangeValue, setRangeValue] = useState<any>(36);
  const [selectedRadio, setSelectedRadio] = useState<string>("");
  const radios: string[] = [
    "Africa",
    "North America",
    "South America",
    "Asia",
    "Europe",
    "Oceania",
  ];

  // Le useEffect se joue lorsque le composant est monté
  useEffect(() => {
    const fetchData = async () => {
      //   const response = await fetch("https://restcountries.com/v3.1/all");
      //   const data = await response.json();
      //   return setData(data);
      const response = await axios.get("https://restcountries.com/v3.1/all");
      return setData(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)}
        />
        {radios.map((continent, index) => (
          <li key={index}>
            <input
              type="radio"
              id={continent}
              name="continentRadio"
              checked={continent === selectedRadio}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>
      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>
          Annuler la recherche
        </button>
      )}
      <ul>
        {data
          .filter((filteredCountry: any) =>
            selectedRadio
              ? filteredCountry.continents[0] === selectedRadio
              : filteredCountry
          )
          .sort(
            (country1: any, country2: any) =>
              country2.population - country1.population
          )
          .slice(0, rangeValue)
          .map((country: any, index: any) => {
            return <Card key={index} country={country} />;
          })}
      </ul>
    </div>
  );
};

export default Countries;
