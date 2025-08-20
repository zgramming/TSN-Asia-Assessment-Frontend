export interface AssessmentCreateDto {
  profile: {
    first_name: string;
    last_name: string;
    department: string;
    years_working: number;
  };
  assessment: {
    template_id: number;
    answer: {
      question_id: number;
      option_id: number;
    }[];
  };
}
