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

## Task 5: Rendering the shelf from data

- Removing the key produced React's warning: `Each child in a list should have a unique "key" prop.` TypeScript still reported no errors.
- Putting a key on the card's inner li still produced the same warning. The mapped BookCard element needs the key.
- An array index can appear to work, but reordering, inserting, or deleting books changes which book owns each position. React can reuse a card's local state or input value for a different book. A book's stable id keeps its identity tied to the book.
- Rendering `books.length && ...` with an empty array produced `<ul>0</ul>`. The final list uses `books.length === 0` and a ternary, so it renders the empty-state li instead.
- React consumes `key`; reading it as a prop returned `undefined` and produced the warning that key is not a prop. BookCard receives only title, author, genre, and isRead.

These warning and markup checks used React's development server renderer. The final full list and empty list both rendered without warnings.
