import './searchbar.css';

export default function SearchBar({ searchItems, clearQuery, query }) {
    return (
        <div className="searchBar-container">
            <div className="searchBar">
                <input id="searchBar" onChange={(e) => searchItems(e)} value={query} placeholder="Search" />
                <div id="clearSign" onClick={() => clearQuery()}>
                    <i className="fa fa-times"></i>
                </div>
                <div id="searchBtn"><i className="fa fa-search"></i></div>
            </div>
        </div>
    )
}