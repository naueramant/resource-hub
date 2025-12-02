import { Box, Link, Typography } from "@mui/joy";
import type { FunctionComponent } from "react";
import { config } from "../config";

const Footer: FunctionComponent = () => {
  const editUrl = config.githubEditUrl;

  if (!editUrl) {
    return null;
  }

  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        py: 4,
        mt: 6,
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
        Something missing?{" "}
        <Link
          href={editUrl}
          target="_blank"
          rel="noopener noreferrer"
          level="body-sm"
          sx={{
            color: "primary.500",
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Edit this list on GitHub
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
