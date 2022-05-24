import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import { Link as RouterLink, matchPath, useLocation } from "react-router-dom";

import routes from "../routes";

const Breadcrumb = () => {
  const location = useLocation();
  const crumbs = routes.filter(({ path }) => matchPath({ path, end: false }, location.pathname));

  const renderBreadcrumbs = () => {
    if (crumbs.length <= 1) return null;

    const activeCrumb = crumbs.pop();

    return (
      <Breadcrumbs>
        {crumbs.map(crumb => (
          <Link component={RouterLink} underline="hover" variant="h6" to={crumb.path}>
            {crumb.name}
          </Link>
        ))}
        <Typography variant="h6" color="text.primary">
          {activeCrumb?.name}
        </Typography>
      </Breadcrumbs>
    );
  };

  return <Container className="mt-2">{renderBreadcrumbs()}</Container>;
};

export default Breadcrumb;
