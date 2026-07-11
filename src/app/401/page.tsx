import { StatusPage } from "@/components/ui/StatusPage";

export default function UnauthorizedPage() {
  return (
    <StatusPage
      code="401"
      title="Unauthorized"
      description="You need to sign in to access this page. Please log in with your account to continue."
      actionLabel="Go to Login"
      actionHref="/login"
    />
  );
}
