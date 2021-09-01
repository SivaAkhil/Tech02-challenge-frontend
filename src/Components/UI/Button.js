import "./button.css";

const Button = (props) => {
  return (
    <button
      className="button"
      style={{ width: `${props.width}`, height: `${props.height}` }}
    >
      {props.name}
    </button>
  );
};

export default Button;
