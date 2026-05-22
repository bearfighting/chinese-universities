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
- First-phase detail-page admissions schema has been added to the database.
- Drizzle schema and relations now include:
  - `source_documents`
  - `university_profiles`
  - `university_admission_tracks`
  - `university_admission_events`
  - `university_admission_documents`
  - `university_scholarships`
- Peking University 2026 undergraduate admissions import has been prepared with:
  - official source URLs
  - exam-free route data
  - entrance-exam route data
  - application events
  - required documents
  - scholarship records
- `/universities/[slug]` now reads detail-page admissions/profile/scholarship data from the database when available and falls back to preview data for schools that have not yet been imported.
- The detail page scholarship and admissions section headers now switch away from mock copy when real database data exists.

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

### Detail page real-data status

- The detail page now prefers database-backed values for:
  - hero summary
  - overview
  - tuition summary / tuition range messaging
  - admissions panels
  - application deadlines
  - required documents
  - scholarship cards
- The detail page still falls back to preview data for:
  - campus highlights
  - quick facts
  - student life
  - schools without imported admissions/profile content
- Current imported real-data scope is:
  - Peking University
  - 2026 undergraduate admissions
  - Chinese-taught routes only
  - exam-free and entrance-exam paths
- City-specific editorial content is intentionally left out for now and should be modeled separately later rather than pushed into university-level profile fields.

### Detail page content still to collect

High-priority real-data gaps:

- `campusHighlights`
- `quickFacts`
- `studentLife`
- official source URLs for every imported field group beyond admissions
- master's admissions guides
- PhD admissions guides
- school-confirmed English-taught or mixed-language routes, if they exist
- concrete tuition amounts when officially published

Structured data still worth collecting for PKU and future schools:

- campus facilities and academic highlights
- international student support details
- student life / dormitory / activity information
- faculty and school counts
- undergraduate major counts
- total or international student population
- program or faculty-level admissions scope
- more granular application process steps
- segmented contact information

Potential detail-page sections to add later once source data is available:

- application steps
- cost breakdown
- scholarship comparison
- important reminders
- official source links block

Recommended next data collection order for PKU:

1. master's admissions guide
2. PhD admissions guide
3. official tuition page
4. official accommodation page
5. official university overview / international student support page
6. undergraduate faculty or major list

### Source documents

- Official source tracking is now part of the schema through `source_documents`.
- For Peking University 2026 undergraduate admissions, the official PKU ISD source URLs are:
  - exam-free: `https://www.isd.pku.edu.cn/cn/detail.php?id=793`
  - entrance-exam: `https://www.isd.pku.edu.cn/cn/detail.php?id=794`
- Admission tracks can point to a primary source document through `primary_source_document_id`.

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

Update:

- For Peking University, admissions tabs and scholarship cards are now partially database-backed.
- The list above still applies broadly across the project until more schools are imported and the remaining overview/student-life/quick-facts areas are replaced.

## Recommended next steps

### High priority

1. Build a real filtering layer on `/universities`
2. Add ranking-based browsing and filtering
3. Add province / city browsing and filtering
4. Replace more detail-page static content with real database fields
5. Start moving real undergraduate admissions content into the new admissions schema
6. Import the next university's official admissions data so the new schema is exercised beyond PKU

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

## First-phase detail-page schema

To replace the current detail-page mocks before program-level modeling is complete,
the database now needs a lighter school-detail schema that can hold real admissions
content from official guides such as PKU 2026 undergraduate admissions.

Recommended first-phase tables:

- `source_documents`
- `university_profiles`
- `university_admission_tracks`
- `university_admission_events`
- `university_admission_documents`
- `university_scholarships`

Why this phase exists:

- It lets us ship real school detail pages before building full program-level data.
- It matches the current UI better than forcing everything into `programs` too early.
- It still leaves a clean upgrade path later, where admissions tracks can point to
  programs or be partially derived from program-level tables.
- It gives every admissions fact a stable source trail back to official guides, PDFs,
  or captured local text files.

## Current implementation note

The detail page is now in a hybrid state:

- database first when imported structured data exists
- preview fallback when the school or field has not been migrated yet

This is intentional for the current phase and should continue until enough schools are migrated to remove the preview dependency entirely.

## Next focus

The detail-page data expansion work above is intentionally paused for now.

Current product focus should shift to strengthening internationalization with a
minimum English + Chinese experience:

- bilingual UI
- original-language source preservation
- English explanation layer where useful
- future schema evolution for multilingual content fields

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
