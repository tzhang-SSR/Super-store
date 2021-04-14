import './pagination.css';

export default function Pagination({ currPage, getCurrPage, total }) {
    const isFirstPage = currPage == 1
    const isLastPage = currPage == total
    return (
        <ul className="pagination">
            {
                isFirstPage
                    ? <>
                        <li className="disabled"><i className="fa fa-angle-double-left"></i></li>
                        <li className="disabled"><i className="fa fa-angle-left"></i></li>
                    </>
                    : <>
                        <li onClick={() => getCurrPage(1)}>
                            <i className="fa fa-angle-double-left"></i>
                        </li>
                        <li onClick={() => getCurrPage(currPage - 1)}>
                            <i className="fa fa-angle-left"></i>
                        </li>
                    </>
            }
            {isLastPage
                ? <>
                    <li className="disabled"><i className="fa fa-angle-right"></i></li>
                    <li className="disabled"><i className="fa fa-angle-double-right"></i></li>
                </>
                :
                <>
                    <li onClick={() => getCurrPage(currPage + 1)}><i className="fa fa-angle-right"></i></li>
                    <li onClick={() => getCurrPage(5)}><i className="fa fa-angle-double-right"></i></li>
                </>
            }
        </ul>
    )
}