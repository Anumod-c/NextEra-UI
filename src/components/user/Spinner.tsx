import { MutatingDots } from "react-loader-spinner";
function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex items-center justify-center h-screen">
        <MutatingDots
          visible={true}
          height="100"
          width="100"
          color="#4f94d4"
          secondaryColor="#7bb8e0"
          radius="12.5"
          ariaLabel="mutating-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>{" "}
    </div>
  );
}

export default Spinner;
