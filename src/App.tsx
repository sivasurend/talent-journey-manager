import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import CompanySetup from "./pages/CompanySetup";
import CreateJob from "./pages/CreateJob";
import EvaluationCriteria from "./pages/EvaluationCriteria";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen">
          <Navigation />
          <main className="flex-1 ml-64">
            <Routes>
              <Route path="/" element={<CompanySetup />} />
              <Route path="/create-job" element={<CreateJob />} />
              <Route path="/evaluation" element={<EvaluationCriteria />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;