import Header from "../components/header";
import Footer from "../components/footer";

const FrontEndLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default FrontEndLayout;
