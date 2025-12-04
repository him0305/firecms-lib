# @him0305/firecms-lib

A React + TypeScript library for FireCMS published to GitHub Packages.

## Installation

To install this package from GitHub Packages, you need to authenticate with GitHub first.

### 1. Create a Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `read:packages` scope
3. Copy the token

### 2. Configure npm to use GitHub Packages

Create or edit `~/.npmrc` in your home directory and add:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
@him0305:registry=https://npm.pkg.github.com
```

Replace `YOUR_GITHUB_TOKEN` with your personal access token.

### 3. Install the package

```bash
pnpm add @him0305/firecms-lib
```

Or with npm:

```bash
npm install @him0305/firecms-lib
```

Or with yarn:

```bash
yarn add @him0305/firecms-lib
```

## Usage

```typescript
import { 
  referenceAdditionalField,
  ExportCollectionActions,
  ReferenceField,
  AvatarField,
  AvatarPreview,
  ReferencePreview,
  ReferenceArrayPreview
} from '@him0305/firecms-lib';

// Use additional fields in your FireCMS collections
const myAdditionalField = referenceAdditionalField({
  key: 'related_item',
  name: 'Related Item',
  path: 'items',
});

// Use collection actions
// Add ExportCollectionActions to your collection configuration

// Use custom fields in your property configurations
// field: ReferenceField or AvatarField

// Use custom previews
// Preview: AvatarPreview, ReferencePreview, or ReferenceArrayPreview
```

## Development

### Setup

1. Clone the repository:
```bash
git clone https://github.com/him0305/firecms-lib.git
cd firecms-lib
```

2. Install pnpm (if not already installed):
```bash
npm install -g pnpm
# or
corepack enable
```

3. Install dependencies:
```bash
pnpm install
```

### Available Scripts

- `pnpm build` - Build the library for production
- `pnpm dev` - Build the library in watch mode for development
- `pnpm lint` - Run ESLint to check for code issues
- `pnpm lint:fix` - Run ESLint and automatically fix issues
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check if code is formatted correctly

### Building

```bash
pnpm build
```

This will generate the compiled library in the `dist/` directory with:
- CommonJS format (`dist/index.js`)
- ES Module format (`dist/index.mjs`)
- TypeScript declarations (`dist/index.d.ts`)

## Publishing

This library uses GitHub Actions for automated publishing to GitHub Packages.

### Publishing a New Version

1. Update the version in `package.json`:
```bash
pnpm version patch  # for bug fixes
pnpm version minor  # for new features
pnpm version major  # for breaking changes
```

2. Push the version tag to GitHub:
```bash
git push origin main --tags
```

3. GitHub Actions will automatically build and publish the package when it detects a new tag matching `v*.*.*` (e.g., `v1.0.0`, `v1.0.1`, etc.)

### Manual Publishing

If you need to publish manually:

1. Ensure you're authenticated with GitHub Packages
2. Build the library: `pnpm build`
3. Publish: `pnpm publish`

Note: You need a GitHub Personal Access Token with `write:packages` permission.

## Project Structure

```
firecms-lib/
├── .github/
│   └── workflows/
│       └── publish.yml      # GitHub Actions workflow
├── src/
│   └── index.ts            # Main entry point
├── dist/                   # Build output (generated)
├── .eslintrc.json         # ESLint configuration
├── .prettierrc            # Prettier configuration
├── .prettierignore        # Prettier ignore patterns
├── .gitignore            # Git ignore patterns
├── .npmrc                # npm configuration for GitHub Packages
├── package.json          # Package metadata and dependencies
├── tsconfig.json         # TypeScript configuration
├── tsup.config.ts        # tsup build configuration
└── README.md            # This file
```

## License

MIT

