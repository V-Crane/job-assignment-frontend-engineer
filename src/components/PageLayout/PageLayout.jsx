import { Footer } from "../Footer/Footer";
import { NavBar } from "../NavBar/NavBar";
import "./PageLayout.css";

export const PageLayout = ({ children }) => {
  return (
    <div className="page-container">
      <NavBar />
        {children}
      <Footer />
    </div>
  );
};
