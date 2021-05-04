import './pagination.css';

export default function Pagination({ currPage, getCurrPage, total }) {
    const isFirstPage = currPage == 1
    const isLastPage = currPage == total
    return (
        <ul className="pagination">
            {
                isFirstPage
                    ? <>
                        <li>
                            <button className="disabled"><i className="fa fa-angle-double-left"></i></button>
                        </li>
                        <li>
                            <button className="disabled"><i className="fa fa-angle-left"></i></button>
                        </li>
                    </>
                    : <>
                        <li onClick={() => getCurrPage(1)}>
                            <button><i className="fa fa-angle-double-left"></i></button>
                        </li>
                        <li onClick={() => getCurrPage(currPage - 1)}>
                            <button><i className="fa fa-angle-left"></i></button>
                        </li>
                    </>
            }
            <li id="pageNum">1 - {total.toString()}</li>
            {isLastPage
                ? <>
                    <li>
                        <button className="disabled"><i className="fa fa-angle-right"></i></button>
                    </li>
                    <li>
                        <button className="disabled"><i className="fa fa-angle-double-right"></i></button>
                    </li>
                </>
                :
                <>
                    <li onClick={() => getCurrPage(currPage + 1)}>
                        <button><i className="fa fa-angle-right"></i></button>
                    </li>
                    <li onClick={() => getCurrPage(total)}>
                        <button><i className="fa fa-angle-double-right"></i></button>
                    </li>
                </>
            }
        </ul>
    )
}