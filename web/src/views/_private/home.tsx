import { createFileRoute } from "@tanstack/react-router";
import { TypographyH1 } from "@/components/ui/typography-h1";

export const Route = createFileRoute("/_private/home")({
  component: HomeView,
});

function HomeView() {
  return <TypographyH1>Hello "/_private/home"!</TypographyH1>;
}
