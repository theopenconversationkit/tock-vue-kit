import path from "path";
import { fileURLToPath } from "url";
import { readFileSync, writeFileSync } from "node:fs";
import {
  localStorage,
  initialization,
  preferences,
  wording,
} from "../src/utils/app-options-model";

import packageJson from "../package.json";

// Helper to format complex types
function formatType(type: string): string {
  const typeMap: Record<string, string> = {
    ImageDef: "[ImageDef](#ImageDef)",
    KeyValues: "`Record<string, string>`",
  };
  return typeMap[type] || type;
}

// Generate a Markdown table row
function generateRow(name: string, config: any, currentPath: string): string {
  const conditions = config.conditions?.length
    ? ` (*Conditions*: ${config.conditions.join(", ")})`
    : "";
  const description = config.description || config.title || "—";
  return `| ${name} | ${description}${conditions} | ${formatType(
    config.type
  )} | \`${config.default === undefined ? "undefined" : config.default}\` |`;
}

// Generate a table for a given level (modified to show direct attributes first)
function generateTable(
  data: Record<string, any>,
  currentPath: string = "",
  isRoot: boolean = false
): string {
  let md = "";

  // Separate properties into two groups:
  // 1. Direct attributes (OptionDefinition with 'title')
  // 2. Child objects (without 'title')
  const directProps = [];
  const childObjects = [];

  const entries = Object.entries(data).sort(
    (a, b) => (a[1].index || 0) - (b[1].index || 0)
  );

  for (const [key, config] of entries) {
    if (config.title) {
      directProps.push([key, config]);
    } else {
      childObjects.push([key, config]);
    }
  }

  // First show direct attributes
  for (const [key, config] of directProps) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    md += generateRow(key, config, newPath) + "\n";
  }

  // Then show child objects
  for (const [key, config] of childObjects) {
    const newPath = currentPath ? `${currentPath}.${key}` : key;
    const subTitle = key.charAt(0).toUpperCase() + key.slice(1);
    const anchor = subTitle.replace(/\s+/g, "");
    const objDescription =
      config.description || config.title || `${subTitle} options`;
    md += `| **${key}** | ${objDescription} | [${subTitle}](#${anchor}) | |\n`;
  }

  return md;
}

// Generate section for complex types
function generateTypeSection(
  typeName: string,
  typeDef: Record<string, any>
): string {
  let md = `### ${typeName}\n\n`;
  md += `${typeDef.description || `Option object for ${typeName}.`}\n\n`;
  md += `| Property name | Description | Type |\n`;
  md += `| ------------- | ----------- | ---- |\n`;

  for (const [key, config] of Object.entries(typeDef)) {
    const description = config.description || config.title || "—";
    md += `| ${key} | ${description} | ${config.type} |\n`;
  }
  return md + "\n";
}

