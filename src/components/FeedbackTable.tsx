import { FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CandidateFeedback } from "@/types/managerFeedback";

interface FeedbackTableProps {
  feedbacks: CandidateFeedback[];
  onViewFeedback: (feedback: CandidateFeedback) => void;
  filter: "All" | "Selected" | "Rejected";
}

export const FeedbackTable = ({ feedbacks, onViewFeedback, filter }: FeedbackTableProps) => {
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    if (filter === "All") return true;
    return feedback.decision === filter;
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate Name</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Interview Date & Time</TableHead>
            <TableHead>Decision</TableHead>
            <TableHead>Feedback</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFeedbacks.map((feedback) => (
            <TableRow key={feedback.id}>
              <TableCell>{feedback.name}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={feedback.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    View Resume
                  </a>
                </Button>
              </TableCell>
              <TableCell>{feedback.interviewDateTime}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                    feedback.decision === "Selected"
                      ? "bg-success/20 text-success"
                      : "bg-destructive/20 text-destructive"
                  }`}
                >
                  {feedback.decision}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewFeedback(feedback)}
                >
                  <Info className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};