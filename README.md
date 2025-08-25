# React Data List

A library for composing data arrays using React components.

## Why?

Universal List is an API for composing together lists.

In React Native world, virtualized lists are modelled with a flat array of data, along with a render function that describes how to render items. Most of our screens tend to be represented virtualized lists. It's a pillar to how we build.

However, building this data array can be really difficult. The straightforward approach is to simply have a dataFetchable that's the result of a single useNexusSelector call. However quickly becomes a problem when you want to have granular control over loading states (e.g. if we fail to load a single notification then don't poison the entire fetchable) or especially when you want to compose familiar data & render logic across screens (e.g. task picker items on the record detail page). When you need to solve both of those problems you quickly end up in a real mess with data selectors that are hundreds of lines long and not approachable.

Universal List allows you to model the creation of this data array in React JSX, encouraging the use of Suspense and Error Boundaries to achieve the behaviors you want. Nexus has first-class support for these wider React concepts, so the ergonomics are quite nice.

## How does it work?

There are two main concepts: **row** and **renderer**.
A **row** syncs some data and a render function to the list. The universal list then processes this into an aggregated data array, render function and other typical list functions. These then get passed into a renderer which takes the Universal List format and translates it into inputs for some list component, like FlashList. We refer to the item data that a row syncs as its **descriptor**

## Release Process

This repo uses **Changesets** for versioning and **GitHub Actions** for automated publishing.

### 1. Create Changesets for Changes

```bash
# Generate a changeset for your changes
bunx changeset
```

- Select which packages are affected by your changes
- Choose the appropriate semantic version bump (patch, minor, major)
- Write a descriptive summary of the changes
- Commit the generated changeset file in `.changeset/`

### 2. Automated Version Management

When you push to the `master` branch, the GitHub Action will:

- **Create a Release PR**: If there are pending changesets, it creates a "Version Packages" PR with updated version numbers, CHANGELOGs, and consumed changeset files

### 3. Release Publication

When the "Version Packages" PR is merged:

- **Automated Build**: Builds only packages using `bun run build-release`
- **Automated Publishing**: Publishes updated packages to NPM via `changeset publish`
- **Git Tagging**: Creates appropriate git tags for the released versions

### Manual Release (if needed)

```bash
# 1. Create changesets for changes
bunx changeset

# 2. Version packages (updates versions + CHANGELOGs)
bun run changeset-version

# 3. Build and publish
bun run changeset-publish
```
