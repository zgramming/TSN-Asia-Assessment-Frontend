import { AssessmentRepository } from "@/repository/assessment.repository";
import {
  Button,
  Card,
  Group,
  Image,
  LoadingOverlay,
  Stack,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();
  const { assessments, isLoading, error } = AssessmentRepository.hooks.Get();

  if (error) {
    return (
      <Stack justify="center" align="center" className="min-h-screen">
        <Text color="red">Error loading assessments: {error.message}</Text>
        <Button onClick={() => push("/")}>Go Back</Button>
      </Stack>
    );
  }

  return (
    <>
      <LoadingOverlay visible={isLoading} />
      <div className="font-sans min-h-screen flex items-center justify-center">
        <div className="w-full max-w-5xl px-4 py-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assessments?.map((card) => {
              const url = `/assessment/${card.code}`;
              return (
                <Card
                  key={card.template_id}
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                >
                  <Card.Section>
                    <Image
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                      height={160}
                      alt="Norway"
                    />
                  </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{card.name}</Text>
                  </Group>

                  <Text size="sm" c="dimmed" lineClamp={1}>
                    {card.description}
                  </Text>

                  <Button
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={() => push(url)}
                  >
                    Start Assessment
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
