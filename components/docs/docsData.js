// Modular docs data structure for navigation and content
export const docsSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    articles: [
      {
        id: "introduction",
        title: "Introduction",
        content: `# Welcome to Raiduix: The Visual Layer for Your Code

If you're reading this, you've likely felt the friction. The gap between a brilliant UI concept and a clean, functional front-end can feel like a canyon.

We design in one world—a world of pixels, vectors, and prototypes—and code in another—a world of components, props, and frameworks. The process of translating between these two worlds is often manual, repetitive, and a drain on our most valuable resource: creative energy.

We decided to build the bridge.

**Raiduix is a free, open-source design tool built for the modern developer and UI designer.**

It is not just another website builder; it is an interactive development environment designed to dissolve the boundary between visual creation and engineering. It’s a place to experiment, build, and generate production-ready code with unprecedented speed and flexibility.

This document will serve as your guide to understanding the core philosophy and powerful features at your fingertips.
\n
---
\n
## The Core Philosophy: A Unified Workspace

Raiduix is built around a single, cohesive three-panel workspace. Understanding this layout is the key to unlocking your workflow.

1. **The Library (Left Panel):** This is your palette. It contains a comprehensive collection of pre-built components, from atomic elements like buttons and inputs to more complex organisms like cards and modals. Every component here is a draggable, themeable building block for your interface.

2. **The Canvas (Center Panel):** This is your sandbox. An infinite space where you drag, drop, and arrange components from the library. The canvas is a live, interactive environment—what you see is a true representation of the final component, not a static image. You can select, move, resize, and nest components to construct complex layouts with ease.

3. **The Inspector (Right Panel):** This is your control center. It's a context-aware panel with two primary functions:

   - **Settings:** When you select a component on the canvas, this tab dynamically populates with all of its available props. You can tweak everything in real-time—change a button's label, toggle a disabled state, adjust a color—and see the result instantly on the canvas.

   - **Code:** This is where the magic happens. This tab displays the clean, production-ready code for your entire canvas layout, updating with every single change you make.

---

## The Superpower: The Dynamic Theming Engine

The most powerful feature of Raiduix is its ability to instantly transform the entire look and feel of your interface.

Every component in our library is built with three distinct, meticulously crafted themes that you can switch between with a single click:

- **Neo-Material:** A modern, opinionated take on Material Design. It emphasizes clarity, intentionality, and a clean, functional aesthetic with subtle shadows and intuitive motion. It’s the perfect choice for data-rich applications and dashboards.

- **Glassmorphism:** Ethereal, futuristic, and elegant. This theme uses background blurs, semi-transparent surfaces, and soft glows to create a sense of depth and layering. It’s ideal for creating modern, visually stunning interfaces that feel light and airy.

- **Skeuomorphism:** Tactile, realistic, and engaging. A modern revival of a classic style, this theme uses complex, layered shadows and lighting effects to make UI elements feel like physical objects you can press and interact with. It provides a unique, memorable, and satisfying user experience.

This engine allows you to prototype different visual directions for your project in seconds, not days.

---

## The Payoff: The Real-Time Code Generation Engine

Raiduix was built by developers, for developers. We believe in full transparency and control, which is why our code generation engine is not a "black box."

As you build on the canvas, the **Code** tab in the Inspector generates human-readable, ready-to-use code for the industry's most popular frameworks.

- **Choose Your Framework:** A simple toggle lets you switch the output between **React (JSX)**, **Vue (Template)**, and **Angular (Template)**.

- **See Real-Time Updates:** Change a prop in the Settings tab, and you will see the corresponding line of code update instantly. Drag a new component onto the canvas, and it appears in the generated output.

- **Copy or Download:** When your design is complete, you can copy the entire code block to your clipboard or download it as a properly formatted file ('.jsx', '.vue', '.html'), ready to be integrated directly into your project.

This feature eliminates the tedious task of manual translation, freeing you to focus on what truly matters: building great products.

### **Our Mission: A Free and Open Tool for All**

Raiduix is, and always will be, completely free and open-source. There are no paid tiers, no feature gates, and no sign-ups required. We believe that powerful creative tools should be accessible to everyone, from students learning to code to senior engineers at large companies.

This project is licensed under the MIT license, and we wholeheartedly welcome community contributions. Whether you want to report a bug, request a feature, or contribute a new component, we encourage you to visit our GitHub repository and get involved.

Now, let's start building. Use the navigation on the left to dive deeper into specific components, learn more about the theming system, or explore advanced canvas features.`,
      },
      {
        id: "installation",
        title: "Installation",
        content: `# Installation

1. Clone the repository
2. Install dependencies
3. Start the development server

\`\`\`bash
git clone <repo-url>
cd raiduix
npm install
npm run dev
\`\`\`
`,
      },
    ],
  },
];
