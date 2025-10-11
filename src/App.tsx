import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PlantsListing from "./pages/PlantsListing";
import PlantDetail from "./pages/PlantDetail";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Cultivation from "./pages/Cultivation";
import Contact from "./pages/Contact";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ui/scroll-top";
import CultivationDetail from "./pages/CultivationDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
         <ScrollToTop /> 
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/plants" element={<PlantsListing />} />
          <Route path="/plants/detail/:id" element={<PlantDetail />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/detail/:id" element={<ArticleDetail />} />
          <Route path="/cultivation" element={<Cultivation />} />
          <Route path="/cultivation/detail/:id" element={<CultivationDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<SearchResults />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
