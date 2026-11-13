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

## Shelf state and handlers

App owns the complete shelf in `useState<Book[]>(BOOKS)`. It filters that state into the read and unread groups on every render. Both handlers use the updater form: toggling maps to a new array and copies only the changed book; deleting filters to a new array. Reset restores the original seed array, which neither handler mutates.

### Why card-local read state fails

The scratch version initializes `const [isRead, setIsRead] = useState(book.is_read)` and toggles only that local value. Its badge, border, and button label can change, but App's book is unchanged. The card stays in its original section and the section counts do not change. The Components panel would show the card's local state disagreeing with its read prop and App's shelf state.

The initializer only runs when the card mounts; it does not keep local state synchronized with later prop changes. Resetting App's shelf can leave an already mounted card showing its stale local value. Keep one owner of the read status in App and have cards call the supplied handler instead.

### Finished component tree

```text
App [books state; toggleRead(id); deleteBook(id); reset via setBooks(BOOKS)]
├── Header
├── Main
│   ├── ResultCount [count = books.length]
│   ├── Reset shelf button [calls App's setBooks]
│   ├── BookList [Unread; books filtered from state; onToggleRead; onDelete]
│   │   ├── ResultCount [unread count]
│   │   └── BookCard × unread books [id; book fields; onToggleRead; onDelete]
│   │       └── BookText [title; author; genre; optional pages]
│   └── BookList [Read; books filtered from state; onToggleRead; onDelete]
│       ├── ResultCount [read count]
│       └── BookCard × read books [id; book fields; onToggleRead; onDelete]
│           └── BookText [title; author; genre; optional pages]
└── Footer
```

State-derived values and callback props go down the tree. A card button calls `onToggleRead(id)` or `onDelete(id)`, executing the handler owned by App. React then renders the updated groups from App's new state.

## Derived values do not belong in state

### Two values drifting apart

In a temporary App copy, I added `const [readCount, setReadCount] = useState(6)` and updated it in `toggleRead`. Toggling Piranesi, Dune, Piranesi, and Dune produced counts of 7, 6, 5, and 6 out of 12, matching the cards each time.

Then I deleted Dune, a read book. Its card disappeared and the Read section showed 5 books, but the counter still said **6 of 11 read**. The correct counter was **5 of 11 read**. The total followed `books.length`, while the separate readCount state had no update in the delete path.

This experiment used the button callbacks in a queued state harness and React-rendered markup. TypeScript accepted the broken version, and React emitted no warning: both state values had valid types, and neither system knew the rule that readCount must equal the number of read books.

Keeping the separate counter correct would require updating it in every relevant path: increment or decrement on toggle, decrement when deleting a read book, leave it unchanged when deleting an unread book, and restore it to 6 on reset. Forgetting any of these creates another disagreement.

### Final version

Only `books` is state. `readBooks` and `unreadBooks` are filtered from it during rendering, `readCount` is `readBooks.length`, and the total is `books.length`. Each section's ResultCount uses its own array's length. The toggle, delete, and reset handlers are unchanged and contain no counter logic.

Checked the derived counter after toggling in both directions, deleting a read book, deleting an unread book, deleting every book (0 of 0 read), and resetting (6 of 12 read). The section counts agreed throughout.

### Can this be worked out from something I already have?

| Value | State? | Reason |
| --- | --- | --- |
| `books` | Yes | It records the user's current shelf, including toggles and deletions. The constant seed cannot tell us those changes. |
| `readCount` | No | It can be calculated from the current books: filter by is_read and take the length, or use readBooks.length. |
| `readBooks` | No | It can be calculated from books with filter. Storing the group separately would duplicate information that must be kept synchronized. |

## Typed filters and shared shelf state

### Mistyped filter experiment

Temporarily adding `setFilter('raed')` produced this actual compiler error:

```text
error TS2345: Argument of type '"raed"' is not assignable to parameter of type 'SetStateAction<StatusFilter>'.
```

Changing the shared StatusFilter type to string made the same code compile without errors. The predicate recognizes only all, read, and unread, so raed matches nothing and silently produces an empty visible list. The final code restores the union and removes the typo. These compiler experiments used in-memory source copies.

### Where state belongs

