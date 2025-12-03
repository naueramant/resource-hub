import type { Config } from "./models/config";
import type { Link } from "./models/link";

// Company branding configuration
export const config: Config = {
  companyName: "ACME Corp",
  // companyLogo: "/logo.svg", // Place your logo in the public folder
  githubEditUrl:
    "https://github.com/naueramant/resource-hub/blob/master/src/config.ts",

  // Sorting options
  categorySorting: "defined",
  linkSorting: "alphabetical",

  // Optional: Define category order when categorySorting is "defined"
  categories: [
    "Development",
    "DevOps",
    "Infrastructure",
    "Observability",
    "Databases",
    "Documentation",
    "Project Management",
    "Communication",
    "Design",
  ],

  // Grid layout
  gridColumns: 4,

  // Card layout: "default" (vertical with icon on top) or "compact" (horizontal with icon on left)
  cardLayout: "compact",

  // How links open: "same-tab", "new-tab", or "new-window"
  linkTarget: "new-tab",
};

// Links
export const links: Link[] = [
  // Development
  {
    href: "https://github.com/example-org",
    title: "GitHub",
    description:
      "Central hub for all source code repositories, pull requests, code reviews, and team collaboration. Includes CI/CD workflows and project management.",
    icon: "devicon/github-original",
    category: "Development",
    tags: ["git", "code-review", "ci-cd"],
  },
  {
    href: "https://gitlab.example.com",
    title: "GitLab",
    description:
      "Self-hosted GitLab instance for internal and confidential projects that require additional security and compliance measures.",
    icon: "devicon/gitlab-original",
    category: "Development",
    tags: ["git", "code-review", "ci-cd", "self-hosted"],
  },
  {
    href: "https://sonarqube.example.com",
    title: "SonarQube",
    description:
      "Continuous code quality inspection tool that performs automatic reviews to detect bugs, vulnerabilities, and code smells in your codebase.",
    icon: "devicon/sonarqube-original",
    category: "Development",
    tags: ["code-quality", "security", "ci-cd"],
  },
  {
    href: "https://npm.example.com",
    title: "npm Registry",
    description: "Private npm package registry for internal packages",
    icon: "devicon/npm-original-wordmark",
    category: "Development",
    tags: ["packages", "javascript", "self-hosted"],
  },

  // DevOps & CI/CD
  {
    href: "https://argocd.example.com",
    title: "ArgoCD",
    description:
      "Declarative GitOps continuous delivery tool for Kubernetes. Automatically syncs your cluster state with your Git repository.",
    icon: "devicon/argocd-original",
    category: "DevOps",
    tags: ["kubernetes", "gitops", "ci-cd"],
  },
  {
    href: "https://jenkins.example.com",
    title: "Jenkins",
    description: "CI/CD pipelines and automation",
    icon: "devicon/jenkins-original",
    category: "DevOps",
    tags: ["ci-cd", "automation", "self-hosted"],
  },
  {
    href: "https://terraform.example.com",
    title: "Terraform Cloud",
    description:
      "Infrastructure as code management platform. Define, provision, and manage cloud infrastructure using declarative configuration files.",
    icon: "devicon/terraform-original",
    category: "DevOps",
    tags: ["iac", "cloud", "automation"],
  },
  {
    href: "https://ansible.example.com",
    title: "Ansible Tower",
    description: "Automation and configuration management",
    icon: "devicon/ansible-original",
    category: "DevOps",
    tags: ["automation", "configuration", "self-hosted"],
  },

  // Infrastructure & Cloud
  {
    href: "https://kubernetes.example.com",
    title: "Kubernetes Dashboard",
    description:
      "Web-based UI for managing containerized applications. View cluster resources, deploy apps, and troubleshoot workloads.",
    icon: "devicon/kubernetes-original",
    category: "Infrastructure",
  },
  {
    href: "https://console.aws.amazon.com",
    title: "AWS Console",
    description: "Amazon Web Services management console",
    icon: "devicon/amazonwebservices-plain-wordmark",
    category: "Infrastructure",
  },
  {
    href: "https://portal.azure.com",
    title: "Azure Portal",
    description: "Microsoft Azure cloud platform",
    icon: "devicon/azure-original",
    category: "Infrastructure",
  },
  {
    href: "https://docker.example.com",
    title: "Docker Registry",
    description: "Container image registry",
    icon: "devicon/docker-original",
    category: "Infrastructure",
  },

  // Observability
  {
    href: "https://grafana.example.com",
    title: "Grafana",
    description: "Metrics dashboards and monitoring",
    icon: "devicon/grafana-original",
    category: "Observability",
  },
  {
    href: "https://prometheus.example.com",
    title: "Prometheus",
    description: "Metrics collection and alerting",
    icon: "devicon/prometheus-original",
    category: "Observability",
  },
  {
    href: "https://kibana.example.com",
    title: "Kibana",
    description: "Log analysis and visualization",
    icon: "devicon/kibana-original",
    category: "Observability",
  },
  {
    href: "https://sentry.example.com",
    title: "Sentry",
    description: "Error tracking and performance monitoring",
    icon: "devicon/sentry-original",
    category: "Observability",
  },

  // Databases
  {
    href: "https://postgres.example.com",
    title: "PostgreSQL Admin",
    description: "PostgreSQL database management",
    icon: "devicon/postgresql-original",
    category: "Databases",
  },
  {
    href: "https://redis.example.com",
    title: "Redis Commander",
    description: "Redis cache management interface",
    icon: "devicon/redis-original",
    category: "Databases",
  },
  {
    href: "https://mongodb.example.com",
    title: "MongoDB Compass",
    description: "MongoDB database explorer",
    icon: "devicon/mongodb-original",
    category: "Databases",
  },

  // Documentation
  {
    href: "https://confluence.example.com",
    title: "Confluence",
    description: "Team documentation and knowledge base",
    icon: "devicon/confluence-original",
    category: "Documentation",
  },
  {
    href: "https://readme.example.com",
    title: "ReadMe",
    description: "API documentation portal",
    icon: "devicon/readthedocs-original",
    category: "Documentation",
  },
  {
    href: "https://swagger.example.com",
    title: "Swagger UI",
    description: "Interactive API documentation",
    icon: "devicon/swagger-original",
    category: "Documentation",
  },

  // Project Management
  {
    href: "https://jira.example.com",
    title: "Jira",
    description: "Issue tracking and project management",
    icon: "devicon/jira-original",
    category: "Project Management",
  },
  {
    href: "https://trello.example.com",
    title: "Trello",
    description: "Kanban boards for task management",
    icon: "devicon/trello-original",
    category: "Project Management",
  },
  {
    href: "https://notion.example.com",
    title: "Notion",
    description: "Team workspace and notes",
    icon: "devicon/notion-original",
    category: "Project Management",
  },

  // Communication
  {
    href: "https://slack.example.com",
    title: "Slack",
    description: "Team communication and messaging",
    icon: "devicon/slack-original",
    category: "Communication",
  },
  {
    href: "https://teams.example.com",
    title: "Microsoft Teams",
    description: "Video conferencing and team collaboration",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Microsoft_Teams.png/645px-Microsoft_Teams.png",
    category: "Communication",
  },
  {
    href: "https://twitter.com/example",
    title: "Twitter",
    description: "Company Twitter account and social media updates",
    icon: "devicon/twitter-original",
    category: "Communication",
  },

  // Design
  {
    href: "https://figma.example.com",
    title: "Figma",
    description: "Design files and prototypes",
    icon: "devicon/figma-original",
    category: "Design",
  },
  {
    href: "https://storybook.example.com",
    title: "Storybook",
    description: "UI component library and documentation",
    icon: "devicon/storybook-original",
    category: "Design",
  },
];
