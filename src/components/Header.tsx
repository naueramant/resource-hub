import { Box, Tooltip, Typography } from "@mui/joy";
import { useState, type FunctionComponent } from "react";
import { IoLogoGithub, IoSettingsOutline } from "react-icons/io5";
import { config } from "../config";
import SettingsDialog from "./SettingsDialog";
import ThemeSwitcher from "./ThemeSwitcher";

const Header: FunctionComponent = () => {
  const editUrl = config.githubEditUrl;
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: { xs: 2, sm: 4 },
        py: 2.5,
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          minWidth: 0,
          flex: 1,
        }}
      >
        {config.companyLogo && (
          <Box
            component="img"
            src={config.companyLogo}
            alt={config.companyName ? `${config.companyName} logo` : "Logo"}
            sx={{
              height: 36,
              width: "auto",
              objectFit: "contain",
              flexShrink: 0,
            }}
          />
        )}
        {config.companyName && (
          <Typography
            level="h4"
            component="h1"
            fontWeight={600}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: { xs: "none", sm: "block" },
            }}
          >
            {config.companyName}
          </Typography>
        )}
        {!config.companyLogo && !config.companyName && (
          <Typography level="h4" component="h1" fontWeight={600}>
            Resource Hub
          </Typography>
        )}
      </Box>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}
      >
        {editUrl && (
          <Tooltip title="Suggest changes on GitHub" placement="bottom">
            <Box
              component="a"
              href={editUrl}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                px: { xs: 1, sm: 1.5 },
                py: 0.5,
                borderRadius: "lg",
                backgroundColor: "background.level1",
                color: "text.primary",
                textDecoration: "none",
                fontSize: "sm",
                fontWeight: 500,
                minHeight: 44,
                transition: "background-color 0.15s",
                "&:hover": {
                  backgroundColor: "background.level2",
                },
              }}
            >
              <IoLogoGithub style={{ fontSize: "1.1rem" }} />
              <Box
                component="span"
                sx={{ display: { xs: "none", sm: "inline" } }}
              >
                Edit
              </Box>
            </Box>
          </Tooltip>
        )}
        <Tooltip title="Settings" placement="bottom">
          <Box
            component="button"
            onClick={() => setSettingsOpen(true)}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 1,
              py: 0.5,
              borderRadius: "lg",
              backgroundColor: "background.level1",
              color: "text.primary",
              border: "none",
              cursor: "pointer",
              fontSize: "sm",
              fontWeight: 500,
              minHeight: 44,
              minWidth: 44,
              transition: "background-color 0.15s",
              "&:hover": {
                backgroundColor: "background.level2",
              },
            }}
          >
            <IoSettingsOutline style={{ fontSize: "1.2rem" }} />
          </Box>
        </Tooltip>
        <ThemeSwitcher />
      </Box>
      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </Box>
  );
};

export default Header;
