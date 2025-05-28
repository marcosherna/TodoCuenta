import {
  BarChartIcon,
  ShoppingCartIcon,
  MapPinIcon,
  ShieldIcon,
  ReceiptTextIcon,
  AlertTriangleIcon,
  FileTextIcon,
  UserIcon,
  BoxesIcon,
  PackageIcon,
  TruckIcon,
  WarehouseIcon,
  SettingsIcon,
  UsersIcon,
  CreditCardIcon,
  LayoutDashboard,
} from "lucide-react";

const items = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  groups: [
    {
      label: "Application",
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Inventario",
      title: "Gestión de Inventario",
      icon: BoxesIcon,
      subtItems: [
        { title: "Productos", url: "/productos", icon: PackageIcon },
        { title: "Lotes", url: "/lotes", icon: BoxesIcon },
        { title: "Proveedores", url: "/proveedores", icon: TruckIcon },
        { title: "Bodegas", url: "/bodegas", icon: WarehouseIcon },
        { title: "Sucursales", url: "branches", icon: MapPinIcon },
      ],
    },
    {
      label: "Contactos",
      title: "Gestión de Personas",
      icon: UsersIcon,
      subtItems: [
        { title: "Clientes", url: "/clientes", icon: UsersIcon },
        { title: "Empleados", url: "/empleados", icon: UserIcon },
        { title: "Usuarios", url: "/usuarios", icon: UserIcon },
        { title: "Roles", url: "/roles", icon: ShieldIcon },
      ],
    },
    {
      label: "Ventas",
      title: "Facturación y Ventas",
      icon: FileTextIcon,
      subtItems: [
        { title: "Facturas", url: "/facturas", icon: FileTextIcon },
        {
          title: "Facturas por producto",
          url: "/facturas-productos",
          icon: ShoppingCartIcon,
        },
        { title: "Formas de pago", url: "/formas-pago", icon: CreditCardIcon },
      ],
    },
    {
      label: "Administración",
      title: "Configuración del Sistema",
      icon: SettingsIcon,
      subtItems: [
        {
          title: "Configuración de roles",
          url: "/config-roles",
          icon: SettingsIcon,
        },
        {
          title: "Configuración de formas de pago",
          url: "/config-pago",
          icon: SettingsIcon,
        },
      ],
    },
    {
      label: "Reportes",
      title: "Reportes del Sistema",
      icon: BarChartIcon,
      subtItems: [
        {
          title: "Reporte de facturas",
          url: "/reportes/facturas",
          icon: ReceiptTextIcon,
        },
        {
          title: "Productos más vendidos",
          url: "/reportes/ventas",
          icon: BarChartIcon,
        },
        {
          title: "Stock bajo",
          url: "/reportes/stock",
          icon: AlertTriangleIcon,
        },
        {
          title: "Compras por proveedor",
          url: "/reportes/compras",
          icon: BarChartIcon,
        },
      ],
    },
  ],
};

export { items };
