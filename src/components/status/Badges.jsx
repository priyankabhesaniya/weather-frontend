import React from "react";

const Pending = () => {
  return (
    <>
      <span className="tab-badge pending">Pending</span>
    </>
  );
};
export default Pending;

export const Progress = () => {
    return (
      <>
        <span className="tab-badge scheduled">On Going</span>
      </>
    );
  };

export const Qued = () => {
    return (
      <>
        <span className="tab-badge not-approved">Qued</span>
      </>
    )
  }

 export const Completed = (props) => {
    return (
      <>
        <span className="tab-badge completed">Completed</span>
      </>
    );
  };
  
  export const DeleteBtn = ({name}) => {
    return (
      <>
        <span className="tab-badge not-approved">{name ? name : "Delete"}</span>
      </>
    );
  };
  