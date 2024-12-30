---
sidebar_position: 2
---

# About Docusuras

Docusuras is a cutting-edge documentation management system designed to streamline the creation, organization, and accessibility of technical and business documentation. Here are some key highlights:

1. **Modular Architecture:** Built with a modular design, making it scalable and adaptable for various use cases.
2. **Powered by Nx:** Utilizes the Nx build system for efficient project management and dependency tracking.
3. **Customizable Workspaces:** Supports seamless integration and customization of workspaces tailored to specific team needs.
4. **Optimized Build Process:** Leverages modern tools like pnpm for fast, efficient builds and dependency management.
5. **Developer-Friendly Setup:** Simplified commands and configurations to get started quickly and build robust documentation solutions.

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [pnpm](https://pnpm.io/) (v7+ recommended)
- [Nx](https://nx.dev/) CLI installed globally: 

```bash
npm install -g nx
```

---

### Setup

To set up the project, use the following `nx` command:

```bash
npx create-nx-workspace@latest docusuras --preset=react
```

Follow the prompts to customize your workspace.

---

### Build and Start

To build and start the application, use the following commands:

1. **Build the Project:**

   ```bash
   pnpm build
   ```

2. **Start the Application:**

   ```bash
   pnpm start
   ```

---

## Additional Resources

- [Nx Documentation](https://nx.dev/)
- [pnpm Documentation](https://pnpm.io/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
