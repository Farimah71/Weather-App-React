import spinnerImg from "../assets/image/loading.png";

const Spinner = () => {
  return (
    <div>
      <img src={spinnerImg} className="rotate" />
    </div>
  );
};

export default Spinner;
