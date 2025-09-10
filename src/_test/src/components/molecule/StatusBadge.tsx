import Badge from "../atom/Badge";

interface StatusBadgeProps {
  status: "completed" | "pending" | "in-progress";
  size?: "sm" | "md" | "lg";
}

export default function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const statusConfig = {
    completed: {
      variant: "success" as const,
      text: "완료",
    },
    pending: {
      variant: "warning" as const,
      text: "진행중",
    },
    "in-progress": {
      variant: "info" as const,
      text: "진행중",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} size={size}>
      {config.text}
    </Badge>
  );
}
