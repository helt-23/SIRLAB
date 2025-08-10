import { useLocation, useParams } from "react-router-dom";

export const useBreadcrumb = () => {
  const location = useLocation();
  const params = useParams();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbs = [];

  // Mapeamento de rotas para labels amigáveis
  const routeLabels = {
    homePage: "Home",
    laboratorios: "Seleção de Laboratórios",
    laboratorio: "Laboratório",
  };

  let accumulatedPath = "";

  pathnames.forEach((path, index) => {
    accumulatedPath += `/${path}`;

    const isLast = index === pathnames.length - 1;
    let label = routeLabels[path] || path;

    // Tratamento especial para página de laboratório
    if (path === "laboratorio" && params.labId) {
      label = `Laboratório ${params.labId}`;
    }

    breadcrumbs.push({
      path: accumulatedPath,
      label,
      isLast,
    });
  });

  return breadcrumbs;
};

export default useBreadcrumb;
