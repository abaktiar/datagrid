# Publishing Guide for @abaktiar/datagrid

This guide covers the complete process of publishing and maintaining the `@abaktiar/datagrid` npm package.

## 📋 Pre-Publishing Checklist

### 1. Development Setup
- [ ] All dependencies are up to date
- [ ] TypeScript compilation is successful
- [ ] Library build completes without errors
- [ ] All tests pass (if applicable)
- [ ] ESLint issues are resolved or acceptable
- [ ] Documentation is complete and accurate

### 2. Version Management
- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with new features/fixes
- [ ] Create git tag for the version
- [ ] Ensure all changes are committed

### 3. Build Verification
- [ ] Run `npm run build:lib` successfully
- [ ] Verify `dist/` folder contains all required files:
  - `index.js` (CommonJS)
  - `index.esm.js` (ES Modules)
  - `index.d.ts` (TypeScript declarations)
  - `datagrid.css` (Styles)
  - Source maps

## 🚀 Publishing Process

### Step 1: Build the Package
```bash
npm run build:lib
```

### Step 2: Test Package Locally (Optional)
```bash
# Pack the package to test
npm pack

# This creates a .tgz file you can install locally for testing
npm install @abaktiar-datagrid-1.0.0.tgz
```

### Step 3: Login to NPM
```bash
npm login
```
Enter your npm credentials when prompted.

### Step 4: Publish to NPM
```bash
# For first-time publishing of scoped package
npm publish --access public

# For subsequent updates
npm publish
```

### Alternative: Use the Convenience Script
```bash
npm run publish:npm
```

## 🔧 Package.json Scripts Explained

- `build:lib` - Builds the library for distribution
- `prepublishOnly` - Automatically runs before publishing
- `publish:npm` - Convenience script for publishing

## 📁 Files Included in Package

The following files are included in the npm package (see `.npmignore`):

### Included:
- `dist/` - Built library files
- `README.md` - Package documentation
- `LICENSE` - MIT license
- `CHANGELOG.md` - Version history
- `package.json` - Package metadata

### Excluded:
- Source files (`src/`)
- Development configs
- Demo files
- Build tools
- Documentation specific to development

## 🏷️ Version Management

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
- **MINOR** (1.0.0 → 1.1.0): New features (backward compatible)
- **PATCH** (1.0.0 → 1.0.1): Bug fixes (backward compatible)

### Update Version
```bash
# Patch version
npm version patch

# Minor version
npm version minor

# Major version
npm version major
```

## 📦 Package Distribution

The package supports multiple module systems:

### ES Modules (Recommended)
```javascript
import { DataGrid } from '@abaktiar/datagrid';
import '@abaktiar/datagrid/styles';
```

### CommonJS
```javascript
const { DataGrid } = require('@abaktiar/datagrid');
require('@abaktiar/datagrid/styles');
```

### TypeScript
Full TypeScript support with comprehensive type definitions.

## 🔍 Testing the Published Package

### 1. Create a Test Project
```bash
mkdir test-datagrid
cd test-datagrid
npm init -y
npm install react react-dom @types/react @types/react-dom
npm install @abaktiar/datagrid
```

### 2. Test Basic Import
```typescript
import React from 'react';
import { DataGrid, DataGridColumn } from '@abaktiar/datagrid';
import '@abaktiar/datagrid/styles';

// Test basic functionality
const data = [{ id: 1, name: 'Test' }];
const columns: DataGridColumn[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'name', header: 'Name' }
];

function TestApp() {
  return <DataGrid data={data} columns={columns} />;
}
```

## 🐛 Troubleshooting

### Common Issues:

1. **Build Fails**
   - Check TypeScript errors
   - Verify all dependencies are installed
   - Clear `dist/` folder and rebuild

2. **Package Not Found**
   - Ensure package name is correct (`@abaktiar/datagrid`)
   - Check if package was published successfully
   - Verify npm registry

3. **Type Errors**
   - Ensure TypeScript declarations are generated
   - Check `index.d.ts` exists in dist folder

4. **CSS Not Loading**
   - Import styles: `import '@abaktiar/datagrid/styles'`
   - Check CSS file path in package.json exports

## 📈 Post-Publication

### 1. Update Documentation
- [ ] Update GitHub README if different from npm README
- [ ] Update any external documentation sites
- [ ] Create release notes on GitHub

### 2. Announce Release
- [ ] GitHub release with changelog
- [ ] Social media announcement (if applicable)
- [ ] Update project dependencies that use this package

### 3. Monitor Usage
- [ ] Check npm download statistics
- [ ] Monitor for issues/bug reports
- [ ] Respond to community feedback

## 🔄 Maintenance Workflow

### Regular Updates:
1. Fix bugs and add features
2. Update version in package.json
3. Update CHANGELOG.md
4. Commit and tag changes
5. Build and publish
6. Create GitHub release

### Security Updates:
1. Monitor dependency vulnerabilities
2. Update dependencies regularly
3. Publish patch versions for security fixes

## 📞 Support

For questions about publishing or package issues:
- Check [npm documentation](https://docs.npmjs.com/)
- Review [package.json docs](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- File issues on [GitHub repository](https://github.com/abaktiar/datagrid)

---

**Note:** Always test thoroughly before publishing to ensure the package works correctly for end users.