import { Box, Typography } from "@mui/joy";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FunctionComponent,
} from "react";
import Header from "../components/Header";
import LinkGrid, { type LinkGridHandle } from "../components/LinkGrid";
import SearchBar from "../components/SearchBar";
import TagFilter from "../components/TagFilter";
import { config, links } from "../config";
import {
  useQueryParamArrayState,
  useQueryParamState,
} from "../hooks/useQueryParamState";
import { useSettingsStore } from "../stores/settings";

const IndexView: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useQueryParamState("q");
  const { getEffectiveSettings } = useSettingsStore();
  const [selectedTags, setSelectedTags] = useQueryParamArrayState("tags");
  const [showStickySearch, setShowStickySearch] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const heroSearchRef = useRef<HTMLDivElement>(null);
  const stickyInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const activeInputRef = useRef<"sticky" | "hero" | null>(null);
  const linkGridRef = useRef<LinkGridHandle>(null);

  // Reset selection when search query or tags change, select first if searching
  // Using startTransition to avoid "setState in effect" warning
  useEffect(() => {
    startTransition(() => {
      if (searchQuery || selectedTags.length > 0) {
        setSelectedIndex(0);
      } else {
        setSelectedIndex(-1);
      }
    });
  }, [searchQuery, selectedTags]);

  // Open the selected link
  const openSelectedLink = useCallback(() => {
    const visibleLinks = linkGridRef.current?.getVisibleLinks() ?? [];
    const settings = getEffectiveSettings();
    if (selectedIndex >= 0 && selectedIndex < visibleLinks.length) {
      const link = visibleLinks[selectedIndex];
      if (settings.linkTarget === "new-window") {
        window.open(
          link.href,
          "_blank",
          "noopener,noreferrer,width=1200,height=800"
        );
      } else if (settings.linkTarget === "same-tab") {
        window.location.href = link.href;
      } else {
        window.open(link.href, "_blank", "noopener,noreferrer");
      }
    }
  }, [selectedIndex, getEffectiveSettings]);

  // Keyboard navigation for cards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const visibleLinks = linkGridRef.current?.getVisibleLinks() ?? [];
      const total = visibleLinks.length;

      if (total === 0) return;

      // Only handle navigation when search is focused or has query
      const isSearchFocused = activeInputRef.current !== null;
      const hasSearchQuery = searchQuery || selectedTags.length > 0;

      if (!isSearchFocused && !hasSearchQuery) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        openSelectedLink();
      } else if (e.key === "Escape") {
        setSelectedIndex(-1);
        // Blur search input
        stickyInputRef.current?.blur();
        heroInputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery, selectedTags, selectedIndex, openSelectedLink]);

  // Keyboard shortcut for search focus (Ctrl+K / Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (showStickySearch) {
          stickyInputRef.current?.focus();
        } else {
          heroInputRef.current?.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showStickySearch]);

  // Set page title and favicon
  useEffect(() => {
    document.title = config.companyName
      ? `${config.companyName} Resource Hub`
      : "Resource Hub";

    // Update favicon only if companyLogo is set
    if (config.companyLogo) {
      let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.type = "image/svg+xml";
      link.href = config.companyLogo;
    }

    // Auto-focus search on page load
    heroInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroSearchRef.current) {
        const rect = heroSearchRef.current.getBoundingClientRect();
        const shouldShow = rect.bottom < 60;

        // Transfer focus when transitioning between sticky and hero search
        if (shouldShow !== showStickySearch) {
          if (shouldShow && activeInputRef.current === "hero") {
            // Switching to sticky, transfer focus
            setTimeout(() => stickyInputRef.current?.focus(), 0);
            activeInputRef.current = "sticky";
          } else if (!shouldShow && activeInputRef.current === "sticky") {
            // Switching to hero, transfer focus
            setTimeout(() => heroInputRef.current?.focus(), 0);
            activeInputRef.current = "hero";
          }
        }

        setShowStickySearch(shouldShow);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showStickySearch]);

  const handleStickyFocus = () => {
    activeInputRef.current = "sticky";
  };

  const handleHeroFocus = () => {
    activeInputRef.current = "hero";
  };

  const handleBlur = () => {
    activeInputRef.current = null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100%",
      }}
    >
      {/* Sticky Search Bar */}
      <Box
        onFocus={handleStickyFocus}
        onBlur={handleBlur}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          px: 4,
          py: 1,
          backgroundColor: "background.body",
          borderBottom: "1px solid",
          borderColor: showStickySearch ? "divider" : "transparent",
          opacity: showStickySearch ? 1 : 0,
          transform: showStickySearch ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: showStickySearch ? "auto" : "none",
          transition: "all 0.2s ease-in-out",
        }}
      >
        <SearchBar
          ref={stickyInputRef}
          value={searchQuery}
          onChange={setSearchQuery}
          compact
        />
      </Box>
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          px: 4,
          py: 3,
        }}
      >
        <Box
          sx={{
            maxWidth: 1400,
            mx: "auto",
          }}
        >
          {/* Hero / Search Section */}
          <Box
            sx={{
              textAlign: "center",
              py: 5,
              mb: 4,
            }}
          >
            <Typography level="h1" sx={{ mb: 1.5, fontWeight: 700 }}>
              Resource Hub
            </Typography>
            <Typography
              level="body-lg"
              sx={{ color: "text.secondary", mb: 4, maxWidth: 600, mx: "auto" }}
            >
              Quick access to all your company&apos;s resources
            </Typography>
            <Box
              ref={heroSearchRef}
              onFocus={handleHeroFocus}
              onBlur={handleBlur}
            >
              <SearchBar
                ref={heroInputRef}
                value={searchQuery}
                onChange={setSearchQuery}
              />
              <TagFilter
                links={links}
                selectedTags={selectedTags}
                onTagToggle={(tag) =>
                  setSelectedTags(
                    selectedTags.includes(tag)
                      ? selectedTags.filter((t) => t !== tag)
                      : [...selectedTags, tag]
                  )
                }
              />
            </Box>
          </Box>
          <LinkGrid
            ref={linkGridRef}
            links={links}
            searchQuery={searchQuery}
            selectedTags={selectedTags}
            selectedIndex={selectedIndex}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default IndexView;
