<!--
SYNC IMPACT REPORT
==================
Version change: (none) → 1.0.0
Modified principles: (initial creation)
Added sections:
  - Core Principles (5 principles)
  - Development Workflow
  - Governance
Removed sections: (none)
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated (Constitution Check section)
  - .specify/templates/spec-template.md ✅ updated (Constitution Alignment section)
  - .specify/templates/tasks-template.md ✅ updated (TDD mandatory notices)
Follow-up TODOs: (none)
-->

# Markdown Preview Constitution

## Core Principles

### I. Test-First (NON-NEGOTIABLE)

TDD is mandatory for all feature development. Tests MUST be written first and
validated to fail before implementation begins (red-green-refactor cycle).

- **100% coverage required**: All statements, branches, functions, and lines
  must be covered (barrel exports excluded)
- **Test naming**: Descriptive names that clearly state what is being tested
- **Mocking**: External dependencies, API calls, and browser APIs MUST be mocked
- **Tools**: Vitest globals (`vi.fn()`, `vi.mock()`), Testing Library, user-event

**Rationale**: TDD ensures code correctness, prevents regressions, and drives
clean design by forcing consideration of edge cases upfront.

### II. Type Safety

Strict TypeScript is enforced across the entire codebase. No implicit `any`
types are permitted.

- **Strict mode**: All strict compiler options enabled
- **Interfaces over types**: Prefer interfaces for object shapes
- **Explicit typing**: All function parameters and return types must be explicit
- **Type guards**: Use TypeScript type guards for runtime type checking
- **Event types**: Use proper React event types (`React.MouseEvent`, etc.)

**Rationale**: Type safety catches errors at compile time, improves IDE
support, and serves as living documentation for component contracts.

### III. Component-Driven Architecture

All UI is built using functional React components with hooks. Components MUST
be self-contained, independently testable, and follow consistent structure.

- **Functional components only**: No class components
- **Hooks at top level**: Never inside loops or conditions
- **Props destructuring**: Destructure props in function signature
- **File organization**: One component per directory with types, tests, barrel
- **Semantic HTML**: Use proper tags (`header`, `nav`, `main`, `button`)

**Rationale**: Component-driven architecture enables reusability, testability,
and maintainable code organization.

### IV. Accessibility First

All UI components MUST be accessible. Accessibility is not optional—it is a
core requirement verified in code review and testing.

- **ARIA labels**: Include proper `aria-*` attributes where needed
- **Keyboard navigation**: All interactive elements must be keyboard accessible
- **Alt text**: All images must have descriptive alt text
- **Focus management**: Proper focus indicators and trap management for modals
- **Screen reader testing**: Verify components work with screen readers

**Rationale**: Accessibility ensures the application is usable by all users and
is often a legal requirement. It also improves overall UX.

### V. Simplicity (YAGNI)

Start simple. Do not add complexity until it is proven necessary. Trust the
React Compiler to handle optimizations automatically.

- **No manual memoization**: Avoid `useMemo` and `useCallback`—React Compiler
  handles it
- **No premature optimization**: Optimize only when performance issues are
  measured and proven
- **Single responsibility**: Each component/function does one thing well
- **Delete unused code**: Remove dead code immediately, don't comment out

**Rationale**: Unnecessary complexity increases cognitive load, maintenance
cost, and bug surface area. Simple code is easier to test and reason about.

## Development Workflow

### Code Style

- **Import order**: External libraries → Internal modules (`src/`) → Relative
  imports (enforced by `eslint-plugin-simple-import-sort`)
- **Naming conventions**:
  - Components: PascalCase (`UserProfile`)
  - Functions: camelCase (`getUserData`)
  - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)
  - Files: Match component/function name
- **Formatting**: Prettier with Tailwind plugin, auto-format on save
- **Documentation**: TSDoc comments for public APIs and complex functions

### Testing Standards

- **TDD workflow**: Tests written → User approved → Tests fail → Implement
- **Coverage exclusions**: Use `/* v8 ignore next -- @preserve */` for single
  lines or `/* v8 ignore start */` / `/* v8 ignore end */` for blocks
- **Test structure**: Arrange-Act-Assert pattern
- **User interactions**: Use `@testing-library/user-event` for simulations

### Git Practices

- **Conventional Commits**: Enforced by commitlint
- **Git hooks**: Husky + lint-staged enforce code quality on commits
- **Branch naming**: `[###-feature-name]` format
- **PR requirements**: Passing lint, type check, and tests mandatory

### Build & Development

- **Dev server**: `npm start` (Vite, opens browser at http://127.0.0.1:5173)
- **Production build**: `npm run build` (outputs to `dist/`)
- **Linting**: `npm run lint` (ESLint), `npm run lint:tsc` (TypeScript)
- **Testing**: `npm test` (Vitest), `npm run test:ci` (with coverage)

## Governance

This constitution supersedes all other development practices in the project.
Compliance is verified through automated checks and code review.

### Amendment Procedure

1. **Proposal**: Any contributor may propose an amendment via PR
2. **Discussion**: Minimum 48-hour discussion period for feedback
3. **Approval**: Requires consensus from maintainers
4. **Documentation**: All changes documented in Sync Impact Report (HTML
   comment at top of this file)
5. **Migration**: Breaking changes require migration plan in PR description

### Versioning Policy

Constitution versions follow semantic versioning:

- **MAJOR**: Backward-incompatible changes (principle removal, redefinition)
- **MINOR**: New principles, sections, or material expansions
- **PATCH**: Clarifications, wording improvements, typo fixes

### Compliance Review

- **PR verification**: All PRs MUST be checked against constitution principles
- **Automated enforcement**: ESLint, TypeScript, and test coverage enforce
  principles automatically where possible
- **Manual review**: Code reviewers verify principle compliance for non-automated
  aspects (accessibility, simplicity justification)

**Version**: 1.0.0 | **Ratified**: 2026-03-01 | **Last Amended**: 2026-03-01
