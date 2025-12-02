import { Box, Chip, Typography } from "@mui/joy";
import type { FunctionComponent } from "react";
import type { Link } from "../models/link";
import { useFavoritesStore } from "../stores/favorites";
import LinkCard from "./LinkCard";

interface LinkGridProps {
  links: Link[];
  searchQuery: string;
}

const LinkGrid: FunctionComponent<LinkGridProps> = ({ links, searchQuery }) => {
  const { favorites } = useFavoritesStore();

  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    return (
      link.title.toLowerCase().includes(query) ||
      link.description?.toLowerCase().includes(query) ||
      link.category?.toLowerCase().includes(query)
    );
  });

  if (filteredLinks.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 10,
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: "3rem" }}>🔍</Typography>
        <Typography level="h4" sx={{ color: "text.secondary" }}>
          No results found
        </Typography>
        <Typography level="body-md" sx={{ color: "text.tertiary" }}>
          No links found matching "{searchQuery}"
        </Typography>
      </Box>
    );
  }

  // Separate favorites from other links
  const favoriteLinks = filteredLinks.filter((link) =>
    favorites.includes(link.href)
  );
  const nonFavoriteLinks = filteredLinks.filter(
    (link) => !favorites.includes(link.href)
  );

  // Group non-favorite links by category
  const groupedLinks = nonFavoriteLinks.reduce<Record<string, Link[]>>(
    (acc, link) => {
      const category = link.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(link);
      return acc;
    },
    {}
  );

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedLinks).sort();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {favoriteLinks.length > 0 && (
        <Box>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}
          >
            <Typography level="title-lg" fontWeight={600}>
              ⭐ Favorites
            </Typography>
            <Chip size="sm" variant="soft" color="warning">
              {favoriteLinks.length}
            </Chip>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 2,
            }}
          >
            {favoriteLinks.map((link) => (
              <LinkCard key={link.href} link={link} />
            ))}
          </Box>
        </Box>
      )}
      {sortedCategories.map((category) => (
        <Box key={category}>
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}
          >
            <Typography level="title-lg" fontWeight={600}>
              {category}
            </Typography>
            <Chip size="sm" variant="soft" color="neutral">
              {groupedLinks[category].length}
            </Chip>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 2,
            }}
          >
            {groupedLinks[category].map((link) => (
              <LinkCard key={link.href} link={link} />
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default LinkGrid;
