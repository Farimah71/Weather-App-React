import sadFace from "../assets/image/sad-face.png";

const NotFound = () => {
  return (
    <div>
      <p className="not-found-prompt">City not found!</p>
      <img src={sadFace} alt="Not found" />
    </div>
  );
};

export default NotFound;
