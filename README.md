# **Tock Vue Kit – Demo Branch**

This branch hosts the **demo application** for the Tock Vue Kit library, deployed as a GitHub Page at [https://doc.tock.ai/tock-vue-kit/](https://doc.tock.ai/tock-vue-kit/). It can also be used as a developement application for the two libraries (see below).

---

## **📦 Publishing to GitHub Pages**

To update the live demo:

1. **Ensure you are on the `demo` branch**:

   ```bash
   git checkout demo
   ```

2. **Update versions** in `config.json`:

   - Increase the `tock-vue-kit` (`tvk`) version.
   - If needed, increase the `tock-vue-kit-editor` (`tvke`) version.

3. **Build the demo**:

   ```bash
   npm run build
   ```

4. **Push changes** to the `demo` branch:

   ```bash
   git add .
   git commit -m "Update demo to tvk@x.y.z and tvke@a.b.c"
   git push origin demo
   ```

5. **Deploy to GitHub Pages**:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

---

## **🔧 Local Development Setup**

To develop and test the demo application locally:

### **Prerequisites**

- Ensure the following repositories are cloned **side by side**:
  ```
  /your-workspace/
  ├── tock-vue-kit/          # Main library
  ├── tock-vue-kit-editor/   # Editor library
  └── tock-vue-kit-demo/     # Demo application (this repo, on `demo` branch)
  ```
- **Node.js** ≥ v20 (recommended for Vite 5 compatibility).

---

### **Steps**

1. **Clone the repositories**:

   ```bash
   git clone https://github.com/theopenconversationkit/tock-vue-kit.git tock-vue-kit
   git clone https://github.com/theopenconversationkit/tock-vue-kit-editor.git tock-vue-kit-editor
   git clone -b demo https://github.com/theopenconversationkit/tock-vue-kit.git tock-vue-kit-demo
   ```

2. **Install dependencies in the library folders**:

   ```bash
   cd tock-vue-kit
   npm install
   cd ../tock-vue-kit-editor
   npm install
   ```

3. **Navigate to the demo application**:

   ```bash
   cd ../tock-vue-kit-demo
   ```

4. **Install dependencies for the demo**:

   ```bash
   npm install
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```
   > **Note**: When building the demo app, the `prebuild` script automatically replaces local paths (`file:../...`) with the **published versions** of `tock-vue-kit` and `tock-vue-kit-editor` (as defined in `config.json`). This ensures a clean installation of all nested dependencies.
   > The `postbuild` script will **restore local paths** (`file:../...`) after the build, allowing you to work on the libraries and demo simultaneously.

---

### **How It Works**

- **`prebuild` script** (`scripts/set-dependency-prebuild.js`):

  - Replaces local paths with **published versions** from `config.json` (e.g., `tock-vue-kit@x.y.z`).
  - Installs these versions via `npm install` to resolve all nested dependencies.
  - Example output:
    ```
    → Build: using tock-vue-kit@2.0.0
    → Build: using tock-vue-kit-editor@0.2.0
    ```

- **`postbuild` script** (`scripts/set-dependency-postbuild.js`):
  - Restores the **local paths** (`file:../tock-vue-kit`) in `package.json`.
  - Allows live development with local changes to the libraries.
  - Example output:
    ```
    → Dev: restored tock-vue-kit and tock-vue-kit-editor to local path (file:../tock-vue-kit)
    ```

---

### **Key Files**

| File                          | Purpose                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `config.json`                 | Defines the **published versions** of `tock-vue-kit` and `tock-vue-kit-editor`. |
| `scripts/set-dependency-*.js` | Scripts to toggle between local and published dependencies.                     |
| `package.json`                | Automatically updated by `prebuild`/`postbuild` scripts.                        |

---

### **Troubleshooting**

#### **1. Missing Dependencies or Installation Issues**

- **Symptoms**: Errors like `Cannot find module 'X'` or unresolved dependencies.
- **Solution**:
  - Ensure you have run `npm install` in both `tock-vue-kit` and `tock-vue-kit-editor` before starting the demo.

#### **2. Hot-Reload Not Working**

- **Symptoms**: Changes in `tock-vue-kit` or `tock-vue-kit-editor` are not reflected in the demo without a server restart.
- **Solution**:
  - Vite is already configured to watch the parent directories (`../tock-vue-kit/src` and `../tock-vue-kit/node_modules`) via the `server.fs.allow` option in `vite.config.ts`. No additional configuration is required.
  - If issues persist, restart the Vite server:
    ```bash
    npm run dev
    ```

#### **3. CSS Not Loading in Development**

- **Symptoms**: The styles from `tock-vue-kit` are missing in development mode.
- **Solution**:
  - The `vite.config.ts` already handles this by excluding the CSS import in development mode via the `replace` plugin:
    ```javascript
    replace({
      preventAssignment: true,
      values: {
        'import "tock-vue-kit/dist/style.css";': isProduction
          ? 'import "tock-vue-kit/dist/style.css";'
          : "",
      },
    }),
    ```
  - Ensure that the local SCSS files from `tock-vue-kit` are correctly imported in your demo application.

#### **4. Version Conflicts**

- **Symptoms**: Warnings about version conflicts, especially for `vue`.
- **Solution**:
  - The `resolve.dedupe` option in `vite.config.ts` ensures that only one version of `vue` is used:
    ```javascript
    resolve: {
      dedupe: ["vue"],
    },
    ```
  - Verify that the versions in `config.json` match the latest published releases of `tock-vue-kit` and `tock-vue-kit-editor`.

#### **5. Build Issues in Production**

- **Symptoms**: Errors during the build process in production mode.
- **Solution**:
  - Ensure that the `prebuild` script has correctly replaced local paths with published versions in `package.json`.
  - Check that the `optimizeDeps.exclude` option in `vite.config.ts` excludes `tock-vue-kit` to avoid bundling issues:
    ```javascript
    optimizeDeps: {
      exclude: ["tock-vue-kit"],
    },
    ```

#### **6. Path Resolution Issues**

- **Symptoms**: Errors related to incorrect path resolution for `tock-vue-kit` or `tock-vue-kit-editor`.
- **Solution**:
  - The `resolve.alias` option in `vite.config.ts` handles path resolution for both development and production:
    ```javascript
    resolve: {
      alias: {
        "tock-vue-kit": isProduction
          ? "tock-vue-kit"
          : fileURLToPath(new URL(config.tockVueKit.localPath, import.meta.url)),
      },
    },
    ```
  - Ensure that `config.json` contains the correct `localPath` for `tock-vue-kit`.

---

**Need further assistance?** Open an issue or contact [@RodolpheKüffer](https://github.com/theopenconversationkit) for support. 🚀
