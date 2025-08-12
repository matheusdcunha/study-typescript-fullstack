import { Button } from "@/components/ui/button";
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from "@tanstack/react-router";

const checkAuth = () => {
  const token = sessionStorage.getItem("authToken");
  return !!token;
};

export const Route = createFileRoute("/_private")({
  beforeLoad: ({ location }) => {
    if (!checkAuth()) {
      throw redirect({
        to: "/",
        search: {
          // Guarda a URL que o usuário tentou acessar para redirecioná-lo de volta.
          redirect: location.href,
        },
      });
    }
  },
  component: LayoutPrivate,
});

function LayoutPrivate() {
  const navigate = useNavigate();

  return (
    <div className="bg-zinc-200 w-full h-screen flex flex-col justify-center items-center gap-8">
      <Outlet />
      <Button
        className="flex items-center justify-center cursor-pointer"
        onClick={() => {
          sessionStorage.removeItem("authToken");
          navigate({ to: "/" });
        }}>
        Logout
      </Button>
    </div>
  );
}
