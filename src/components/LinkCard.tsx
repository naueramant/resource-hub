import { Box, Card, IconButton, Tooltip, Typography } from "@mui/joy";
import { forwardRef, type MouseEvent } from "react";
import { IoIosLink } from "react-icons/io";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { config } from "../config";
import type { Link } from "../models/link";
import { useFavoritesStore } from "../stores/favorites";

interface LinkCardProps {
  link: Link;
  isSelected?: boolean;
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

const LinkCard = forwardRef<HTMLAnchorElement, LinkCardProps>(
  ({ link, isSelected = false }, ref) => {
    const { isFavorite, toggleFavorite } = useFavoritesStore();
    const favorite = isFavorite(link.href);

  const handleFavoriteClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(link.href);
  };

  const renderIcon = () => {
    if (!link.icon) {
      return <IoIosLink size={28} />;
    }

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

  const getLinkTarget = () => {
    const target = config.linkTarget ?? "new-tab";
    if (target === "same-tab") return "_self";
    if (target === "new-window") return "_blank";
    return "_blank"; // new-tab
  };

  const handleClick = (e: MouseEvent) => {
    if (config.linkTarget === "new-window") {
      e.preventDefault();
      window.open(
        link.href,
        "_blank",
        "noopener,noreferrer,width=1200,height=800"
      );
    }
  };

  const isCompact = config.cardLayout === "compact";

  if (isCompact) {
    return (
      <Card
        ref={ref}
        component="a"
        href={link.href}
        target={getLinkTarget()}
        rel="noopener noreferrer"
        onClick={handleClick}
        variant="outlined"
        sx={{
          textDecoration: "none",
          transition: "all 0.2s ease-in-out",
          cursor: "pointer",
          p: 2,
          borderRadius: "lg",
          backgroundColor: isSelected ? "background.level1" : "background.surface",
          borderColor: isSelected ? "primary.500" : "divider",
          boxShadow: isSelected ? "0 0 0 2px var(--joy-palette-primary-500)" : "none",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 2,
          "&:hover": {
            borderColor: "primary.400",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 16px -4px rgba(0, 0, 0, 0.1)",
            backgroundColor: "background.level1",
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "md",
            backgroundColor: "background.level2",
            fontSize: "1.25rem",
            flexShrink: 0,
          }}
        >
          {renderIcon()}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography level="title-sm" fontWeight={600} noWrap>
            {link.title}
          </Typography>
          {link.description && (
            <Typography
              level="body-xs"
              sx={{
                color: "text.tertiary",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {link.description}
            </Typography>
          )}
        </Box>

        {/* Favorite button */}
        <Tooltip
          title={favorite ? "Remove from favorites" : "Add to favorites"}
          placement="top"
        >
          <IconButton
            variant="plain"
            color={favorite ? "warning" : "neutral"}
            size="sm"
            onClick={handleFavoriteClick}
            sx={{
              opacity: favorite ? 1 : 0.4,
              transition: "opacity 0.2s",
              flexShrink: 0,
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            {favorite ? <IoStar /> : <IoStarOutline />}
          </IconButton>
        </Tooltip>
      </Card>
    );
  }

  return (
    <Card
      ref={ref}
      component="a"
      href={link.href}
      target={getLinkTarget()}
      rel="noopener noreferrer"
      onClick={handleClick}
      variant="outlined"
      sx={{
        textDecoration: "none",
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
        p: 3,
        borderRadius: "xl",
        backgroundColor: isSelected ? "background.level1" : "background.surface",
        borderColor: isSelected ? "primary.500" : "divider",
        boxShadow: isSelected ? "0 0 0 2px var(--joy-palette-primary-500)" : "none",
        position: "relative",
        "&:hover": {
          borderColor: "primary.400",
          transform: "translateY(-4px)",
          boxShadow: "0 12px 24px -8px rgba(0, 0, 0, 0.15)",
          backgroundColor: "background.level1",
        },
      }}
    >
      {/* Favorite button - top right */}
      <Tooltip
        title={favorite ? "Remove from favorites" : "Add to favorites"}
        placement="top"
      >
        <IconButton
          variant="plain"
          color={favorite ? "warning" : "neutral"}
          size="sm"
          onClick={handleFavoriteClick}
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            opacity: favorite ? 1 : 0.4,
            transition: "opacity 0.2s",
            "&:hover": {
              opacity: 1,
            },
          }}
        >
          {favorite ? <IoStar /> : <IoStarOutline />}
        </IconButton>
      </Tooltip>

      {/* Icon */}
      <Box
        sx={{
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "lg",
          backgroundColor: "background.level2",
          fontSize: "1.75rem",
          mb: 2,
        }}
      >
        {renderIcon()}
      </Box>

      {/* Title */}
      <Typography level="title-lg" fontWeight={600} sx={{ mb: 0.5, pr: 4 }}>
        {link.title}
      </Typography>

      {/* Description */}
      {link.description && (
        <Typography
          level="body-sm"
          sx={{
            color: "text.tertiary",
            lineHeight: 1.6,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {link.description}
        </Typography>
      )}
    </Card>
  );
  }
);

LinkCard.displayName = "LinkCard";

export default LinkCard;
