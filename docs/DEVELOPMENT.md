# Development Notes

This document is the working source of truth for the current product direction, data dependencies, and next steps for the Chinese Universities project.

## Workspace layout

Sibling projects under:

- `C:\Users\florent\codes\chinese-universities\chinese-universities-web`
- `C:\Users\florent\codes\chinese-universities\chinese-universities-db`
- `C:\Users\florent\codes\chinese-universities\chinese-universities-data`

Current focus is on `web` and `db`.

## Product direction

The site is evolving from a simple C9 landing page into a university discovery product.

Planned discovery entrypoints:

- Classifications
- Rankings
- Provinces / cities
- Majors
- Scholarships
- Guides
- Blog
- Search

The universities directory should eventually support filtering and comparison across these dimensions.

## Current frontend status

### Completed

- `/universities` has been refactored into reusable components.
- The universities list page now reads classifications from the database.
- The universities list page now reads rankings from the database.
- `/universities` is grouped by classification with accordion sections.
- `/universities/[slug]` reads ranking data from the database.
- `/universities/[slug]` reads classification tags from the database.
- The detail page still uses static mock content for overview, admissions, scholarships, and student-life sections.
- The navbar has been expanded into a multi-section product nav.
- Placeholder pages exist for:
  - `/rankings`
  - `/locations`
  - `/majors`
  - `/scholarships`
  - `/guides`
  - `/blog`
  - `/search`

### Current frontend files of interest

- `app/universities/page.tsx`
- `app/universities/[slug]/page.tsx`
- `components/university/*`
- `components/navbar/index.tsx`
- `lib/university-rankings.ts`
- `lib/university-preview-data.ts`

## Current database status

### Main tables already in use

- `universities`
- `classifications`
- `university_classifications`
- `university_rankings`

### Current known classification scope

- `C9`
- `985`
- `211`
- `DOUBLE_FIRST_CLASS`

For the current seed state, the 9 seeded universities belong to all four of the above classifications.

## Data management workflow

### Use migrations for

- Schema changes
- Constraints
- Indexes
- One-time data changes that must run in every environment

Location:

- `chinese-universities-db/supabase/migrations`

### Use seeds for

- Baseline data for reset / rebuild
- Core reference data
- Local environment reconstruction

Location:

- `chinese-universities-db/supabase/seeds`

### Use imports for

- Ongoing business data updates
- New universities
- New rankings
- New classification relationships
- Future scholarships, majors, admissions, and program data

Location:

- `chinese-universities-db/supabase/imports`

Important:

- `imports` are manual and are not executed automatically.
- If an import later becomes part of the long-term baseline, sync it back into seeds.

## Important implementation notes

### Rankings

- Real ranking data comes from `public.university_rankings`.
- The frontend maps ranking rows through `lib/university-rankings.ts`.
- The universities list page currently picks a primary ranking per university.
- The detail page displays multiple ranking rows for a university.

### Classifications

- The frontend should prefer database classifications over static tags.
- Static preview `tags` still exist in `lib/university-preview-data.ts`, but they should not be treated as source of truth.

### Detail page content

The following areas are still mock / static:

- tuition range
- overview copy
- admissions tabs
- scholarship cards
- student-life cards

These were intentionally mocked to validate layout and interaction before building the next data model.

## Recommended next steps

### High priority

1. Build a real filtering layer on `/universities`
2. Add ranking-based browsing and filtering
3. Add province / city browsing and filtering
4. Replace more detail-page static content with real database fields

### Medium priority

1. Create a program / admissions data model
2. Add scholarship-related data structures
3. Turn `/search` into a real cross-entity search entrypoint
4. Flesh out `/blog` and `/guides` content strategy

### Lower priority

1. Add compare functionality
2. Add saved lists or shortlist behavior
3. Add richer SEO pages and editorial content around city and major exploration

## Suggested admissions / programs schema direction

A likely next table set:

- `programs`
- `program_languages`
- `program_admissions_requirements`

Likely fields to plan for:

- `university_id`
- `degree_level`
- `program_name`
- `language`
- `tuition_min`
- `tuition_max`
- `duration`
- `intake`
- `deadline`
- `ielts_min`
- `toefl_min`
- `hsk_min`
- `gpa_requirement`
- `required_documents`
- `scholarship_notes`
- `source_url`
- `updated_at`

## Known environment constraint

In the current Codex environment, local `node` execution is restricted, so lint/typecheck may need to be run manually by the user when verification is required.

Typical commands:

```powershell
cd C:\Users\florent\codes\chinese-universities\chinese-universities-web
npm run lint
npx tsc --noEmit
```

## Update rule

Whenever a major project decision changes, update this file before or alongside the implementation when practical.
