const Button = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`btn btn-primary rounded-full px-8 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;