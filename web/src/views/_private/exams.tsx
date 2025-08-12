import { createFileRoute } from "@tanstack/react-router";
import { TypographyH1 } from "@/components/ui/typography-h1";

export const Route = createFileRoute("/_private/exams")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: "Provas | Exebec",
      },
    ],
  }),
});

function RouteComponent() {
  return <TypographyH1>Hello "/_private/exams"!</TypographyH1>;
}
