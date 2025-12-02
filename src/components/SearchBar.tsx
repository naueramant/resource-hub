import { Box, Input, Typography } from "@mui/joy";
import { forwardRef } from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

// Detect Mac OS for keyboard shortcut display
const isMac =
  typeof navigator !== "undefined" &&
  navigator.platform.toUpperCase().indexOf("MAC") >= 0;

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  compact?: boolean;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, compact = false }, ref) => {
    return (
      <Input
        slotProps={{ input: { ref } }}
        placeholder="Search for tools, resources, documentation..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size={compact ? "md" : "lg"}
        sx={{
          width: "100%",
          maxWidth: 600,
          mx: "auto",
          "--Input-focusedThickness": "2px",
          "--Input-radius": compact ? "10px" : "12px",
          "--Input-paddingInline": compact ? "16px" : "20px",
          "--Input-minHeight": compact ? "42px" : "52px",
          fontSize: compact ? "sm" : "md",
          backgroundColor: "background.surface",
          boxShadow: compact ? "xs" : "sm",
          border: "1px solid",
          borderColor: "divider",
          "&:hover": {
            borderColor: "neutral.400",
          },
          "&:focus-within": {
            borderColor: "primary.500",
          },
        }}
        startDecorator={
          <IoSearchOutline
            style={{ fontSize: compact ? "1rem" : "1.2rem", opacity: 0.6 }}
          />
        }
        endDecorator={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {value && (
              <Box
                component="button"
                onClick={() => onChange("")}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "text.tertiary",
                  fontSize: compact ? "1.25rem" : "1.5rem",
                  "&:hover": {
                    color: "text.secondary",
                  },
                }}
              >
                <IoCloseOutline />
              </Box>
            )}
            <Typography
              component="kbd"
              sx={{
                display: { xs: "none", sm: "flex" },
                alignItems: "center",
                gap: 0.25,
                px: 0.75,
                py: 0.25,
                borderRadius: "sm",
                backgroundColor: "background.level1",
                border: "1px solid",
                borderColor: "divider",
                color: "text.tertiary",
                fontSize: "xs",
                fontFamily: "inherit",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {isMac ? "⌘" : "Ctrl+"}K
            </Typography>
          </Box>
        }
      />
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
