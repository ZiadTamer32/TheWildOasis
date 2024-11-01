import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Cabins from "./pages/Cabins";
import PageNotFound from "./pages/PageNotFound";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectRoute from "./ui/ProtectRoute";
import { DarkModeProvider } from "./context/DarkModeContext";

function App() {
  const reactQuery = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0
      }
    }
  });
  return (
    <DarkModeProvider>
      <QueryClientProvider client={reactQuery}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectRoute>
                  <AppLayout />
                </ProtectRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="bookings" element={<Bookings />} />
              <Route path="bookings/:bookingId" element={<Booking />} />
              <Route path="checkin/:bookingId" element={<Checkin />} />
              <Route path="cabins" element={<Cabins />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 3000 },
            error: { duration: 5000 },
            style: {
              fontSize: "18px",
              maxWidth: "500px",
              padding: "18px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)"
            }
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
