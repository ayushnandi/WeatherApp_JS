import React from "react";

export default function CityName({ name, country }) {
  return (
    <div className="text-center p-4">
      {name && country ? (
        <h1 className="text-2xl font-bold">
          {name}, {country}
        </h1>
      ) : (
        <h1 className="text-2xl font-bold">Loading...</h1>
      )}
    </div>
  );
}
