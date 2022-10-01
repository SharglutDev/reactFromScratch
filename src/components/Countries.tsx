import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  const [data, setData] = useState<any>([]);

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
        <input type="range" min="1" max="250" />
      </ul>
      <ul>
        {data.map((country: any, index: any) => {
          return <Card key={index} country={country} />;
        })}
      </ul>
    </div>
  );
};

export default Countries;
