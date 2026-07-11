import { StatusPage } from "@/components/ui/StatusPage";

export default function ForbiddenPage() {
  return (
    <StatusPage
      code="403"
      title="Access Forbidden"
      description="You do not have permission to view this resource. Contact support if you believe this is a mistake."
      actionLabel="Back to Home"
      actionHref="/"
    />
  );
}
