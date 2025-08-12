import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

const checkAuth = () => {
  const token = sessionStorage.getItem("authToken");
  return !!token;
};

export const Route = createFileRoute("/_public")({
  beforeLoad: () => {
    if (checkAuth()) {
      throw redirect({
        to: "/home",
      });
    }
  },
  component: LayoutPublic,
});

function LayoutPublic() {
  return (
    <div className="bg-zinc-200 w-full h-screen flex flex-row items-center justify-center">
      <Outlet />
    </div>
  );
}
