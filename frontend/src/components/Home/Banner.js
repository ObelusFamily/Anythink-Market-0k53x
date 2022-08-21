import { useState, React } from "react";
import SearchBar from "./SearchBar";
import logo from "../../imgs/logo.png";

const Banner = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const clickedVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="banner text-white">
      <div className="container p-4 align-items-center text-center">
        <div>
          <img src={logo} alt="banner" />
        </div>
        <div className="row justify-content-center align-items-center">
          <span>
            A place to{" "}
            <button
              id="get-part"
              className="btn px-1"
              onClick={clickedVisibility}
            >
              get
            </button>
          </span>
          {isVisible && (
            <SearchBar onInputSearchString={props.onInputSearchString} />
          )}
          <span className="px-1"> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
