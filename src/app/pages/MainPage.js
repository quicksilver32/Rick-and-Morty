import React from "react";
import "../../assets/styles/pages/main-page.css";
import main_img from "../../assets/images/main-img.png"

const MainPage = () => {
  return (
    <main>
      <div className="main">
        <p className="main__text">
          The Rick and Morty API is a REST API based on the television show Rick
          and Morty. You will have access to about hundreds of characters,
          images, locations and episodes. The Rick and Morty API is filled with
          canonical information as seen on the TV show.
        </p>
        <img className="main__img" src={main_img} alt="logo" />
      </div>
    </main>
  );
};
export default MainPage;
