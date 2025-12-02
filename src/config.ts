import type { Link } from "./models/link";

// Company branding configuration
export const config = {
  companyName: "Acme Corp",
  companyLogo: "/logo.svg", // Place your logo in the public folder
  githubEditUrl:
    "https://github.com/your-org/developer-portal/edit/main/src/config.ts",
};

// Developer portal links
export const links: Link[] = [
  // Development
  {
    href: "https://github.com/example-org",
    title: "GitHub",
    description: "Source code repositories and collaboration",
    icon: "devicon/github-original",
    category: "Development",
  },
  {
    href: "https://gitlab.example.com",
    title: "GitLab",
    description: "GitLab instance for internal projects",
    icon: "devicon/gitlab-original",
    category: "Development",
  },
  {
    href: "https://sonarqube.example.com",
    title: "SonarQube",
    description: "Code quality and security analysis",
    icon: "devicon/sonarqube-original",
    category: "Development",
  },
  {
    href: "https://npm.example.com",
    title: "npm Registry",
    description: "Private npm package registry",
    icon: "devicon/npm-original-wordmark",
    category: "Development",
  },

  // DevOps & CI/CD
  {
    href: "https://argocd.example.com",
    title: "ArgoCD",
    description: "GitOps continuous delivery for Kubernetes",
    icon: "devicon/argocd-original",
    category: "DevOps",
  },
  {
    href: "https://jenkins.example.com",
    title: "Jenkins",
    description: "CI/CD pipelines and automation",
    icon: "devicon/jenkins-original",
    category: "DevOps",
  },
  {
    href: "https://terraform.example.com",
    title: "Terraform Cloud",
    description: "Infrastructure as code management",
    icon: "devicon/terraform-original",
    category: "DevOps",
  },
  {
    href: "https://ansible.example.com",
    title: "Ansible Tower",
    description: "Automation and configuration management",
    icon: "devicon/ansible-original",
    category: "DevOps",
  },

  // Infrastructure & Cloud
  {
    href: "https://kubernetes.example.com",
    title: "Kubernetes Dashboard",
    description: "Container orchestration dashboard",
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
