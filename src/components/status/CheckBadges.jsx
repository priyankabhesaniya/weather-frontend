import Pending,{Progress,Qued,Completed} from "./Badges";



const CheckBadges = ({ status }) => {
    console.log("🚀 ~ CheckBadges ~ status:", status); // Confirm the status is received correctly
    return (
      <>
        {(() => {
          if (status === "Completed") {
            return <Completed />;
          } else if (status === "Qued") {
            return <Qued />;
          } else if (status === "On Going" || status === "In Progress") {
            return <Progress />;
          } else if (status === "Pending") {
            return <Pending />;
          }
          return null; // Add a fallback return
        })()}
      </>
    );
  };
  export default CheckBadges;
  
  