# Scratch notes

## Task 4: Props and the contract

### Missing author

```tsx
<BookCard title="Dune" genre="sci-fi" isRead={true} />
```

```text
src/task4-prop-errors.tsx(3,25): error TS2741: Property 'author' is missing in type '{ title: string; genre: string; isRead: true; }' but required in type 'BookCardProps'.
```

### String instead of boolean

```tsx
<BookCard title="Dune" author="Frank Herbert" genre="sci-fi" isRead="yes" />
```

```text
src/task4-prop-errors.tsx(3,85): error TS2322: Type 'string' is not assignable to type 'boolean'.
```

### Misspelled author prop

```tsx
<BookCard title="Dune" auther="Frank Herbert" genre="sci-fi" isRead={true} />
```

```text
src/task4-prop-errors.tsx(3,47): error TS2322: Type '{ title: string; auther: string; genre: string; isRead: true; }' is not assignable to type 'IntrinsicAttributes & BookCardProps'.
  Property 'auther' does not exist on type 'IntrinsicAttributes & BookCardProps'. Did you mean 'author'?
```

All three mistakes were fixed in the final components; each card supplies the required props with the correct names and types.
