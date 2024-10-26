# Golden Rules

# If the code isn't being used in more than one place don't make a component / helper function

## Organization

#### Should I create a component?

Ask yourself...

- How many different files are going to use this component? 2 files? 10 files? 100 files? – Less than 20? Don't make a component.

- Will the component be used exactly the same way in every file? Or will it have to render slightly different things depending on what page it's on? If the component will need "variation code", how many files will use each variation? If each variation will be used less than 20 times, don't make a component.

Instead of making a component...

- **Simplify the code as much as you can** – Reduce the number of lines by removing unnecessary console logs, writing one-liners (while maintaining readability), using other core components (ex. Button, Input, etc.), using general-purpose helper functions (see below).

- **Export** – If the component doesn't need any "variation code", go ahead and export it from one file and import it into the other files. No need to create a separate component file.

- **Variation Code? Just copy & paste** – It's OK. Duplicate code is fine. Let's keep "variation code" in the files that depend on it. It's better than having a fat component that's only being used in 2 different files.

#### Should I create a helper function?

#### Should I export the function/component/type/const to be used in another file?

#### Should I create a global type in the types folder?

## Naming

In general, folders and files use dashes: `my-cool-file.tsx`

Components

```ts
// my-component.tsx <- use dashes

// Always end type name with "Props"...
type MyComponentProps = { prop1: string };

function MyComponent({ prop1 }: MyComponentProps) {
  // Use function, not `const MyComponent = () => {}`
  // ...

  // Follow format: handle<EVENT><NAME>Button for event handlers
  const handleClickAddToCartButton = () => {};
}
```

Modals

## File Structure

#### Components

- DO: Create a type for the props and place it immediately above the component.