// Generate complete section with introduction and subsections
function generateSectionWithIntro(
  data: Record<string, any>,
  title: string,
  introduction: string,
  level: number = 2,
  currentPath: string = ""
): string {
  let md = `${"#".repeat(level)} ${title}\n\n`;

  // Add introduction if it exists
  if (introduction) {
    md += `${introduction}\n\n`;
  }

  // Generate table for this level
  md += `| Property name | Description | Type | Default |\n`;
  md += `| ------------- | ----------- | ---- | ------- |\n`;
  md += generateTable(data, currentPath, level === 2);

  // Generate subsections for nested objects
  const entries = Object.entries(data).sort(
    (a, b) => (a[1].index || 0) - (b[1].index || 0)
  );

  for (const [key, config] of entries) {
    if (!config.title) {
      const subTitle = key.charAt(0).toUpperCase() + key.slice(1);
      const anchor = subTitle.replace(/\s+/g, "");
      const newPath = currentPath ? `${currentPath}.${key}` : key;

      md += `\n${"#".repeat(level + 1)} ${subTitle}\n\n`;
      const sectionDescription = config.description || config.title;
      if (sectionDescription) md += `${sectionDescription}\n\n`;

      md += `| Property name | Description | Type | Default |\n`;
      md += `| ------------- | ----------- | ---- | ------- |\n`;
      md += generateTable(config, newPath);

      // Recursively generate sub-subsections
      const subEntries = Object.entries(config).sort(
        (a, b) => (a[1].index || 0) - (b[1].index || 0)
      );
      for (const [subKey, subConfig] of subEntries) {
        if (!subConfig.title) {
          const subSubTitle = subKey.charAt(0).toUpperCase() + subKey.slice(1);
          const subAnchor = subSubTitle.replace(/\s+/g, "");
          const subNewPath = `${newPath}.${subKey}`;

          md += `\n${"#".repeat(level + 2)} ${subSubTitle}\n\n`;
          const subSectionDescription =
            subConfig.description || subConfig.title;
          if (subSectionDescription) md += `${subSectionDescription}\n\n`;

          md += `| Property name | Description | Type | Default |\n`;
          md += `| ------------- | ----------- | ---- | ------- |\n`;
          md += generateTable(subConfig, subNewPath);

          // Handle sub-sub-subsections (level 5)
          const subSubEntries = Object.entries(subConfig).sort(
            (a, b) => (a[1].index || 0) - (b[1].index || 0)
          );
          for (const [subSubKey, subSubConfig] of subSubEntries) {
            if (!subSubConfig.title) {
              const subSubSubTitle =
                subSubKey.charAt(0).toUpperCase() + subSubKey.slice(1);
              const subSubAnchor = subSubSubTitle.replace(/\s+/g, "");
              const subSubNewPath = `${subNewPath}.${subSubKey}`;

              md += `\n${"#".repeat(level + 3)} ${subSubSubTitle}\n\n`;
              const subSubSectionDescription =
                subSubConfig.description || subSubConfig.title;
              if (subSubSectionDescription)
                md += `${subSubSectionDescription}\n\n`;

              md += `| Property name | Description | Type | Default |\n`;
              md += `| ------------- | ----------- | ---- | ------- |\n`;
              md += generateTable(subSubConfig, subSubNewPath);
            }
          }
        }
      }
    }
  }
  return md + "\n";
}

// File paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readmePath = path.join(__dirname, "../README.md");
let readmeContent = readFileSync(readmePath, "utf8");

const currentVersion = packageJson.version;
readmeContent = readmeContent.replace(
  /tock-vue-kit@[\d.]+/g,
  `tock-vue-kit@${currentVersion}`
);

// Define sections with their introductions
const sections = [
  {
    marker: "LOCAL_STORAGE",
    data: localStorage,
    title: "LocalStorage",
    introduction:
      "Options relating to the persistence in _localStorage_ of messages exchanged by the user with the Tock instance:",
  },
  {
    marker: "INITIALIZATION",
    data: initialization,
    title: "Initialization",
    introduction:
      "Parameters for the initial setup and first interactions with the bot:",
  },
  {
    marker: "PREFERENCES",
    data: preferences,
    title: "Preferences",
    introduction:
      "Customization options for the chat interface and user experience:",
  },
  {
    marker: "WORDING",
    data: wording,
    title: "Wording",
    introduction:
      "Text labels and messages displayed in the interface (can be customized for internationalization):",
  },
  {
    marker: "TYPES",
    data: {
      ImageDef: {
        src: {
          type: "string",
          title: "Src of the image (url or svg data image)",
        },
        width: {
          type: "string",
          title: "Width in which to display the image.",
        },
        height: {
          type: "string",
          title: "Height in which to display the image.",
        },
      },
    },
    title: "Types",
    introduction: "Complex type definitions used in the configuration:",
  },
];

// Generate and replace each section
sections.forEach(({ marker, data, title, introduction }) => {
  let sectionContent = "";

  if (marker === "TYPES") {
    sectionContent = `### ${title}\n\n`;
    if (introduction) sectionContent += `${introduction}\n\n`;
    sectionContent += generateTypeSection("ImageDef", data.ImageDef);
  } else {
    sectionContent = generateSectionWithIntro(data, title, introduction, 2);
  }

  const regex = new RegExp(
    `<!-- ${marker}_TABLE_START -->.*<!-- ${marker}_TABLE_END -->`,
    "s"
  );
  readmeContent = readmeContent.replace(
    regex,
    `<!-- ${marker}_TABLE_START -->\n${sectionContent}<!-- ${marker}_TABLE_END -->`
  );
});

// Write updated README
writeFileSync(readmePath, readmeContent);
console.log("✅ README.md updated successfully!");
