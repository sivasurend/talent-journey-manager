import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Info, FileText, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Applicant {
  id: string;
  applicationDate: string;
  name: string;
  resumeLink: string;
  status: "Shortlisted" | "Rejected" | "Pending";
  reason: string;
  meetingScheduled: boolean;
}

// Dummy data for demonstration
const dummyApplicants: Applicant[] = [
  {
    id: "1",
    applicationDate: "2024-03-10",
    name: "John Doe",
    resumeLink: "https://example.com/resume1.pdf",
    status: "Shortlisted",
    reason: "Strong technical background and excellent communication skills",
    meetingScheduled: true,
  },
  {
    id: "2",
    applicationDate: "2024-03-09",
    name: "Jane Smith",
    resumeLink: "https://example.com/resume2.pdf",
    status: "Rejected",
    reason: "Insufficient experience in required technologies",
    meetingScheduled: false,
  },
  {
    id: "3",
    applicationDate: "2024-03-08",
    name: "Mike Johnson",
    resumeLink: "https://example.com/resume3.pdf",
    status: "Pending",
    reason: "",
    meetingScheduled: false,
  },
  {
    id: "4",
    applicationDate: "2024-03-07",
    name: "Sarah Williams",
    resumeLink: "https://example.com/resume4.pdf",
    status: "Shortlisted",
    reason: "Perfect match for the role with relevant project experience",
    meetingScheduled: true,
  },
];

const Applicants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(
    null
  );

  const filteredApplicants = dummyApplicants.filter((applicant) =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Applicant["status"]) => {
    switch (status) {
      case "Shortlisted":
        return "text-success";
      case "Rejected":
        return "text-destructive";
      default:
        return "text-warning";
    }
  };

  const getStatusIcon = (status: Applicant["status"]) => {
    switch (status) {
      case "Shortlisted":
        return <CheckCircle className="h-4 w-4" />;
      case "Rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Applicants</h1>
        <Input
          placeholder="Search applicants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Meeting Scheduled</TableHead>
              <TableHead>Reason</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApplicants.map((applicant) => (
              <TableRow key={applicant.id}>
                <TableCell>{applicant.applicationDate}</TableCell>
                <TableCell>{applicant.name}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" asChild>
                    <a
                      href={applicant.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      View Resume
                    </a>
                  </Button>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      "flex items-center gap-2",
                      getStatusColor(applicant.status)
                    )}
                  >
                    {getStatusIcon(applicant.status)}
                    {applicant.status}
                  </span>
                </TableCell>
                <TableCell>
                  {applicant.status === "Shortlisted" ? (
                    <span
                      className={cn(
                        "px-2 py-1 rounded-full text-sm",
                        applicant.meetingScheduled
                          ? "bg-success/20 text-success"
                          : "bg-warning/20 text-warning"
                      )}
                    >
                      {applicant.meetingScheduled ? "Yes" : "No"}
                    </span>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  {applicant.reason && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedApplicant(applicant)}
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedApplicant}
        onOpenChange={() => setSelectedApplicant(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">
                  {selectedApplicant?.name} -{" "}
                  <span className={getStatusColor(selectedApplicant?.status!)}>
                    {selectedApplicant?.status}
                  </span>
                </h3>
                <p className="text-muted-foreground">{selectedApplicant?.reason}</p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Applicants;