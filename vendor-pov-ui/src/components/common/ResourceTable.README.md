ResourceTable (generic)
=======================

This component is a small, generic, and typed resource grid/list helper.

Props
- `items: T[]` — array of items of any shape
- `renderItem?: (item: T) => React.ReactNode` — full control render prop
- `getImageSrc?: (item: T) => string` — helper for standard layout
- `getTitle?: (item: T) => React.ReactNode` — helper for standard layout
- `keyExtractor?: (item: T) => string | number` — unique key for items
- `isLoading`, `loading`, `fallback` — loading / empty UI customization

Examples

Using existing places shape via `PlacesList`:

```tsx
<PlacesList places={places} isLoading={isLoading} onSelect={handleSelect} />
```

Using `ResourceTable` directly with `renderItem`:

```tsx
<ResourceTable
  items={products}
  keyExtractor={(p) => p.id}
  renderItem={(p) => (
    <div className="product-card">
      <img src={p.image} alt={p.name} />
      <strong>{p.name}</strong>
    </div>
  )}
  onSelect={(p) => setSelected(p)}
/> 
```
