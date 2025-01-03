import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function CreateJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [requirements, setRequirements] = useState("");
  const [generatedJD, setGeneratedJD] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleGenerateJD = () => {
    // TODO: Implement actual JD generation
    setGeneratedJD("Sample generated job description based on requirements...");
  };

  const handleUpdateJD = () => {
    // TODO: Implement JD update based on feedback
    setGeneratedJD("Updated job description based on feedback...");
  };

  const handleSaveJD = () => {
    // TODO: Implement save functionality
    console.log("Saving final JD...");
  };

  return (
    <div className="container mx-auto py-6 px-4 mt-16">
      <h1 className="text-2xl font-bold mb-6">Create Job Posting</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column - Input Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="Enter job title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">Job Requirements</Label>
            <Textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Enter required qualifications, skills, experience level, etc."
              className="min-h-[200px]"
            />
          </div>

          <Button onClick={handleGenerateJD} className="w-full">
            Generate Job Description
          </Button>
        </div>

        {/* Right Column - Generated JD and Feedback */}
        <div className="space-y-6">
          <Card className="p-4">
            <Label>Generated Job Description</Label>
            <Textarea
              value={generatedJD}
              readOnly
              className="mt-2 min-h-[200px]"
            />
          </Card>

          <div className="space-y-2">
            <Label htmlFor="feedback">Improve Description</Label>
            <Textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Enter your suggestions for improving the job description"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex gap-4">
            <Button onClick={handleUpdateJD} variant="outline" className="flex-1">
              Update JD
            </Button>
            <Button onClick={handleSaveJD} className="flex-1">
              Save Final JD
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}