import React, { useState } from "react"
import { useAsyncDebounce } from "react-table"
const GlobalFilter = ({
  globalFilter,
  setGlobalFilter,
  tableColumnsFilter = false,
  deleteRows = false,
  onColumnVisibilityChange,
  titleWithFilter
}) => {
  const [value, setValue] = useState(globalFilter)
  const [checkedValues, setCheckedValues] = useState({})
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 300)

  const checkBoxValueHandler = (name, value) => {
    onColumnVisibilityChange(name, value)
  }

  return (
    <>
    {
      !titleWithFilter && (

        <input
          type="text"
          className="form-control search-form"
          aria-label="Search"
          placeholder="Search"
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value)
            onChange(e.target.value)
          }}
        />
      )
    }
      {tableColumnsFilter && (
        <div className="dropdown-center">
          <button
            className="dropdown-toggle column-btn"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            data-bs-auto-close="outside"
          >
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.41868 12.357C6.41868 12.357 6.33862 12.4504 6.32527 12.5171L5.59133 15.5997C5.56464 15.7064 5.59133 15.8265 5.68474 15.9066C5.75146 15.9733 5.83153 16 5.92494 16C5.95163 16 5.97832 16 6.005 16L9.08757 15.2661C9.08757 15.2661 9.20767 15.226 9.24771 15.1726L13.6113 10.809L10.7823 7.97998L6.41868 12.3436V12.357Z"
                fill="#007AFF"
              />
              <path
                d="M15.6264 6.92577L14.6789 5.97832C14.1718 5.47123 13.2911 5.47123 12.7973 5.97832L11.5029 7.27273L14.3319 10.1018L15.6264 8.80734C15.8799 8.55379 16.0133 8.22018 16.0133 7.85988C16.0133 7.49958 15.8799 7.16597 15.6264 6.91243V6.92577Z"
                fill="#007AFF"
              />
              <path
                d="M1.49458 0C0.667223 0 0 0.667223 0 1.49458V12.3436C0 13.2644 0.747289 14.0117 1.66806 14.0117H4.5638C4.93745 14.0117 5.23103 13.7181 5.23103 13.3445C5.23103 12.9708 4.93745 12.6772 4.5638 12.6772H1.66806C1.48123 12.6772 1.33445 12.5304 1.33445 12.3436V10.6756H6.33862C6.71226 10.6756 7.00584 10.382 7.00584 10.0083V7.33945H9.72811C10.1018 7.33945 10.3953 7.04587 10.3953 6.67223C10.3953 6.29858 10.1018 6.005 9.72811 6.005H7.00584V4.00334H11.3428V4.67056C11.3428 5.0442 11.6364 5.33778 12.01 5.33778C12.3837 5.33778 12.6772 5.0442 12.6772 4.67056V1.49458C12.6772 0.667223 12.01 0 11.1827 0H1.49458ZM5.67139 9.34112H1.33445V7.33945H5.67139V9.34112ZM5.67139 6.005H1.33445V4.00334H5.67139V6.005Z"
                fill="#007AFF"
              />
            </svg>
          </button>
          <div className="dropdown-menu">
            <h6>Table Columns</h6>
            <div className="checkbox-group">
              <label className="checkbox checkbox-outline-primary">
                <input
                  type="checkbox"
                  name="Template"
                  value="Template"
                  defaultChecked={!checkedValues["Template"] ? false : true}
                  onChange={(e) => checkBoxValueHandler("Template", e.target.checked)}
                />
                <span>Template</span>
                <span className="checkmark"></span>
              </label>
              <label className="checkbox checkbox-outline-primary">
                <input
                  type="checkbox"
                  name="Approved Date"
                  value="Approved Date"
                  defaultChecked={!checkedValues["Approved Date"] ? false : true}
                  onChange={(e) => checkBoxValueHandler("Approved Date", e.target.checked)}
                />
                <span>Approved Date</span>
                <span className="checkmark"></span>
              </label>
              {/* <label className="checkbox checkbox-outline-primary">
                <input
                  type="checkbox"
                  name="Invoice"
                  value="Invoice"
                  defaultChecked={!checkedValues["Invoice"] ? false : true}
                  onClick={(e) =>
                    checkBoxValueHandler("Invoice", e.target.checked)
                  }
                />
                <span>Invoice</span>
                <span className="checkmark"></span>
              </label> */}
            </div>
          </div>
        </div>
      )}
      {deleteRows && (
        <span className="column-btn bg-red cursor-pointer">
          <svg
            width="12"
            height="16"
            viewBox="0 0 12 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8533 2H8.32017V1.49714C8.32017 0.674286 7.6978 0 6.93348 0H5.07727C4.31295 0 3.69058 0.674286 3.69058 1.49714V2H1.1574C0.513186 2 0 2.56 0 3.24571V4.25143C0 4.52571 0.207458 4.75429 0.458592 4.75429H11.5412C11.7924 4.75429 11.9998 4.52571 11.9998 4.25143V3.24571C12.0107 2.56 11.4976 2 10.8533 2ZM4.61868 1.49714C4.61868 1.22286 4.82614 0.994286 5.07727 0.994286H6.92256C7.17369 0.994286 7.38115 1.22286 7.38115 1.49714V2H4.61868V1.49714Z"
              fill="white"
            />
            <path
              d="M0.873548 5.74857C0.786197 5.74857 0.720684 5.82857 0.731603 5.90857L1.11376 14.5714C1.14652 15.3714 1.75798 16 2.50046 16H9.51037C10.2528 16 10.8643 15.3714 10.8971 14.5714L11.2792 5.90857C11.2792 5.81714 11.2137 5.74857 11.1373 5.74857H0.873548ZM7.8507 7.00571C7.8507 6.73143 8.05816 6.50286 8.30929 6.50286C8.56043 6.50286 8.76788 6.73143 8.76788 7.00571V13.5086C8.76788 13.7829 8.56043 14.0114 8.30929 14.0114C8.05816 14.0114 7.8507 13.7829 7.8507 13.5086V7.00571ZM5.54682 7.00571C5.54682 6.73143 5.75428 6.50286 6.00541 6.50286C6.25655 6.50286 6.464 6.73143 6.464 7.00571V13.5086C6.464 13.7829 6.25655 14.0114 6.00541 14.0114C5.75428 14.0114 5.54682 13.7829 5.54682 13.5086V7.00571ZM3.23202 7.00571C3.23202 6.73143 3.43948 6.50286 3.69061 6.50286C3.94175 6.50286 4.14921 6.73143 4.14921 7.00571V13.5086C4.14921 13.7829 3.94175 14.0114 3.69061 14.0114C3.43948 14.0114 3.23202 13.7829 3.23202 13.5086V7.00571Z"
              fill="white"
            />
          </svg>
        </span>
      )}
    </>
  )
}
export default GlobalFilter
