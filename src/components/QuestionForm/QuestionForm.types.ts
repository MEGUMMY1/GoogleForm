import { QuestionFormState } from "../../pages/FormPage";

export interface QuestionFormProps {
  id: number;
  questionType: string;
  isRequired: boolean;
  onDelete: (id: number) => void;
  onCopy: (id: number) => void;
  onUpdateFormState: (id: number, updatedState: Partial<QuestionFormState>) => void;
}
