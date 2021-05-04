import React from 'react';
import ItemCard from '../card';
import './home.css';
import SearchBar from '../searchBar'
import Pagination from '../pagination';

export default function HomePage(props) {
    const { items, onSearch, query, clearQuery, currPage, getCurrPage, total } = props
    const noResult = query.length > 0 && items.length == 0
    const notSearching = query.length == 0
    return (
        <>
            <SearchBar searchItems={onSearch} query={query} clearQuery={clearQuery} />
            { noResult
                ? <p className="noresult">No result for current search. Try another word.</p>
                : <>
                    <div className="container">
                        {items.map((item, index) => <ItemCard key={index} {...item} />)}
                    </div>
                    {
                        notSearching &&
                        <Pagination currPage={currPage}
                            getCurrPage={getCurrPage}
                            total={total}
                        />
                    }
                </>
            }
        </>
    );
}


