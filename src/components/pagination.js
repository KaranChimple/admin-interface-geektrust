import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from './usePagination';
import './pagination.css';

const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    const onChangeToFirst = () => {
        onPageChange(1);
    }

    const onChangeToLast = () => {
        onPageChange(lastPage)
    }

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={classnames('pagination-container', { [className]: className })}
        >
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1
                })}
                onClick={onChangeToFirst}
            >
                <div className={classnames('first-page', {
                    disabled: currentPage === 1
                })} style={{ color: currentPage === 1 ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.87)', fontSize: "18px" }}>
                    &#171;
                </div>
            </li>

            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === 1
                })}
                onClick={onPrevious}
            >
                <div className="previous-page arrow left" />

            </li>
            {paginationRange.map(pageNumber => {
                if (pageNumber === DOTS) {
                    return <li key={pageNumber} className="pagination-item dots">&#8230;</li>;
                }

                return (
                    <li
                        className={classnames(`page-number-${pageNumber} pagination-item`, {
                            selected: pageNumber === currentPage
                        })}
                        key={pageNumber}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                onClick={onNext}
            >
                <div className="next-page arrow right" />
            </li>

            <li
                className={classnames('pagination-item', {
                    disabled: currentPage === lastPage
                })}
                onClick={onChangeToLast}
            >
                <div className={classnames('last-page', {
                    disabled: currentPage === lastPage
                })} style={{ color: currentPage === lastPage ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.87)', fontSize: "18px" }}>
                    &#187;
                </div>
            </li>
        </ul>
    );
};

export default Pagination;