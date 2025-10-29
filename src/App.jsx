import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShareDetails from "./pages/ShareDetails";
import ShareResume from "./pages/ShareResume";
import InterviewQuestions from "./pages/InterviewQuestions";
import ROUTES from "./routes";
import ThemeToggle from "./components/ThemeToggle";
import useTheme from "./hooks/useTheme";
import { Toaster } from "react-hot-toast";
import AppToaster from "./AppToaster";

function AppRoutes() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg to-elevated flex items-center justify-center p-4 transition-colors duration-300 font-sans">
      <ThemeToggle toggleTheme={toggleTheme} isDark={isDark} />
      <AppToaster />
      <Routes>
        <Route path={`${ROUTES.HOME}`} element={<Home />} />
        <Route path={`/${ROUTES.SHARE_DETAILS}`} element={<ShareDetails />} />
        <Route path={`/${ROUTES.SHARE_RESUME}`} element={<ShareResume />} />
        <Route
          path={`/${ROUTES.INTERVIEW_QUESTIONS}`}
          element={<InterviewQuestions />}
        />
      </Routes>
    </div>
  );
}
function App() {
  return <AppRoutes />;
}

export default App;
