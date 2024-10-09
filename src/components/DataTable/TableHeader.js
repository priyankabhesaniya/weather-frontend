// import FaSortUpDown from "../../assets/images/sorting.svg";
// import FaSort from "../../assets/images/order-sorting.svg";

// const TableHeader = ({ column, sortBy, className, width }) => {
//   const { getHeaderProps, getSortByToggleProps, isSorted, isSortedDesc } =
//     useTable ? useTable({ columns, data }, useSortBy) : {};

//   return (
//     <th
//       {...getHeaderProps()}
//       className={`${className} ${
//         isSorted ? (isSortedDesc ? "sorted-desc" : "sorted-asc") : ""
//       }`}
//       style={{ width }}
//     >
//       <div className="table-head-data">
//         <p {...column.getHeaderProps()}>{column.render("Header")}</p>
//         {column.render("Header") !== " " &&
//         column.render("Header") === "Code" ? (
//           <img
//             src={isSortedDesc ? FaSort : FaSortUpDown}
//             alt="sorting-icon"
//             className="sort-icon"
//             {...getSortByToggleProps()}
//           />
//         ) : column.render("Header") !== " " &&
//           column.render("Header") !== "Code" &&
//           !column.disableSortBy ? (
//           <img
//             src={isSortedDesc ? FaSort : FaSortUpDown}
//             alt="sorting-icon"
//             className="sort-icon"
//             {...getSortByToggleProps()}
//           />
//         ) : null}
//       </div>
//     </th>
//   );
// };

// export default TableHeader;
import React from 'react';
import { useTable, useSortBy } from 'react-table'; // Make sure these are properly imported
import FaSortUpDown from "../../assets/images/sorting.svg";
import FaSort from "../../assets/images/order-sorting.svg";

const TableHeader = ({ column, columns, data, className, width }) => {
  // Initialize useTable and useSortBy hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  // Destructure necessary properties from column
  const {
    getHeaderProps,
    getSortByToggleProps,
    isSorted,
    isSortedDesc,
  } = column;

  return (
    <th
      {...getHeaderProps()}
      className={`${className} ${
        isSorted ? (isSortedDesc ? "sorted-desc" : "sorted-asc") : ""
      }`}
      style={{ width }}
    >
      <div className="table-head-data">
        <p {...getSortByToggleProps()}>{column.render("Header")}</p>
        {column.render("Header") !== " " &&
        column.render("Header") === "Code" ? (
          <img
            src={isSortedDesc ? FaSort : FaSortUpDown}
            alt="sorting-icon"
            className="sort-icon"
          />
        ) : column.render("Header") !== " " &&
          column.render("Header") !== "Code" &&
          !column.disableSortBy ? (
          <img
            src={isSortedDesc ? FaSort : FaSortUpDown}
            alt="sorting-icon"
            className="sort-icon"
          />
        ) : null}
      </div>
    </th>
  );
};

export default TableHeader;
