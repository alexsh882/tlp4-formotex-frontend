import { Badge, badgeVariants } from "@/components/shadcn/ui/badge";
import { cn } from "@/lib/utils";

type BadgeStatusProps = {
  status: string;
};
const statusColor = {
  repaired: "text-green-500 border-green-500 bg-transparent",
  under_repair: "text-yellow-500 border-yellow-500 bg-transparent",
  maintenance: "text-blue-500 border-blue-500 bg-transparent",
  disposed: "text-red-500 border-red-500 bg-transparent",
} as const;

const StatusName = {
  repaired: "Reparado",
  under_repair: "En reparación",
  maintenance: "En mantenimiento",
  disposed: "Dado de baja",
} as const;

export default function BadgeStatus(props: BadgeStatusProps) {
  const sC = statusColor[props.status as keyof typeof statusColor];

  return (
    <Badge className={
      cn(
        sC
      )
    }>
      {StatusName[props.status as keyof typeof StatusName]}
    </Badge>
  );
}
