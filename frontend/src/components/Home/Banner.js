import React from "react";
import agent from "../../agent";
import logo from "../../imgs/logo.png";

const Banner = (props) => {
  const handleInput = (ev) => {
    ev.preventDefault();
    const searchString = ev.target.value;
    if (searchString.length < 3) return;
    props.onInputSearchString(
      searchString,
      (page) => agent.Items.byTitle(searchString, page),
      agent.Items.byTitle(searchString)
    );
  };
  return (
    <div className="banner text-white">
      <div className="container p-4 align-items-center text-center">
        <div className="">
          <img src={logo} alt="banner" />
        </div>
        <div className="row justify-content-center align-items-center">
          <span id="get-part">A place to get</span>
          <div className="input-group col-sm-5">
            <input
              id="search-box"
              className="form-control border-end-0"
              type="text"
              placeholder="What is it that you truly desire?"
              onInput={handleInput}
            />
            <span className="input-group-text bg-white ms-n3">
              <i className="bi bi-search"></i>
            </span>
          </div>
          <span> the cool stuff.</span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
