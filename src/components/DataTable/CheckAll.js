import React from "react";
const CheckAll = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;
    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    return (
      <>
        <label className="checkbox checkbox-outline-primary mb-0 ps-0 mb-0">
          <input
            type="checkbox"
            className="checkbox-outline-primary mb-0 ps-0 mb-0"
            ref={resolvedRef}
            {...rest}
          />
          <span></span>
          <span className="checkmark"></span>
        </label>
      </>
    );
  }
);
export default CheckAll;
