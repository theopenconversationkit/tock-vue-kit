# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.2] - 2025-06-30

### Added

- **`preferences.messages.footNotes.condensedDisplay`**: New option to display source links in a condensed format (shows only numbers, hides titles). _Note: This parameter has no effect if `requireSourcesContent` is enabled._

---

## [2.0.0] - 2026-01-05

### Added

- User feedback UI component for bot messages (thumbs up/down) to improve interaction quality and model evaluation.
- Support for custom icon libraries (e.g., Font Awesome, Material Icons) instead of hardcoded `bootstrap-icons`.

### Changed

- **BREAKING**: Removed automatic CDN inclusion of `bootstrap-icons`. Users must now include their preferred icon library manually. See [Migration Guide](#migration) for details.

### Removed

- Bundled `bootstrap-icons` dependency to allow flexibility in icon library choice.

### Migration

To migrate from v1.x.x to v2.0.0:

Include your preferred icon library (e.g., via CDN or npm):

```html
<!-- Example: Bootstrap Icons via unpkg -->
<link
  rel="stylesheet"
  href="https://unpkg.com/bootstrap-icons@1.11.3/font/bootstrap-icons.css"
/>
```

or
`bash
    npm install bootstrap-icons
    `

```javascript
import "bootstrap-icons/font/bootstrap-icons.css";
```
