/**
 * Repository Configuration
 * 
 * Defines all GoFast repositories for roadmap item tracking.
 * Used for Primary Repo dropdown in roadmap items.
 */

export const repoConfig = {
  "MVP1": {
    label: "MVP1",
    description: "Main repo - gofastfrontend-mvp1",
    value: "MVP1"
  },
  "GoFast-demo": {
    label: "GoFast-demo",
    description: "Demo/prototype repo - gofastfrontend-demo",
    value: "GoFast-demo"
  },
  "GoFastBackend": {
    label: "GoFastBackend",
    description: "Backend repo - gofastbackendv2-fall2025",
    value: "GoFastBackend"
  },
  "GoFastEvents": {
    label: "GoFastEvents",
    description: "Events repo - GoFast-Events",
    value: "GoFastEvents"
  },
  "GoFast-Dashboard": {
    label: "GoFast-Dashboard",
    description: "User dashboard repo - gofast-user-dashboard",
    value: "GoFast-Dashboard"
  },
  "GoFast Company": {
    label: "GoFast Company",
    description: "Company stack repo - gofast-companystack",
    value: "GoFast Company"
  }
};

/**
 * Get all repo options for dropdown
 */
export const getRepoOptions = () => {
  return Object.values(repoConfig);
};

/**
 * Get repo label by value
 */
export const getRepoLabel = (value) => {
  const config = repoConfig[value];
  return config ? config.label : value;
};

