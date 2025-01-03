import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Trash, Plus, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Criterion {
  id: number;
  name: string;
  description: string;
  weight: number;
}

const EvaluationCriteria = () => {
  const { toast } = useToast();
  const [criteria, setCriteria] = useState<Criterion[]>([
    {
      id: 1,
      name: "Relevant Experience",
      description: "Years of experience in similar roles",
      weight: 5,
    },
    {
      id: 2,
      name: "Technical Skills",
      description: "Proficiency in required technologies",
      weight: 4,
    },
    {
      id: 3,
      name: "Communication Skills",
      description: "Ability to communicate effectively",
      weight: 3,
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newCriterion, setNewCriterion] = useState({
    name: "",
    description: "",
    weight: 3,
  });

  const handleAdd = () => {
    if (!newCriterion.name) {
      toast({
        title: "Error",
        description: "Criterion name is required",
        variant: "destructive",
      });
      return;
    }

    setCriteria([
      ...criteria,
      {
        id: criteria.length + 1,
        ...newCriterion,
      },
    ]);
    setNewCriterion({ name: "", description: "", weight: 3 });
    setIsAdding(false);
    toast({
      title: "Success",
      description: "Criterion added successfully",
    });
  };

  const handleEdit = (id: number) => {
    const criterion = criteria.find((c) => c.id === id);
    if (criterion) {
      setEditingId(id);
      setNewCriterion({
        name: criterion.name,
        description: criterion.description,
        weight: criterion.weight,
      });
    }
  };

  const handleDelete = (id: number) => {
    setCriteria(criteria.filter((c) => c.id !== id));
    toast({
      title: "Success",
      description: "Criterion deleted successfully",
    });
  };

  const handleSaveEdit = () => {
    if (!newCriterion.name) {
      toast({
        title: "Error",
        description: "Criterion name is required",
        variant: "destructive",
      });
      return;
    }

    setCriteria(
      criteria.map((c) =>
        c.id === editingId
          ? { ...c, ...newCriterion }
          : c
      )
    );
    setEditingId(null);
    setNewCriterion({ name: "", description: "", weight: 3 });
    toast({
      title: "Success",
      description: "Criterion updated successfully",
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Evaluation Criteria</h1>
        <Button
          onClick={() => setIsAdding(true)}
          className="gap-2"
          disabled={isAdding}
        >
          <Plus className="h-4 w-4" />
          Add Criterion
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Criterion Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isAdding && (
              <TableRow>
                <TableCell>
                  <Input
                    placeholder="Enter criterion name"
                    value={newCriterion.name}
                    onChange={(e) =>
                      setNewCriterion({ ...newCriterion, name: e.target.value })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Textarea
                    placeholder="Enter description"
                    value={newCriterion.description}
                    onChange={(e) =>
                      setNewCriterion({
                        ...newCriterion,
                        description: e.target.value,
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    value={newCriterion.weight}
                    onChange={(e) =>
                      setNewCriterion({
                        ...newCriterion,
                        weight: parseInt(e.target.value),
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleAdd}
                    >
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setIsAdding(false)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {criteria.map((criterion) => (
              <TableRow key={criterion.id}>
                <TableCell>
                  {editingId === criterion.id ? (
                    <Input
                      value={newCriterion.name}
                      onChange={(e) =>
                        setNewCriterion({
                          ...newCriterion,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    criterion.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === criterion.id ? (
                    <Textarea
                      value={newCriterion.description}
                      onChange={(e) =>
                        setNewCriterion({
                          ...newCriterion,
                          description: e.target.value,
                        })
                      }
                    />
                  ) : (
                    criterion.description
                  )}
                </TableCell>
                <TableCell>
                  {editingId === criterion.id ? (
                    <Input
                      type="number"
                      min="1"
                      max="5"
                      value={newCriterion.weight}
                      onChange={(e) =>
                        setNewCriterion({
                          ...newCriterion,
                          weight: parseInt(e.target.value),
                        })
                      }
                    />
                  ) : (
                    criterion.weight
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    {editingId === criterion.id ? (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={handleSaveEdit}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setEditingId(null)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(criterion.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(criterion.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-end">
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EvaluationCriteria;