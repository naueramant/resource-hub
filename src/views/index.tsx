import { Box, Typography } from "@mui/joy";
import { useEffect, useRef, useState, type FunctionComponent } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LinkGrid from "../components/LinkGrid";
import SearchBar from "../components/SearchBar";
import { config, links } from "../config";

const IndexView: FunctionComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showStickySearch, setShowStickySearch] = useState(false);
  const heroSearchRef = useRef<HTMLDivElement>(null);
  const stickyInputRef = useRef<HTMLInputElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);
  const activeInputRef = useRef<"sticky" | "hero" | null>(null);

  // Set page title and favicon
  useEffect(() => {
    document.title = `${config.companyName} Developer Portal`;

    // Update favicon
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/svg+xml";
    link.href = config.companyLogo;
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
            maxWidth: 1100,
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
              Developer Portal
            </Typography>
            <Typography
              level="body-lg"
              sx={{ color: "text.secondary", mb: 4, maxWidth: 500, mx: "auto" }}
            >
              Quick access to all your essential tools and resources
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
            </Box>
          </Box>
          <LinkGrid links={links} searchQuery={searchQuery} />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default IndexView;