In a scratch placement experiment, Shelf owned books while a separate sibling tried to render ReadCounter from those books. TypeScript reported `TS2552: Cannot find name 'books'. Did you mean 'BOOKS'?` A sibling cannot read another component's local variables or state. A shared parent must own the value and pass it down; merely sharing an ancestor is not enough if the state stays private to one child.

App is the closest component that composes the filter controls, reset button, and Shelf. It owns books and filter, derives visibleBooks and the full-shelf read count, and passes the needed values and callbacks down. Main wraps children supplied by App; it does not own or wire the shelf's data. Moving state above App would add an unnecessary layer because Header and Footer do not need it.

The final Shelf renders ReadCounter beside BookList. Shelf forwards readCount and total to ReadCounter, plus the visible books and action callbacks to BookList. BookList forwards onToggleRead and onDelete to BookCard without invoking them itself. Main passes the composed children through without reading shelf state.

### Current component tree

```text
App [state: books, filter; derives visibleBooks and readCount]
├── Header
├── Main [children wrapper]
│   ├── FilterBar [current = filter; onChange = setFilter; no state]
│   ├── Reset shelf button [setBooks(BOOKS); keeps the selected filter]
│   └── Shelf [visible books, global counts, action callbacks; no state]
│       ├── ReadCounter [readCount and total from the whole shelf]
│       └── BookList [visibleBooks; no state]
│           ├── ResultCount [visibleBooks.length]
│           └── BookCard × visible books [onToggleRead(id), onDelete(id)]
│               └── BookText [book text and optional pages]
└── Footer
```

| State | Owner | Readers | Updates |
| --- | --- | --- | --- |
| books | App | App derives visibleBooks, readCount, and total; Shelf passes these to BookList, ResultCount, BookCard, BookText, and ReadCounter. | toggleRead maps immutably, deleteBook filters, and Reset shelf restores BOOKS. |
| filter | App | App selects visibleBooks; FilterBar reads current to set aria-pressed and is-active. | FilterBar calls onChange with all, read, or unread, which calls App's setFilter. |

visibleBooks and all counts are derived values, not additional state. ReadCounter describes the whole shelf; ResultCount describes the filtered list.

## Task 6: Validation and accessible errors

### What FormErrors means

`keyof FormValues` means the field names: title, author, and genre. `Record<keyof FormValues, string>` gives each field a string message. `Partial` makes those messages optional, so `{}` means there are no errors and `{ title: 'Title is required.' }` means only the title has an error. The permitted keys follow FormValues automatically; a new field would also be allowed in FormErrors. A misspelling such as `errors.titel` is not a permitted key.

### Validation rules

Title and Author must contain something other than spaces, and Genre must be chosen. Without `.trim()`, a string containing only spaces is truthy and passes a check such as `if (!title)`. Trimming makes that string empty, so the required check rejects it. The title limit counts the entered characters, including surrounding spaces: 100 is allowed and 101 is rejected. Validation returns messages without changing the submitted values.

### What each accessibility attribute adds

- The conditional `p` displays the message and gives it a stable `id` that a field can refer to.
- `aria-invalid` tells assistive technology that the submitted value failed validation.
- `aria-describedby` connects the field to its error text, making the message its accessible description. When there is no error, the value is `undefined`, so React omits the attribute. Removing the attribute leaves the message visible but removes this description link; the text can still be encountered separately while reading the page.
- `role="alert"` lets assistive technology announce a newly displayed message without requiring focus to move to it.
- `noValidate` skips the browser's built-in submission checks so the form's submit handler can display all our messages. `required` remains on the controls and still exposes that they are required to assistive technology.

### Decision: validity is derived

I can work out whether the form is valid from the current values: `Object.keys(validate(values)).length === 0`. A separate isValid state would duplicate that answer and could become stale. The errors state records the result of the latest submission; it is not necessarily validation of the current keystroke, because this form validates on submit.

### Decision: keep submit available

A disabled submit button cannot be activated to show what is wrong. A user trying to submit would be left with an unavailable action and no explanation of what to fix. Keeping submit enabled lets the user ask to continue, see specific messages, fix the fields, and resubmit. An invalid submission returns before calling onAddBook. A valid submission adds the book and clears both values and errors. Clear also resets both.
