import React, { useEffect, useState } from "react";
import "./HomePage.css"
import { PhotoCard } from "../Component/PhotoCard";
import useDebounce  from "../customHooks/useDebounce";
export const HomePage = () => {
    const [photoData, setPhotoData] = useState([]);
    const [query, setQuery] = useState("Sachin sharma");
    const debounceUpdateSearch = useDebounce((e) => setQuery(e.target.value));
  
    const getData = async () => {
      try {
        const resp = await fetch(
          `https://api.github.com/search/users?q=${query}`
        );
        const data = await resp.json();
        setPhotoData(data.items);
      } catch (error) {
        console.log("Error while fetching Data", error.message);
      }
    };
  
    useEffect(() => {
      getData();
    }, [query]);
  
    return (
      <div className="homepage-container">
        <div>
            <h1 className="heading">Github Profile Search </h1>
          <input
            type="text"
            onChange={debounceUpdateSearch}
            className="user-input"
            placeholder="Enter your username"
          />
        </div>
        <div className="image-container">
          {photoData?.map((e) => {
            return <PhotoCard key={e.id} id={e.login} url={e.avatar_url} />;
          })}
        </div>
      </div>
    );
  };