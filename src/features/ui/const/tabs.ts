import { ListBulletIcon } from "@radix-ui/react-icons";
import { CheckCircle, Computer, Copyright, Home, ListCheck, Users } from "lucide-react";

export const TABS = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Inventario", href: "/inventory-entries", icon: CheckCircle },
  { label: "Depósitos", href: "/inventory", icon: ListCheck },
  { label: "Equipos", href: "/equipments", icon: Computer },
  { label: "Tipos de Equipos", href: "/equipment-types", icon: ListBulletIcon },
  { label: "Marcas", href: "/makes", icon: Copyright },
  { label: "Usuarios", href: "/users", icon: Users },
];
