export interface IAssessmentSummary {
  id?: number;
  respondent_id?: number;
  max_point?: number;
  earned_point?: number;
  percentage_point?: number;
  average_point?: number;
  created_at?: Date;
  respondent: {
    id?: number;
    first_name?: string;
    last_name?: string;
    department?: string;
    years_working?: number;
  };
}
