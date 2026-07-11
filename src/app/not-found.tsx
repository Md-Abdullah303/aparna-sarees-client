import { StatusPage } from "@/components/ui/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      title="Page Not Found"
      description="The page you are looking for may have been moved, deleted, or never existed. Let us guide you back to our collection."
    />
  );
}
