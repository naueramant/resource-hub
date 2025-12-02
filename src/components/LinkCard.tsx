import { Box, Card, IconButton, Typography } from "@mui/joy";
import type { FunctionComponent, MouseEvent } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";
import type { Link } from "../models/link";
import { useFavoritesStore } from "../stores/favorites";

interface LinkCardProps {
  link: Link;
}

const isUrl = (str: string): boolean => {
  return (
    str.startsWith("http://") ||
    str.startsWith("https://") ||
    str.startsWith("/")
  );
};

const isDevicon = (str: string): boolean => {
  return str.startsWith("devicon/");
};

const parseDevicon = (
  str: string
): { name: string; variant: string; usesSvg: boolean } => {
  const fullName = str.replace("devicon/", "");
  const parts = fullName.split("-");
  const variant = parts.pop() || "original";
  const name = parts.join("-");

  // Original and original-wordmark versions need SVG, others can use font
  const usesSvg = variant.includes("original");

  return { name, variant, usesSvg };
};

const getDeviconSvgUrl = (name: string, variant: string): string => {
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`;
};

const getDeviconClass = (name: string, variant: string): string => {
  return `devicon-${name}-${variant}`;
};

const LinkCard: FunctionComponent<LinkCardProps> = ({ link }) => {
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorite = isFavorite(link.href);

  const handleFavoriteClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(link.href);
  };

  const renderIcon = () => {
    if (!link.icon) return null;

    if (isDevicon(link.icon)) {
      const { name, variant, usesSvg } = parseDevicon(link.icon);

      if (usesSvg) {
        return (
          <Box
            component="img"
            src={getDeviconSvgUrl(name, variant)}
            alt={`${link.title} icon`}
            sx={{
              width: 28,
              height: 28,
              objectFit: "contain",
            }}
          />
        );
      }

      return (
        <Box
          component="i"
          className={getDeviconClass(name, variant)}
          sx={{
            fontSize: "1.75rem",
            color: "text.primary",
          }}
        />
      );
    }

    if (isUrl(link.icon)) {
      return (
        <Box
          component="img"
          src={link.icon}
          alt={`${link.title} icon`}
          sx={{
            width: 28,
            height: 28,
            objectFit: "contain",
          }}
        />
      );
    }

    return link.icon;
  };

  return (
    <Card
      component="a"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      sx={{
        textDecoration: "none",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
        p: 2.5,
        borderRadius: "xl",
        backgroundColor: "background.surface",
        borderColor: "divider",
        "&:hover": {
          borderColor: "primary.400",
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.15)",
          backgroundColor: "background.level1",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {link.icon && (
          <Box
            sx={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "lg",
              backgroundColor: "background.level2",
              fontSize: "1.5rem",
              flexShrink: 0,
            }}
          >
            {renderIcon()}
          </Box>
        )}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography level="title-md" fontWeight={600}>
            {link.title}
          </Typography>
          {link.description && (
            <Typography
              level="body-sm"
              sx={{
                color: "text.tertiary",
                mt: 0.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {link.description}
            </Typography>
          )}
        </Box>
        <IconButton
          variant="plain"
          color={favorite ? "warning" : "neutral"}
          size="sm"
          onClick={handleFavoriteClick}
          sx={{
            opacity: favorite ? 1 : 0,
            transition: "opacity 0.2s",
            ".MuiCard-root:hover &": {
              opacity: 1,
            },
          }}
        >
          {favorite ? <IoStar /> : <IoStarOutline />}
        </IconButton>
        <Box
          sx={{
            color: "text.tertiary",
            fontSize: "1.2rem",
            opacity: 0.5,
            transition: "all 0.2s",
            ".MuiCard-root:hover &": {
              opacity: 1,
              transform: "translateX(4px)",
            },
          }}
        >
          →
        </Box>
      </Box>
    </Card>
  );
};

export default LinkCard;
