export const API_BASE_URL = "https://carbonsync-backend-mp5h.onrender.com";

export const APP_NAME = "CarbonSynq";

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  ONBOARDING: "/onboarding",
  INVOICES: "/invoices",
  DASHBOARD: "/dashboard",
  ANALYTICS: "/analytics",
} as const;

export const NON_MARKETING_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.ONBOARDING,
  ROUTES.INVOICES,
  ROUTES.DASHBOARD,
  ROUTES.ANALYTICS,
] as const;

export const SUPPORTED_FILE_TYPES = [
  { ext: "PDF", mime: "application/pdf", icon: "FileText" },
  { ext: "CSV", mime: "text/csv", icon: "FileSpreadsheet" },
  { ext: "XLSX", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", icon: "FileSpreadsheet" },
] as const;
