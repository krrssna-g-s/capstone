import { Navigation } from "./Nav";

export const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="header-inner">
        <header className="header">
          <a href="/"><img src="/Logo.svg" alt="Little Lemon" /></a>
        </header>
        <Navigation />
      </div>
    </div>
  );
};
