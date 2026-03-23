export const Button = ({
  className = "",
  text = "",
  onClick = () => {},
  ghost = false,
  width = "120px",
}) => {
  return (
    <button
      className={className}
      style={{
        backgroundColor: ghost ? "" : "#E2211C",
        // padding: "12px 20px",
        borderRadius: "16px",
        color: "white",
        border: "0px solid",
        width: width,
        height: "40px",
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
