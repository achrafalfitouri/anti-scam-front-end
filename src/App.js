import "./App.css";
import { useAuth } from "./contexts/AuthProvider";
import { NavRoutes } from "./Routes/NavRoutes";
import { Toaster } from "react-hot-toast";
import { usePosts } from "./contexts/PostsProvider";
import { Loader } from "./components/Loader/Loader";
import ScrollToTop from "react-scroll-to-top";

function App() {
  const { postLoading } = usePosts();
  return (
    <div className="App">
     
      <NavRoutes />
    
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          success: { duration: 1500 },
          error: { duration: 1500 },
        }}
        containerStyle={{
          top: "6rem",
        }}
      />
            <ScrollToTop smooth color="white" style={{backgroundColor :' #1d9bf0' , right : "1rem"}} />

    </div>
  );
}

export default App;
