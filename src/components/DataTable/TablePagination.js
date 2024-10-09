import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import { checkPermission } from "../../api/AuthApi";
// import { Denied_Msg } from "../../assets/data/menu";
// import { showUpdatedToasterMessage } from "../../store/slices/toaster/toasterslice";
import { useDispatch } from "react-redux";
// import { NO_DATA } from "../../common/constants";

const TablePagination = ({
  icontype='',
  isLoading,
  totalRecords,
  page,
  pageOptions,
  pageSize,
  pageIndex,
  previousPage,
  canPreviousPage,
  nextPage,
  canNextPage,
  gotoPage,
  viewAll,
  viewAllLink,
  checkIsPermission,
}) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPageIndex, setCurrentPageIndex] = useState();
  useEffect(() => {
    setCurrentPageIndex(pageIndex + 1);
  }, [page]);
  useEffect(() => {
    if (
      currentPageIndex > 0 &&
      currentPageIndex <= Math.ceil(totalRecords / pageSize)
    ) {
      gotoPage(currentPageIndex - 1);
    }
  }, [currentPageIndex]);

  const handleInputChange = (e) => {
    if (/^0+/.test(e.target.value)) {
      return;
    } else {
      if (
        e.target.value.length >
        Math.ceil(totalRecords / pageSize).toString().length
      ) {
        return;
      } else {
        setCurrentPageIndex(e.target.value);
      }
    }
  };

  const handleNextPage = () => {
    if (canNextPage) {
      nextPage();
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (canPreviousPage) {
      previousPage();
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <div className={`table-footer ${totalRecords === 0 && "bg-white"}`}>
      {totalRecords > 0 ? (
        <>
          <div className="m-0 table-footer-text">
            {" "}
            Showing{" "}
            {pageSize * pageIndex + 1 <= totalRecords
              ? pageSize * pageIndex + 1
              : totalRecords}{" "}
            to{" "}
            {pageSize * pageIndex + page.length <= totalRecords
              ? pageSize * pageIndex + page.length
              : totalRecords}{" "}
            of {totalRecords} entries
          </div>
          {!viewAll ? (
            <Pagination>
              <div className="pagination-right">
                <div className="table-pages">
                  <span>Page</span>
                  <input
                    type="number"
                    className="form-control default-form enable-spin-btn"
                    value={currentPageIndex}
                    onChange={handleInputChange}
                    onBlur={() => {
                      if (currentPageIndex) {
                        setCurrentPageIndex(currentPageIndex);
                      } else {
                        setCurrentPageIndex(1);
                      }
                    }}
                    min="1"
                    max={Math.ceil(totalRecords / pageSize)}
                  />
                  <span>of {Math.ceil(totalRecords / pageSize)}</span>
                </div>
                <div className="table-next-prev">
                  <button
                    className="btn table-prev-next-btn"
                    onClick={handlePreviousPage}
                    disabled={!canPreviousPage}
                  >
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.05603 13.9997C7.54846 14.0137 7.94772 13.5795 7.96103 13.0193C7.96103 12.7111 7.85456 12.417 7.64162 12.235L2.25158 7.0109L7.64162 1.78689C8.02757 1.46476 8.12074 0.834525 7.82794 0.400355C7.53515 -0.0338145 6.98949 -0.131888 6.59023 0.190239C6.5503 0.21825 6.52369 0.246271 6.48376 0.288287L0.308499 6.25464C-0.0641464 6.61878 -0.104073 7.23502 0.215337 7.65519C0.241955 7.6972 0.281881 7.7392 0.308498 7.76721L6.48376 13.7476C6.65677 13.9016 6.8564 13.9997 7.05603 13.9997Z"></path>
                    </svg>
                  </button>
                  <button
                    className="btn table-prev-next-btn"
                    onClick={handleNextPage}
                    disabled={!canNextPage}
                  >
                    <svg
                      width="8"
                      height="14"
                      viewBox="0 0 8 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M0.943965 0.00032948C0.451542 -0.013676 0.0522792 0.420511 0.0389705 0.980731C0.0389705 1.28885 0.14544 1.58296 0.35838 1.76503L5.74842 6.9891L0.35838 12.2131C-0.0275733 12.5352 -0.120735 13.1655 0.172058 13.5996C0.46485 14.0338 1.01051 14.1319 1.40977 13.8098C1.4497 13.7817 1.47632 13.7537 1.51624 13.7117L7.6915 7.74536C8.06415 7.38122 8.10407 6.76498 7.78466 6.34481C7.75805 6.3028 7.71812 6.2608 7.6915 6.23279L1.51624 0.252418C1.34323 0.0983576 1.1436 0.00032948 0.943965 0.00032948Z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Pagination>
          ) : viewAllLink ? (
            <>
              {checkIsPermission && checkIsPermission !== "" ? (
                <Link
                  onClick={ () => {
                    // console.log('onclick of view all')
                    // const permission = await checkPermission(checkIsPermission);
                    // if (!permission) {
                    //   dispatch(
                    //     showUpdatedToasterMessage({
                    //       message: Denied_Msg,
                    //       type: "danger",
                    //     })
                    //   );
                    //   return;
                    // }
                    navigate(viewAllLink);
                  }}
                  className="btn table-view-btn"
                >
                  view all
                </Link>
              ) : (
                <Link to={`${viewAllLink}`} className="btn table-view-btn">
                  view all
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to={`/`} className="btn table-view-btn">
                view all
              </Link>
            </>
          )}
        </>
      ) : (
        renderNoDataMessage(icontype)
      )}
    </div>
  );
};

export default TablePagination;



const renderNoDataMessage = (icontype) => {
  const NO_DATA = []
  const matchingItem = NO_DATA?.find(item => item?.value === icontype);

  if (matchingItem) {
    return (
      <div className='no-result-text my-3'>
        <img src={matchingItem.icon} alt='' />
        <p className="mt-2">{matchingItem.label}</p>
      </div>
    );
  } else {
    return (
      <div className='no-result-text my-3'>
        <p>No Records Found</p>
      </div>
    );
  }
};
