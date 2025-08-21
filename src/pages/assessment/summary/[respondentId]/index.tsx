import { AssessmentRepository } from "@/repository/assessment.repository";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Group,
  LoadingOverlay,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";

export default function ResultPage() {
  const { query, push } = useRouter();
  const { respondentId } = query;
  const { summary, isLoading, error } = AssessmentRepository.hooks.GetSummary(
    respondentId as string | undefined
  );

  if (error) {
    return (
      <Stack justify="center" align="center" className="min-h-screen">
        <Text color="red">
          Error loading assessment summary: {error.message}
        </Text>
        <Button onClick={() => push("/")}>Go Back</Button>
      </Stack>
    );
  }

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <div className="font-sans min-h-screen flex">
        <div className="w-full max-w-5xl px-4 py-8 mx-auto">
          <Card withBorder radius="md" shadow="sm">
            <h1 className="text-2xl font-bold mb-4 text-center">
              Assessment Summary
            </h1>
            <Divider my="md" />
            {/* Profile  */}
            <Stack>
              <h2 className="text-xl font-semibold mb-2">
                Respondent: {summary?.respondent.first_name}
                {summary?.respondent.last_name}
              </h2>
              <p>Department: {summary?.respondent.department}</p>
              <p>Years Working: {summary?.respondent.years_working}</p>
            </Stack>
            <Divider my="md" />
            <Grid gutter={"lg"}>
              <Grid.Col
                span={{
                  base: 12,
                  md: 6,
                }}
              >
                <Card shadow="xs" padding="lg" radius="md" withBorder>
                  <Card.Section inheritPadding py={"xs"}>
                    Maximum Points to Achieve
                  </Card.Section>
                  <Group justify="center" align="center">
                    <Avatar
                      alt={`${summary?.respondent.first_name} ${summary?.respondent.last_name}`}
                      radius="xl"
                      size="xl"
                      name={`${summary?.max_point}`}
                    ></Avatar>
                  </Group>
                </Card>
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 12,
                  md: 6,
                }}
              >
                <Card shadow="xs" padding="lg" radius="md" withBorder>
                  <Card.Section inheritPadding py={"xs"}>
                    Average Score
                  </Card.Section>
                  <Group justify="center" align="center">
                    <Avatar
                      alt={`${summary?.respondent.first_name} ${summary?.respondent.last_name}`}
                      radius="xl"
                      size="xl"
                      name={`${summary?.average_point}`}
                    ></Avatar>
                  </Group>
                </Card>
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 12,
                  md: 6,
                }}
              >
                <Card shadow="xs" padding="lg" radius="md" withBorder>
                  <Card.Section inheritPadding py={"xs"}>
                    Earned Points
                  </Card.Section>
                  <Group justify="center" align="center">
                    <Avatar
                      alt={`${summary?.respondent.first_name} ${summary?.respondent.last_name}`}
                      radius="xl"
                      size="xl"
                      name={`${summary?.earned_point}`}
                    ></Avatar>
                  </Group>
                </Card>
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 12,
                  md: 6,
                }}
              >
                <Card shadow="xs" padding="lg" radius="md" withBorder>
                  <Card.Section inheritPadding py={"xs"}>
                    Percentage Score
                  </Card.Section>
                  <Group justify="center" align="center">
                    <Avatar
                      alt={`${summary?.respondent.first_name} ${summary?.respondent.last_name}`}
                      radius="xl"
                      size="xl"
                      name={`${summary?.percentage_point}`}
                    ></Avatar>
                  </Group>
                </Card>
              </Grid.Col>
            </Grid>
          </Card>
        </div>
      </div>
    </>
  );
}
