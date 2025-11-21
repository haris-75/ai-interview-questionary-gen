import AppToaster from "./AppToaster";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./auth/AuthProvider";
import { ThemeProvider } from "./theme/ThemeProvider";

function App() {
  return (
    <>
      <ThemeProvider>
        <AppToaster />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
