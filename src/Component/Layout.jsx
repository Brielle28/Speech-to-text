import PropTypes from "prop-types"; // Import PropTypes if you want to use them
import Footer from "./Footer";
import Navbar from "./Navbar";
import BrowserWarning from "./BrowserWarning";
import { ToastContainer } from 'react-toastify';

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <BrowserWarning />
            <Navbar />
            <main className="flex-grow">
                {children} {/* This will render the page content dynamically */}
            </main>
            <Footer /> {/* The footer will always be at the bottom */}
        </div>
    );
};

// Optional: Define prop types for better type checking
Layout.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children is a valid React node
};

export default Layout;