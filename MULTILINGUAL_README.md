# Multilingual Website Structure

## Language Folders

This website supports multiple languages with the following folder structure:

- `/en` - English (default)
- `/de` - German (Swiss spelling)
- `/cn` - Chinese (Simplified)
- `/jp` - Japanese
- `/fr` - French (Swiss spelling)
- `/it` - Italian (Swiss spelling)
- `/es` - Spanish (Latin America spelling)
- `/pt` - Portuguese (Latin America spelling)
- `/ko` - Korean
- `/hi` - Hindi
- `/nl` - Dutch

## Language Error Handling

Each language folder contains a `language-errors.md` file that defines common language errors to ignore during linting and spell-checking.

### Special Considerations

#### Swiss Languages (CH)
- **German (de)**: Uses Swiss German spelling (e.g., "ss" instead of "ß")
- **French (fr)**: Uses Swiss French terminology and business practices
- **Italian (it)**: Uses Swiss Italian terminology and business practices

#### Latin America Languages
- **Spanish (es)**: Uses Latin America Spanish spelling and terminology
- **Portuguese (pt)**: Uses Latin America Portuguese spelling and terminology

#### Asian Languages
- **Chinese (cn)**: Supports both Simplified and Traditional Chinese
- **Japanese (jp)**: Uses standard Japanese with business terminology
- **Korean (ko)**: Uses standard Korean with business terminology
- **Hindi (hi)**: Uses standard Hindi with business terminology

#### European Languages
- **Dutch (nl)**: Uses standard Dutch with business terminology

## Implementation Notes

1. **Swiss Business Context**: All languages include Swiss business terminology and practices
2. **Regional Spelling**: Each language uses appropriate regional spelling conventions
3. **Professional Communication**: Focus on clarity over perfect grammar
4. **Business Terminology**: Includes industry-specific terms for automation, tax, and finance

## Usage

Each `language-errors.md` file serves as a reference for:
- Linting tools to ignore common errors
- Spell-checkers to skip known issues
- Translation tools to understand context
- Content creators to maintain consistency

## File Structure

```
/
├── en/
│   └── language-errors.md
├── de/
│   └── language-errors.md
├── cn/
│   └── language-errors.md
├── jp/
│   └── language-errors.md
├── fr/
│   └── language-errors.md
├── it/
│   └── language-errors.md
├── es/
│   └── language-errors.md
├── pt/
│   └── language-errors.md
├── ko/
│   └── language-errors.md
├── hi/
│   └── language-errors.md
├── nl/
│   └── language-errors.md
└── MULTILINGUAL_README.md
```
