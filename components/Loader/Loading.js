import Spinner from "react-bootstrap/Spinner";

export const Loading = () => {
  return (
    <div
      className="loader position-fixed h-100 w-100 d-flex justify-content-center align-items-center"
      style={{
        zIndex: "111111",
        background: "#00000069",
      }}
    >
      <SpinnerLoader />
    </div>
  );
};

export const SpinnerLoader = () => {
  return <Spinner animation="grow" variant="primary" />;
};
