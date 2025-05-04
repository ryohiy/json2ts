# json2ts

A CLI tool to convert JSON files to TypeScript constant objects.

## Features

- Convert JSON files to TypeScript constant objects with `as const` assertions
- Generate constant names automatically from JSON filenames
- Interactive overwrite confirmation for existing files
- Pretty-printed output with proper indentation

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd json2ts
```

2. Make the CLI executable
```bash
chmod +x bin/json2ts.js
```

## Usage

Convert a JSON file to TypeScript:
```bash
node bin/json2ts.js path/to/your/file.json
```

### Examples

1. Basic usage with `test.json`:
```json
// test.json
{
    "name": "John",
    "age": 30
}
```

Running the converter:
```bash
node bin/json2ts.js test.json
```

This will create `test.ts` with the content:
```typescript
const TEST = {
    "name": "John",
    "age": 30
} as const;
```
