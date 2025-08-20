export interface IAssessmentDetail {
  template_id: number;
  code: string;
  name: string;
  description: string;
  is_active: boolean;
  categories: IQuestionCategory[];
}

interface IQuestionCategory {
  question_category_id: number;
  template_id: number;
  name: string;
  display_order: number;
  questions: IQuestion[];
}

interface IQuestion {
  question_id: number;
  question_category_id: number;
  template_id: number;
  label: string;
  type: string;
  max_weight_value: number;
  display_order: number;
  options: IQuestionOption[];
}

interface IQuestionOption {
  option_id: number;
  question_id: number;
  label: string;
  value: string;
  weight: number;
  display_order: number;
}
