import agent from "../../agent";

const SearchBar = (props) => {
  const handleInput = (ev) => {
    ev.preventDefault();
    const searchString = ev.target.value;
    if (!!searchString && searchString.length < 3) return;
    props.onInputSearchString(
      searchString,
      (page) => agent.Items.byTitle(searchString, page),
      agent.Items.byTitle(searchString)
    );
  };

  return (
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
  );
};

export default SearchBar;
