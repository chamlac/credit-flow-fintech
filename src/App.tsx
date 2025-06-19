
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import DocumentUploadPage from "./pages/documents/DocumentUploadPage";
import DocumentTypePage from "./pages/kyc/DocumentTypePage";
import DocumentPhotoPage from "./pages/kyc/DocumentPhotoPage";
import NFCScanPage from "./pages/kyc/NFCScanPage";
import VerifyInfoPage from "./pages/kyc/VerifyInfoPage";
import IdentityVerificationPage from "./pages/kyc/IdentityVerificationPage";
import SelfiePage from "./pages/kyc/SelfiePage";
import SelfieSuccessPage from "./pages/kyc/SelfieSuccessPage";
import PhoneVerificationPage from "./pages/kyc/PhoneVerificationPage";
import OTPVerificationPage from "./pages/kyc/OTPVerificationPage";
import PhoneSuccessPage from "./pages/kyc/PhoneSuccessPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="mobile-container flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="mobile-container flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-gray-200 border-t-primary rounded-full"></div>
      </div>
    );
  }
  
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      } />
      
      {/* Document Upload Flow */}
      <Route path="/documents/upload" element={
        <ProtectedRoute>
          <DocumentUploadPage />
        </ProtectedRoute>
      } />
      <Route path="/new-application" element={
        <ProtectedRoute>
          <DocumentUploadPage />
        </ProtectedRoute>
      } />
      
      {/* KYC Flow */}
      <Route path="/kyc/document-type" element={
        <ProtectedRoute>
          <DocumentTypePage />
        </ProtectedRoute>
      } />
      <Route path="/kyc/document-photo" element={
        <ProtectedRoute>
          <DocumentPhotoPage />
        </ProtectedRoute>
      } />
      <Route path="/kyc/nfc-scan" element={
        <ProtectedRoute>
          <NFCScanPage />
        </ProtectedRoute>
      } />
      <Route path="/kyc/verify-info" element={
        <ProtectedRoute>
          <VerifyInfoPage />
        </ProtectedRoute>
      } />
      <Route path="/kyc/identity" element={
        <ProtectedRoute>
          <IdentityVerificationPage />
        </ProtectedRoute>
      } />
      <Route path="/kyc/selfie" element={
        <ProtectedRoute>
          <SelfiePage />
        </ProtectedRoute>
      } />
      <Route path="/kyc/selfie-success" element={
        <ProtectedRoute>
          <SelfieSuccessPage />
        </ProtectedRoute>
      } />
      
      {/* Phone Verification Flow */}
      <Route path="/verify-phone" element={
        <ProtectedRoute>
          <PhoneVerificationPage />
        </ProtectedRoute>
      } />
      <Route path="/verify-phone/otp" element={
        <ProtectedRoute>
          <OTPVerificationPage />
        </ProtectedRoute>
      } />
      <Route path="/kyc/phone-success" element={
        <ProtectedRoute>
          <PhoneSuccessPage />
        </ProtectedRoute>
      } />
      
      {/* Placeholder routes for future implementation */}
      <Route path="/credits" element={
        <ProtectedRoute>
          <div className="mobile-container flex items-center justify-center min-h-screen">
            <p>Page Crédits - À venir</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/support" element={
        <ProtectedRoute>
          <div className="mobile-container flex items-center justify-center min-h-screen">
            <p>Page Support - À venir</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <div className="mobile-container flex items-center justify-center min-h-screen">
            <p>Page Profil - À venir</p>
          </div>
        </ProtectedRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
