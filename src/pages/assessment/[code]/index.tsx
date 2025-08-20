import { AssessmentRepository } from "@/repository/assessment.repository";
import {
  Button,
  Card,
  Chip,
  ChipGroup,
  Container,
  Divider,
  Group,
  LoadingOverlay,
  NumberInput,
  Radio,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";

export default function AssessmentDetailPage() {
  const { query, replace } = useRouter();
  const { code } = query;
  const { assessment, isLoading } = AssessmentRepository.hooks.GetDetail(
    code as string | undefined
  );

  const [answer, setAnswer] = useState<Record<number, number>>({});

  const form = useForm({
    initialValues: {
      profile: {
        first_name: "",
        last_name: "",
        department: "",
        years_working: 0,
      },

      // Key-Value pairs for each question
    },
    validate: {
      profile: {
        first_name: (value) => (value ? null : "First name is required"),
        last_name: (value) => (value ? null : "Last name is required"),
        department: (value) => (value ? null : "Department is required"),
        years_working: (value) =>
          value > 0 ? null : "Years working must be greater than 0",
      },
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    console.log({
      ...values,
      answers: answer,
    });

    try {
      const result = await AssessmentRepository.api.create({
        profile: {
          department: values.profile.department,
          first_name: values.profile.first_name,
          last_name: values.profile.last_name,
          years_working: values.profile.years_working,
        },
        assessment: {
          template_id: assessment?.template_id ?? 0,
          answer: Object.entries(answer).map(([questionId, optionId]) => ({
            question_id: Number(questionId),
            option_id: Number(optionId),
          })),
        },
      });

      console.log("Assessment created successfully:", result);
      alert("Assessment created successfully");

      replace(`/assessment/summary/${result.data.respondent_id}`);
    } catch (error: unknown) {
      console.error("Error creating assessment:", error);
      alert("Failed to create assessment");
    }
  };

  const onAnswerChange = (questionId: string, optionId: string) => {
    setAnswer((prev) => ({ ...prev, [questionId]: optionId }));
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <LoadingOverlay visible={isLoading} />

      <div className="font-sans min-h-screen flex">
        <div className="w-full max-w-5xl px-4 py-8 mx-auto">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            {assessment && (
              <div>
                <h1 className="text-2xl font-bold">{assessment.name}</h1>
                <p className="mt-2">{assessment.description}</p>
              </div>
            )}
            <Divider my="md" />
            <Stack>
              <h2 className="text-xl font-semibold">Profile</h2>
              <TextInput
                withAsterisk
                label="First Name"
                placeholder="First NAME"
                key={form.key("profile.first_name")}
                {...form.getInputProps("profile.first_name")}
              />
              <TextInput
                withAsterisk
                label="Last Name"
                placeholder="Last NAME"
                key={form.key("profile.last_name")}
                {...form.getInputProps("profile.last_name")}
              />
              <TextInput
                withAsterisk
                label="Department"
                placeholder="Department"
                key={form.key("profile.department")}
                {...form.getInputProps("profile.department")}
              />
              <NumberInput
                withAsterisk
                label="Years Working"
                placeholder="Years Working"
                key={form.key("profile.years_working")}
                {...form.getInputProps("profile.years_working")}
              />
            </Stack>
            <Divider my="md" />
            {assessment?.categories.map((category) => {
              return (
                <>
                  <div key={category.question_category_id}>
                    <h2 className="text-xl font-semibold pb-2">
                      {category.name}
                    </h2>
                    <Stack>
                      {category.questions.map((question) => {
                        if (question.type == "rating") {
                          return (
                            <Card
                              padding="sm"
                              shadow="xs"
                              key={question.question_id}
                              withBorder
                            >
                              <Stack>
                                <Text size="lg">{question.label}</Text>
                                <ChipGroup
                                  key={question.question_id}
                                  value={`${answer[question.question_id]}`}
                                  onChange={(value) =>
                                    onAnswerChange(
                                      `${question.question_id}`,
                                      `${value}`
                                    )
                                  }
                                >
                                  <Group justify="space-around">
                                    {question.options.map((option) => (
                                      <Chip
                                        key={option.option_id}
                                        value={option.option_id.toString()}
                                      >
                                        {option.label}
                                      </Chip>
                                    ))}
                                  </Group>
                                </ChipGroup>
                              </Stack>
                            </Card>
                          );
                        }

                        if (question.type == "radio") {
                          return (
                            <Card
                              withBorder
                              padding="sm"
                              shadow="xs"
                              key={question.question_id}
                            >
                              <Stack>
                                <Text size="lg">{question.label}</Text>
                                <Radio.Group
                                  name={`${question.question_id}`}
                                  value={`${answer[question.question_id]}`}
                                  onChange={(value) =>
                                    onAnswerChange(
                                      `${question.question_id}`,
                                      `${value}`
                                    )
                                  }
                                >
                                  <Group mt="xs" justify="space-around">
                                    {question.options.map((option) => (
                                      <Radio
                                        key={`${option.option_id}`}
                                        value={`${option.option_id}`}
                                        label={`${option.label}`}
                                      />
                                    ))}
                                  </Group>
                                </Radio.Group>
                              </Stack>
                            </Card>
                          );
                        }

                        return null;
                      })}
                    </Stack>
                  </div>
                  <Divider my="md" />
                </>
              );
            }) ?? []}

            <Button
              type="submit"
              size="lg"
              variant="filled"
              color="green"
              fullWidth
            >
              Submit
            </Button>
          </Card>
        </div>
      </div>
    </form>
  );
}
