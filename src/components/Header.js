import { Navigation } from "./Nav";

export const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="header-inner">
        <header className="header">
          <img src="/Logo.svg" alt="Little Lemon" />
        </header>
        <Navigation />
      </div>
    </div>
  );
};
