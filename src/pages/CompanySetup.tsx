import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

export default function CompanySetup() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    about: "",
    instructions: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the data
    toast({
      title: "Success",
      description: "Company information saved successfully",
    });
    navigate("/create-job");
  };

  return (
    <div className="container max-w-2xl py-20 animate-in">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Company Setup</h2>
          <p className="text-sm text-muted-foreground">
            Enter your company information and job description preferences.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="companyName" className="text-sm font-medium">
                Company Name
              </label>
              <Input
                id="companyName"
                placeholder="Enter company name"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="website" className="text-sm font-medium">
                Company Website
              </label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="about" className="text-sm font-medium">
                About the Company
              </label>
              <Textarea
                id="about"
                placeholder="Enter a brief description of your company"
                value={formData.about}
                onChange={(e) =>
                  setFormData({ ...formData, about: e.target.value })
                }
                required
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="instructions" className="text-sm font-medium">
                Job Description Instructions
              </label>
              <Textarea
                id="instructions"
                placeholder="Enter instructions for generating job descriptions"
                value={formData.instructions}
                onChange={(e) =>
                  setFormData({ ...formData, instructions: e.target.value })
                }
                required
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="submit" size="lg">
              Save & Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}