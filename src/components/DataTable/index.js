import React, { useEffect, useState } from "react"
import { Card, Table } from "react-bootstrap"
import { useTable, useSortBy, useGlobalFilter, usePagination, useRowSelect } from "react-table"
import GlobalFilter from "../../components/DataTable/GlobalFilter"
import TablePagination from "../../components/DataTable/TablePagination"
import sorting from "../../asset/images/sorting.svg"
import orderDesc from "../../asset/images/order-desc.svg"
import orderAsc from "../../asset/images/order-asc.svg"
import Loader from "../loader/Loader"
const DataTable = ({
  title,
  icontype,
  columns,
  data,
  initialState,
  setFilter,
  setSelectedRows,
  totalRecords,
  tableHooks,
  defaultPageLength,
  titleWithFilter = false,
  manual,
  isLoading,
  roles,
  status,
  align = false,
  checkAll = false,
  paginationSearch = true,
  viewAll = false,
  tableColumnsFilter = false,
  deleteRows = false,
  searchField = true,
  showBottomPagination = true,
  viewAllLink = "",
  checkIsPermission = "",
  onColumnVisibilityChange
}) => {
  const [limit, setLimit] = useState(10)
  const tableInstance = useTable(
    {
      columns: columns,
      data: data || [],
      manualGlobalFilter: manual,
      manualSortBy: manual,
      manualPagination: manual,
      disableMultiSort: manual,
      initialState: initialState,
      setSelectedRows: setSelectedRows,
      pageCount: Math.ceil(totalRecords / limit)
    },
    tableHooks,
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
    page,
    pageCount,
    pageOptions,
    gotoPage,
    previousPage,
    canPreviousPage,
    nextPage,
    canNextPage,
    setPageSize,
    selectedFlatRows,
    toggleAllRowsSelected,
    state: { pageIndex, pageSize, sortBy, globalFilter, selectedRowIds }
  } = tableInstance
  useEffect(() => {
    // setFilter((prevState) => ({
    //   ...prevState,
    //   searchData: globalFilter || "",
    //   sort: sortBy[0]?.id || "",
    //   order: sortBy[0]?.id ? (sortBy[0].desc ? "desc" : "asc") : "",
    //   limit: pageSize,
    //   page: pageIndex + 1,
    // }));
    let sortField = sortBy[0]?.id // Get the column ID being sorted
    let sortOrder = sortBy[0]?.desc ? "desc" : "asc" // Get the sort order

    // If the sorted column is 'code', modify the sortField to 'id'
    if (sortField === "code") {
      sortField = "id"
    }

    setFilter((prevState) => ({
      ...prevState,
      q: globalFilter || "",
      _sort: sortField || "",
      _order: sortField ? sortOrder : "",
      _limit: pageSize,
      _page: pageIndex + 1
    }))
  }, [sortBy, globalFilter, pageIndex, pageSize, gotoPage])
  useEffect(() => {
    setSelectedRows(selectedFlatRows?.map((row) => row?.original?.id))
  }, [selectedRowIds])

  useEffect(() => {
    toggleAllRowsSelected(checkAll)
  }, [checkAll])
  useEffect(() => {
    gotoPage(0)
  }, [totalRecords])
  return (
    <Card className="border-0">
      {title && (
        <div className="table-header filter-action">
          <h5>{title}</h5>
          {
            titleWithFilter && (

              <div className="search-block">
                <GlobalFilter
                  globalFilter={globalFilter}
                  setGlobalFilter={setGlobalFilter}
                  tableColumnsFilter={tableColumnsFilter}
                  onColumnVisibilityChange={onColumnVisibilityChange}
                  deleteRows={deleteRows}
                  titleWithFilter={titleWithFilter}
                />
              </div>
            )
          }
        </div>
      )}
      {/* {title && <Card.Header>{title}</Card.Header>} */}
      {isLoading && <Loader />}
      <Card.Body className="p-0">
        <div className="">
          {defaultPageLength && (
            <div className="table-header search-entries">
              {paginationSearch ? (
                <>
                  <div className="entries-block">
                    <span>Show</span>
                    <select
                      className="form-select entries-form"
                      onChange={(e) => {
                        setPageSize(Number(e.target.value))
                        setLimit(Number(e.target.value))
                      }}
                    >
                      {defaultPageLength.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    <span>entries</span>
                  </div>
                  <div className="search-block">
                    <GlobalFilter
                      globalFilter={globalFilter}
                      setGlobalFilter={setGlobalFilter}
                      tableColumnsFilter={tableColumnsFilter}
                      onColumnVisibilityChange={onColumnVisibilityChange}
                      deleteRows={deleteRows}
                    />
                  </div>
                </>
              ) : (
                <>
                  {searchField ? (
                    <>
                      <div className="search-block">
                        <GlobalFilter
                          globalFilter={globalFilter}
                          setGlobalFilter={setGlobalFilter}
                        />
                      </div>
                    </>
                  ) : null}
                </>
              )}
            </div>
          )}

          <div className="search-block">
            {roles && (
              <div className="ms-3 d-inline-block">
                <div className="d-flex align-items-center">
                  Role
                  <select
                    className="form-select form-select-sm ms-1"
                    onChange={(e) => {
                      setFilter((prevState) => ({
                        ...prevState,
                        role: e.target.value
                      }))
                    }}
                  >
                    <option value="All">All</option>
                    {roles.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            {status && (
              <div className="ms-3 d-inline-block">
                <div className="d-flex align-items-center">
                  Status
                  <select
                    className="form-select form-select-sm ms-1"
                    onChange={(e) => {
                      setFilter((prevState) => ({
                        ...prevState,
                        status: e.target.value
                      }))
                    }}
                  >
                    {status.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card.Body>
      <div className="card-table table-responsive">
        <Table responsive="md" className={`${align ? align : ""}`} {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps([
                      column.getSortByToggleProps(),
                      {
                        className: column.className
                      },
                      { width: "" }
                    ])}
                  // className={column.className || ""}
                  >
                    <div className="table-head-data">
                      {/* <p>{column.render("Header")}</p> */}
                      {column?.canSort ? (
                        <>
                          <p>{column.render("Header")}</p>
                          {column?.isSorted ? (
                            <>
                              {column?.isSortedDesc ? (
                                <button className='sorting-btn'>
                                  <img src={orderDesc} />
                                </button>
                              ) : (
                                <button className='sorting-btn'>
                                  <img src={orderAsc} />
                                </button>
                              )}
                            </>
                          ) : (
                            <button className='sorting-btn'>
                              <img src={sorting} />
                            </button>
                          )}
                        </>
                      ) : (
                        <>{column.render("Header")}</>
                      )}
                      {/* {column.render("Header") !== " " && column.render("Header") === "Code" && !column.disableSortBy ? (
                        <img src={FaSort} alt="FaSort" className="sort-icon"></img>
                      ) : column.render("Header") !== " " &&
                        column.render("Header") !== "Code" &&
                        !column.disableSortBy ? (
                        <img src={FaSortUpDown} alt="FaSortUpDown" className="sort-icon"></img>
                      ) : null} */}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <tr className={row?.isSelected ? "bg-blue" : ""} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()} className={cell.column.className || ""}>
                        {cell.render("Cell")}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <>
        {showBottomPagination && (
          <TablePagination
            isLoading={isLoading}
            totalRecords={totalRecords}
            page={page}
            pageOptions={pageOptions}
            pageSize={pageSize}
            pageIndex={pageIndex}
            previousPage={previousPage}
            canPreviousPage={canPreviousPage}
            nextPage={nextPage}
            canNextPage={canNextPage}
            gotoPage={gotoPage}
            className="border-top-0"
            viewAll={false}
            viewAllLink={viewAllLink}
            checkIsPermission={checkIsPermission}
            title={title}
            icontype={icontype}
          />
        )}
      </>
    </Card>
  )
}
export default DataTable
