import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Building2, FileText, Users, ClipboardCheck, MessageSquare } from "lucide-react";

const navItems = [
  {
    title: "Company Setup",
    icon: Building2,
    path: "/",
  },
  {
    title: "Create Job",
    icon: FileText,
    path: "/create-job",
  },
  {
    title: "Evaluation",
    icon: ClipboardCheck,
    path: "/evaluation",
  },
  {
    title: "Applicants",
    icon: Users,
    path: "/applicants",
  },
  {
    title: "Feedback",
    icon: MessageSquare,
    path: "/feedback",
  },
];

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold">AI Hiring Assistant</h1>
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}