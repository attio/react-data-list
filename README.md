# React Data List

React Data List is a library which helps you build data arrays by expressing items declaratively using React components. It was built primarily for React Native, but should work anywhere.

## Why?

For a full explanation around why this exists, please checkout the counterpart [article here](https://attio.com).

## 

## How does it look?

### Example 1 - Basic

```tsx
function ErrorOnRenderCheck() {
    return (
        <View
            onLayout={() => {
                throw new Error("This never happens as we evaluate descriptors before first paint.")
            }}
        />
    )
}

<ReactDataList
    renderer={
        <FlashListRenderer
            contentContainerStyle={contentContainerStyle}
            ListHeaderComponent={
                <Header
                    toggleThorinAndCompany={toggleThorinAndCompany}
                    jumbleFellowship={jumbleFellowship}
                />
            }
        />
    }
    renderEmpty={() => (
        /**
         * This never happens as we're guaranteed rows will be
         * evaluated to data items on first paint.
         */
        <View style={styles.alert}>
            <ErrorOnRenderCheck />
        </View>
    )}
>
    {/* Supports nested ReactDataList instances */}
    <ListHeaderDataListRow title="Places in Middle Earth" />
    <MiddleEarthPlacesDataListRow placeItems={MIDDLE_EARTH_PLACES} />

    <ListHeaderDataListRow title="The Fellowship" />
    {fellowship.map((character) => (
        <CharacterListItemDataListRow
            key={character.name}
            name={character.name}
            race={character.race}
            url={character.url}
        />
    ))}

    {isShowingThorinAndCompany && (
        <>
            <ListHeaderDataListRow title="Thorin and Company" />
            <React.Suspense fallback={<LoadingListItemDataListRow />}>
                <MiddleEarthHobbitCompanyDataListRows />
            </React.Suspense>
        </>
    )}
</ReactDataList>
```

https://github.com/user-attachments/assets/23c2d232-7f35-470e-98b4-156efaaf326a

### Example 2 - Fetchable Template

A lightweight wrapper around `ReactDataList` which provides a top-level [React.Suspense](https://react.dev/reference/react/Suspense) and [ErrorBoundary](https://react.dev/reference/react/Component#static-getderivedstatefromerror). This is useful for typical async work, where you may want to display skeleton rows (via `renderPendingRows`), a full-screen spinner (via `renderPending`), or perhaps a full-screen error message (via `renderError`).

```tsx
<ReactDataList.Fetchable
    renderer={
        <FlashListRenderer
            contentContainerStyle={contentContainerStyle}
            ListHeaderComponent={<Header reload={reload} />}
        />
    }
    renderPendingRows={
        <>
            <ListHeaderDataListRow title="Thorin and Company" />
            <LoadingListItemDataListRow />
            <LoadingListItemDataListRow />
            <LoadingListItemDataListRow />
            <LoadingListItemDataListRow />
            <LoadingListItemDataListRow />
            <LoadingListItemDataListRow />
        </>
    }
>
    <ListHeaderDataListRow title="Thorin and Company" />
    <MiddleEarthHobbitCompanyDataListRows key={reloadKey} />
</ReactDataList.Fetchable>
```

https://github.com/user-attachments/assets/8ab7b63e-1ddc-40f9-8d20-6d443f21c934

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
