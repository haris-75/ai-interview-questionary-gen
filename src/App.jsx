import AppToaster from "./AppToaster";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./auth/AuthProvider";
import { ThemeProvider } from "./theme/ThemeProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleOAuth } from "./utils";

const AppNormalMode = () => (
  <ThemeProvider>
    <AppToaster />
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </ThemeProvider>
);

const AppDevMode = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AppNormalMode />
    </GoogleOAuthProvider>
  );
};

function App() {
  return <>{useGoogleOAuth ? <AppDevMode /> : <AppNormalMode />}</>;
}

export default App;
