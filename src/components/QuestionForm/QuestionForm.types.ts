import { QuestionFormState } from "../../redux/formSlice";

export interface QuestionFormProps {
  id: number;
  questionType: string;
  isRequired: boolean;
  questionText: string;
  options: { id: number; text: string }[];
  onDelete: (id: number) => void;
  onCopy: (id: number) => void;
  onUpdateFormState: (id: number, updatedState: Partial<QuestionFormState>) => void;
}
