import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FeedbackModal } from "@/components/FeedbackModal";
import { FeedbackTable } from "@/components/FeedbackTable";
import { CandidateFeedback, Decision } from "@/types/managerFeedback";

// Dummy data for demonstration
const dummyFeedbacks: CandidateFeedback[] = [
  {
    id: "1",
    name: "John Doe",
    resumeLink: "https://example.com/resume1.pdf",
    interviewDateTime: "2024-03-10 10:00 AM",
    decision: "Selected",
    feedback: "Strong technical skills and excellent problem-solving abilities. Great cultural fit.",
    feedbackSharedDate: "2024-03-10 2:30 PM",
  },
  {
    id: "2",
    name: "Jane Smith",
    resumeLink: "https://example.com/resume2.pdf",
    interviewDateTime: "2024-03-09 2:00 PM",
    decision: "Rejected",
    feedback: "Limited experience with required technologies. Communication skills need improvement.",
    feedbackSharedDate: "2024-03-09 5:15 PM",
  },
  {
    id: "3",
    name: "Mike Johnson",
    resumeLink: "https://example.com/resume3.pdf",
    interviewDateTime: "2024-03-08 11:30 AM",
    decision: "Selected",
    feedback: "Exceptional leadership experience and strong technical background.",
    feedbackSharedDate: "2024-03-08 3:45 PM",
  },
];

const ManagerFeedback = () => {
  const [selectedFeedback, setSelectedFeedback] = useState<CandidateFeedback | null>(null);
  const [filter, setFilter] = useState<"All" | Decision>("All");

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Hiring Manager Feedback</h1>
        <div className="flex gap-2 mb-4">
          <Button
            variant={filter === "All" ? "default" : "outline"}
            onClick={() => setFilter("All")}
          >
            All
          </Button>
          <Button
            variant={filter === "Selected" ? "default" : "outline"}
            onClick={() => setFilter("Selected")}
          >
            Selected
          </Button>
          <Button
            variant={filter === "Rejected" ? "default" : "outline"}
            onClick={() => setFilter("Rejected")}
          >
            Rejected
          </Button>
        </div>
      </div>

      <FeedbackTable
        feedbacks={dummyFeedbacks}
        onViewFeedback={setSelectedFeedback}
        filter={filter}
      />

      <FeedbackModal
        isOpen={!!selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
        feedback={selectedFeedback}
      />
    </div>
  );
};

export default ManagerFeedback;