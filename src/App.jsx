import { BrowserRouter as Router, useLocation } from "react-router-dom";
import { LabDataProvider } from "./context/LabDataContext";
import { LoadingProvider } from "./context/LoadingContext";
import { AuthProvider } from "./context/authContext";
import AppRoutes from "./routes/routes";
import LoadingScreen from "./components/loading";
import { Header, Footer } from "./components";
import { BookingReservs, ProfileEditModal } from "./pages/modais";
function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isHomePage = location.pathname === "/";
  const isAdm = location.pathname === "/administracao";

  return (
    <>
      {!isAdm && !isHomePage && !isLoginPage && <Header />}
      <main>
        <AppRoutes />
      </main>
      { !isAdm && !isLoginPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <Router>
          <LabDataProvider>
            <div style={{ position: "relative" }}>
              <LoadingScreen />
              <ProfileEditModal />
              <BookingReservs />
              <Layout />
            </div>
          </LabDataProvider>
        </Router>
      </LoadingProvider>
    </AuthProvider>
  );
}

export default App;
