import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Slider,
  Typography,
} from "@mui/joy";
import { useState, type FunctionComponent } from "react";
import { IoRefreshOutline } from "react-icons/io5";
import type { CardLayout, LinkTarget, SortingOption } from "../models/config";
import {
  getDefaultSettings,
  useSettingsStore,
  type UserSettings,
} from "../stores/settings";

interface SettingsDialogProps {
  open: boolean;
  onClose: () => void;
}

// Inner component that resets state when remounted
const SettingsDialogContent: FunctionComponent<{
  onClose: () => void;
}> = ({ onClose }) => {
  const { getEffectiveSettings, setSettings, resetToDefaults } =
    useSettingsStore();

  // Local state for the form - initialized fresh each time dialog opens
  const [localSettings, setLocalSettings] =
    useState<UserSettings>(getEffectiveSettings);

  // Check if there are unsaved changes
  const currentSettings = getEffectiveSettings();
  const hasChanges =
    localSettings.gridColumns !== currentSettings.gridColumns ||
    localSettings.cardLayout !== currentSettings.cardLayout ||
    localSettings.linkTarget !== currentSettings.linkTarget ||
    localSettings.linkSorting !== currentSettings.linkSorting ||
    localSettings.categorySorting !== currentSettings.categorySorting;

  // Check if local settings differ from defaults (for showing reset button state)
  const defaults = getDefaultSettings();
  const isLocalAtDefaults =
    localSettings.gridColumns === defaults.gridColumns &&
    localSettings.cardLayout === defaults.cardLayout &&
    localSettings.linkTarget === defaults.linkTarget &&
    localSettings.linkSorting === defaults.linkSorting &&
    localSettings.categorySorting === defaults.categorySorting;

  const handleSave = () => {
    // Check if we're saving the defaults - if so, reset to null
    if (isLocalAtDefaults) {
      resetToDefaults();
    } else {
      setSettings(localSettings);
    }
    onClose();
  };

  const handleReset = () => {
    // Only update local state, don't persist until save
    setLocalSettings(getDefaultSettings());
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <ModalDialog
      variant="outlined"
      sx={{
        maxWidth: 500,
        width: "100%",
        borderRadius: "xl",
        p: 3,
        gap: 2,
        overflowX: "hidden",
      }}
    >
      <ModalClose />
      <DialogTitle>Settings</DialogTitle>
      <DialogContent sx={{ gap: 3, overflowX: "hidden" }}>
        <Typography level="body-sm" sx={{ color: "text.tertiary" }}>
          Customize your Resource Hub experience. These settings are saved
          locally in your browser.
        </Typography>

        <Divider />

        {/* Grid Columns */}
        <FormControl>
          <FormLabel>Grid Columns</FormLabel>
          <FormHelperText sx={{ mt: 0, mb: 1 }}>
            Number of columns in the link grid. More columns show more links at
            once but make cards smaller.
          </FormHelperText>
          <Box sx={{ px: 1 }}>
            <Slider
              value={localSettings.gridColumns}
              onChange={(_, value) =>
                setLocalSettings((prev) => ({
                  ...prev,
                  gridColumns: value as number,
                }))
              }
              min={2}
              max={6}
              step={1}
              marks={[
                { value: 2, label: "2" },
                { value: 3, label: "3" },
                { value: 4, label: "4" },
                { value: 5, label: "5" },
                { value: 6, label: "6" },
              ]}
              valueLabelDisplay="off"
            />
          </Box>
        </FormControl>

        {/* Card Layout */}
        <FormControl>
          <FormLabel>Card Layout</FormLabel>
          <FormHelperText sx={{ mt: 0, mb: 1 }}>
            Choose how link cards are displayed. Default shows icons above text,
            compact shows icons beside text.
          </FormHelperText>
          <Select
            value={localSettings.cardLayout}
            onChange={(_, value) =>
              setLocalSettings((prev) => ({
                ...prev,
                cardLayout: value as CardLayout,
              }))
            }
          >
            <Option value="default">Default (vertical)</Option>
            <Option value="compact">Compact (horizontal)</Option>
          </Select>
        </FormControl>

        {/* Link Target */}
        <FormControl>
          <FormLabel>Link Behavior</FormLabel>
          <FormHelperText sx={{ mt: 0, mb: 1 }}>
            How links open when clicked. New tab is recommended to keep the hub
            accessible.
          </FormHelperText>
          <Select
            value={localSettings.linkTarget}
            onChange={(_, value) =>
              setLocalSettings((prev) => ({
                ...prev,
                linkTarget: value as LinkTarget,
              }))
            }
          >
            <Option value="new-tab">Open in new tab</Option>
            <Option value="same-tab">Open in same tab</Option>
            <Option value="new-window">Open in new window</Option>
          </Select>
        </FormControl>

        {/* Link Sorting */}
        <FormControl>
          <FormLabel>Link Sorting</FormLabel>
          <FormHelperText sx={{ mt: 0, mb: 1 }}>
            How links are sorted within each category. Alphabetical sorts A-Z,
            defined keeps the original order.
          </FormHelperText>
          <Select
            value={localSettings.linkSorting}
            onChange={(_, value) =>
              setLocalSettings((prev) => ({
                ...prev,
                linkSorting: value as SortingOption,
              }))
            }
          >
            <Option value="alphabetical">Alphabetical (A-Z)</Option>
            <Option value="defined">Defined order</Option>
          </Select>
        </FormControl>

        {/* Category Sorting */}
        <FormControl>
          <FormLabel>Category Sorting</FormLabel>
          <FormHelperText sx={{ mt: 0, mb: 1 }}>
            How categories are ordered. Alphabetical sorts A-Z, defined uses the
            configured category order.
          </FormHelperText>
          <Select
            value={localSettings.categorySorting}
            onChange={(_, value) =>
              setLocalSettings((prev) => ({
                ...prev,
                categorySorting: value as SortingOption,
              }))
            }
          >
            <Option value="alphabetical">Alphabetical (A-Z)</Option>
            <Option value="defined">Defined order</Option>
          </Select>
        </FormControl>

        <Divider />

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="plain"
            color="neutral"
            startDecorator={<IoRefreshOutline />}
            onClick={handleReset}
            disabled={isLocalAtDefaults}
          >
            Reset to defaults
          </Button>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button variant="plain" color="neutral" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={handleSave}
              disabled={!hasChanges}
            >
              Save
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </ModalDialog>
  );
};

const SettingsDialog: FunctionComponent<SettingsDialogProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      {open ? <SettingsDialogContent onClose={onClose} /> : <Box />}
    </Modal>
  );
};

export default SettingsDialog;
