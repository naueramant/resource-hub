export type SortingOption = "alphabetical" | "defined";
export type LinkTarget = "same-tab" | "new-tab" | "new-window";

export interface Config {
  /** Company name displayed in the header and page title */
  companyName?: string;

  /** Path to the company logo (relative to public folder or absolute URL) */
  companyLogo?: string;

  /** URL to edit the config file on GitHub. Leave empty to hide the footer */
  githubEditUrl?: string;

  /**
   * How to sort categories
   * - "alphabetical": Sort categories A-Z
   * - "defined": Use the order from the categories array, or order of first appearance in links
   */
  categorySorting: SortingOption;

  /**
   * How to sort links within each category
   * - "alphabetical": Sort links A-Z by title
   * - "defined": Keep the order as defined in the links array
   */
  linkSorting: SortingOption;

  /**
   * Optional array defining the order of categories when categorySorting is "defined".
   * Categories not in this array will appear at the end in their order of first appearance.
   */
  categories?: string[];

  /**
   * Maximum number of columns in the link grid.
   * @default 4
   */
  gridColumns?: number;

  /**
   * How links should open when clicked.
   * - "same-tab": Open in the same tab
   * - "new-tab": Open in a new tab
   * - "new-window": Open in a new window
   * @default "new-tab"
   */
  linkTarget?: LinkTarget;
}
