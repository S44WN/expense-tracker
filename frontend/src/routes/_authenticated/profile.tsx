import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { userQueryOptions } from "@/lib/api";

export const Route = createFileRoute("/_authenticated/profile")({
  component: Profile,
});

function Profile() {
  const { isPending, isError, data } = useQuery(userQueryOptions);

  if (isPending) {
    return "Loading...";
  }

  if (isError) {
    return "User Not Logged In";
  }

  return (
    <div className="p-2">
      Hello, {data?.user.given_name}
      <a href="/api/logout">Logout</a>
    </div>
  );
}
