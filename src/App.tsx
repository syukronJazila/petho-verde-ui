import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "@/components/ui/scroll-top";
import { isAuthenticated } from "@/utils/auth";
import { AdminLayout } from "@/components/AdminLayout";

// 🧭 Import halaman USER
import Index from "@/pages/Index";
import PlantsListing from "@/pages/PlantsListing";
import PlantDetail from "@/pages/PlantDetail";
import Articles from "@/pages/Articles";
import ArticleDetail from "@/pages/ArticleDetail";
import Cultivation from "@/pages/Cultivation";
import CultivationDetail from "@/pages/CultivationDetail";
import Contact from "@/pages/Contact";
import SearchResults from "@/pages/SearchResults";
import NotFound from "@/pages/NotFound";

// 🧭 Import halaman ADMIN
import Dashboard from "@/pages/admin/Dashboard";
import TanamanList from "@/pages/admin/TanamanList";
import TanamanForm from "@/pages/admin/TanamanForm";
import BudidayaList from "@/pages/admin/BudidayaList";
import BudidayaForm from "@/pages/admin/BudidayaForm";
import ArtikelList from "@/pages/admin/ArtikelList";
import ArtikelForm from "@/pages/admin/ArtikelForm";
import Kontak from "@/pages/admin/Kontak";
import Users from "@/pages/admin/Users";
import Settings from "@/pages/admin/Settings";
import Login from "@/pages/admin/Login";

const queryClient = new QueryClient();

// 🧱 Komponen proteksi halaman admin
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* 🌿 ROUTES UNTUK USER */}
          <Route path="/" element={<Index />} />
          <Route path="/plants" element={<PlantsListing />} />
          <Route path="/plants/detail/:id" element={<PlantDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/detail/:id" element={<ArticleDetail />} />
          <Route path="/cultivation" element={<Cultivation />} />
          <Route path="/cultivation/detail/:id" element={<CultivationDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchResults />} />

          {/* 🧭 LOGIN ADMIN */}
          <Route path="/admin" element={<Login />} />

          {/* 🧭 HALAMAN ADMIN (dilindungi) */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="tanaman" element={<TanamanList />} />
                    <Route path="tanaman/baru" element={<TanamanForm />} />
                    <Route path="tanaman/:id/edit" element={<TanamanForm />} />
                    <Route path="budidaya" element={<BudidayaList />} />
                    <Route path="budidaya/baru" element={<BudidayaForm />} />
                    <Route path="budidaya/:id/edit" element={<BudidayaForm />} />
                    <Route path="artikel" element={<ArtikelList />} />
                    <Route path="artikel/baru" element={<ArtikelForm />} />
                    <Route path="artikel/:id/edit" element={<ArtikelForm />} />
                    <Route path="kontak" element={<Kontak />} />
                    <Route path="users" element={<Users />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />

          {/* 🔚 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
