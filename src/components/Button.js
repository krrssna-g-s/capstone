
export const Button = ({ children, onClick, type = 'button', ...props }) => {
  return (
    <button className="button" type={type} onClick={onClick} {...props}>
      {children}
    </button>
  );
}