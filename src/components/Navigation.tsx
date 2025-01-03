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
    <nav className="fixed left-0 top-0 bottom-0 w-64 bg-white/80 backdrop-blur-sm border-r shadow-sm">
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-6">AI Hiring Assistant</h1>
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}