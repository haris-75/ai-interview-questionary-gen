// TODO: Needs Refactoring
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import ShareDetails from "./pages/ShareDetails";
import ShareResume from "./pages/ShareResume";
import InterviewQuestions from "./pages/InterviewQuestions";

import { ProtectedRoute } from "./auth/ProtectedRoute";
import ROUTES from "./routes";
import Home from "./pages/Home";
import InterroApp from "./pages/InterroApp";
import AppShellLayout from "./pages/AppShellLayout";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import History from "./pages/History";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={`/${ROUTES.SIGNIN}`} element={<SignIn />} />

      <Route element={<ProtectedRoute />}>
        <Route path={`/${ROUTES.APP}`} element={<AppShellLayout />}>
          {/* /app */}
          <Route index element={<InterroApp />} />

          {/* /app/share-details */}
          <Route path={ROUTES.SHARE_DETAILS} element={<ShareDetails />} />

          {/* /app/share-resume */}
          <Route path={ROUTES.SHARE_RESUME} element={<ShareResume />} />

          {/* /app/interview-questions */}
          <Route
            path={ROUTES.INTERVIEW_QUESTIONS}
            element={<InterviewQuestions />}
          />

          {/* /app/history */}
          <Route path={ROUTES.HISTORY} element={<History />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
