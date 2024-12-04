import React from "react";

export default function WeatherCard({ weatherData }) {
  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { city, list } = weatherData;

  // Get current day and time
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="bg-gray-600 p-4 rounded-3xl max-w-[20rem] mx-auto font-sans text-white">
      <div className="text-center">
        <h2 className="text-[17px] flex justify-between pb-2  font-bold">
          <p>{currentDay}, {currentTime}</p> | <p> {list[0]?.weather[0]?.description}</p>
        </h2>
      </div>
      <div className="space-y-2">
        {list.slice(0, 5).map((content, index) => {
          const { main, weather, dt_txt } = content;
          const time = new Date(dt_txt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          return (
            <div
              key={index}
              className="flex text-[16px] justify-between items-center "
            >
              <div className="font-semibold">{time}</div>
              <div className="flex font-semibold justify-center gap-x-2">
                <div className="items-center justify-center ">
                  {(main.temp - 273.15).toFixed(1)} °C
                </div>
                <div className="w-8 h-8">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather[0]?.icon}@2x.png`}
                    alt={weather[0]?.description}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
