import { IAssessmentDetail } from "@/interfaces/assessment-detail.interface";
import { IAssessmentSummary } from "@/interfaces/assessment-summary.interface";
import { IAssessment } from "@/interfaces/assessment.interface";
import { AssessmentCreateDto } from "@/interfaces/dto/assessment-create.dto";
import { baseURL } from "@/utils/constant";
import { useQuery } from "@tanstack/react-query";

const timeout = 10000;

const url = {
  base: `${baseURL}/assessments`,
};

const hooks = {
  Get: () => {
    const {
      data: assessments,
      isLoading,
      isError,
      error,
      refetch,
    } = useQuery<IAssessment[]>({
      queryKey: ["assessments"],
      queryFn: async () => {
        const response = await fetch(url.base, {
          signal: AbortSignal.timeout(timeout),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      },
    });

    return {
      assessments,
      isLoading,
      isError,
      error,
      refetch,
    };
  },
  GetDetail: (code?: string) => {
    const {
      data: assessment,
      isLoading,
      isError,
      error,
      refetch,
    } = useQuery<IAssessmentDetail>({
      queryKey: ["assessments", code],
      queryFn: async () => {
        const response = await fetch(`${url.base}/${code}`, {
          signal: AbortSignal.timeout(timeout),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      },
      enabled: !!code, // Only run the query if code is defined
    });

    return {
      assessment,
      isLoading,
      isError,
      error,
      refetch,
    };
  },
  GetSummary: (respondentId?: string) => {
    const {
      data: summary,
      isLoading,
      isError,
      error,
      refetch,
    } = useQuery<IAssessmentSummary>({
      queryKey: ["assessments", "summary", respondentId],
      queryFn: async () => {
        const response = await fetch(`${url.base}/summary/${respondentId}`, {
          signal: AbortSignal.timeout(timeout),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      },
      enabled: !!respondentId, // Only run the query if respondentId is defined
    });

    return {
      summary,
      isLoading,
      isError,
      error,
      refetch,
    };
  },
};

interface AssessmentCreateResponse {
  message: string;
  is_success: boolean;
  data: {
    respondent_id: number;
    first_name: string;
    last_name: string;
    department: string;
    years_working: number;
  };
}

const api = {
  create: async (
    data: AssessmentCreateDto
  ): Promise<AssessmentCreateResponse> => {
    const result = await fetch(url.base, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(timeout),
    });
    const json = await result.json();
    if (!result.ok) {
      throw new Error(json.message || "Failed to create assessment");
    }

    return {
      message: json.message,
      is_success: json.is_success,
      data: json.data,
    };
  },
};

export const AssessmentRepository = {
  url,
  hooks,
  api,
};
