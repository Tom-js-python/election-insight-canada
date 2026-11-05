# Election Insight Canada - Detailed Requirements

**Last updated:** October 2026

## 1. Purpose

Elections Canada publishes detailed federal election results as open data.
However, the poll-by-poll files are not structured for convenient riding-level
analysis, comparison or filtering.

Election Insight Canada transforms this data into an interface that allows users
to explore riding results, compare party performance and identify close races.

For a broader project overview, see the [project README](../README.md).

## 2. Scope

### Included

- Navigation between the Results and About pages
- Display of 2025 general-election riding results
- Party selection and comparison
- Swing-riding filtering
- Riding search
- Sorting
- Pagination
- Loading, empty and error states

### Not currently included

- Historical elections and by-elections
- Interactive maps
- Riding-detail pages
- Polling-division displays
- Seat projections
- Election summary showing seat totals and national vote totals or shares by party
- Detailed views of individual elections

Planned capabilities are described in the
[development roadmap](roadmap.md#later-phases).

## 3. Users and Use Cases

### UC-001: Identify close races for a political party

A campaign worker, political analyst or researcher selects a party and identifies
ridings that the party narrowly won or lost according to a configurable vote or
percentage-point margin.

### UC-002: Compare party performance across ridings

A user selects a political party and sorts ridings by that party's vote share or
margin to identify where it performed most and least strongly.

### UC-003: Find a particular riding

A voter, journalist or researcher searches by riding name or district number and
reviews its election result.

### UC-004: Review national riding results

A user browses all 2025 electoral districts, including the winning party, winner's
vote share and winning margin.

### UC-005: Identify strongest party results

A user sorts results to find the ridings in which a selected party received its
highest vote share or largest margin.

## 4. Terminology and Data Definitions

| Term                    | Meaning                                                                                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Selected party          | The party chosen for comparison                                                                                                                                                            |
| Close race              | A riding within the user-selected maximum margin                                                                                                                                           |
| Vote share              | Candidate votes divided by total valid candidate votes                                                                                                                                     |
| Percentage-point margin | Difference between candidate vote shares                                                                                                                                                   |
| Swing riding            | In Election Insight Canada, a swing riding is a riding in which the selected party won or lost by no more than the user-selected vote or percentage-point margin in the selected election. |

## 5. Assumptions and Constraints

- The current release supports only the 2025 Canadian federal general election.
- The application uses Elections Canada data as its authoritative election-results source.
- Riding-level results are loaded from the backend when the Results view opens.
- Filtering, searching, sorting and pagination are performed in the frontend after
  the riding-level dataset has loaded.
- The current application is public and read-only and does not provide user accounts.
- The current release presents English-language interface content.
- The frontend requires JavaScript to be enabled.
- Detailed polling-division data is outside the current scope and shall not be loaded
  into the browser as one complete dataset.

## 6. Initial Application State

| Control or value | Initial state              |
| ---------------- | -------------------------- |
| Election         | 2025 General Election      |
| Party            | All parties                |
| Results mode     | All ridings                |
| Riding search    | Empty                      |
| Sort             | District number, ascending |
| Current page     | 1                          |

## 7. Functional Requirements

### 7.1. Application Header and Navigation Requirements

#### FR-NAV-001 - Active navigation links

The application shall provide navigation links to the Results and About pages.

**Status:** Verified - automated and manual

**Implementation:**

- [`frontend/src/components/Header/MainNav.vue`](../frontend/src/components/Header/MainNav.vue)
- [`frontend/src/router/index.ts`](../frontend/src/router/index.ts)

**Verification:**

- Test file: [`frontend/tests/unit/components/Header/MainNav.test.ts`](../frontend/tests/unit/components/Header/MainNav.test.ts)
  - Suite: `MainNav`
  - Test: `[FR-NAV-001] displays links to Results and About`
- Manual verification: Link functionality was chedked in the browser.

#### FR-NAV-002 - Disabled navigation links

There are currently disabled links to the Map, Projection Lab, and Summary.

**Status:** Verified - automated and manual

**Implementation:**

- [`frontend/src/components/Header/MainNav.vue`](../frontend/src/components/Header/MainNav.vue)

**Verification:**

- Test file: [`frontend/tests/unit/components/Header/MainNav.test.ts`](../frontend/tests/unit/components/Header/MainNav.test.ts)
  - Suite: `MainNav`
  - Test: `[FR-NAV-002] displays links to Results and About`
- Manual verification: Link presence and lack of functionality was verified in the browser.

#### FR-NAV-003 - Selecting Results shall display the Election Results view

**Status:** Verified - manual

**Implementation:**

- [`frontend/src/components/Header/MainNav.vue`](../frontend/src/components/Header/MainNav.vue)
- [`frontend/src/router/index.ts`](../frontend/src/router/index.ts)

**Verification:**

- Manual verificaton: Clicking link displays correct view was verified in the browser.

#### FR-NAV-004 - Selecting About shall display the About view

**Status:** Verified - manual

**Implementation:**

- [`frontend/src/components/Header/MainNav.vue`](../frontend/src/components/Header/MainNav.vue)
- [`frontend/src/router/index.ts`](../frontend/src/router/index.ts)

**Verification:**

- Manual verificaton: Clicking link displays correct view was verified in the browser.

#### FR-NAV-005 - The page loaded when the application starts is the Election Results view

**Status:** Verified - manual

**Implementation:**

- [`frontend/src/components/Header/MainNav.vue`](../frontend/src/components/Header/MainNav.vue)
- [`frontend/src/router/index.ts`](../frontend/src/router/index.ts)

**Verification:**

- Manual verificaton: Clicking link displays correct view was verified in the browser.

### 7.2. Election Results Page Header Requirements

#### FR-RES-001 - The interface shall display the 2025 General Election

**Status:** Verified - manual

**Implementation:**

- [`frontend/src/components/ElectionResults/PageHeading.vue`](../frontend/src/components/ElectionResults/PageHeading.vue)

**Verification:**

- Manual verification: The 2025 General Election is displayed in drop-down menu and in data

#### FR-RES-002 - Election selection shall remain disabled while only one election is supported

**Status:** Not implemented

**Implementation:** None

**Verification:** None

#### FR-RES-003 - Helper text saying "Additional elections will be added later." will be displayed

**Status:** Not implemented

**Implementation:** None

**Verification:** None

### 7.3. Filtering and Search Requirements

#### General Behaviour

##### FR-FLT-001 - Filter change updates

Filter changes shall update the displayed results immediately without requiring an Apply button, unless an invalid value is entered.

**Status:** Not implemented

**Implementation:** None

**Verification:** None

##### FR-FLT-002 - Changing any active filter shall return pagination to page 1

**Status:** Not implemented

**Implementation:** None

**Verification:** None

##### FR-FLT-003 - The displayed results count update

The displayed result count shall update whenever filtering changes the result set.

**Status:** Not implemented

**Implementation:** None

**Verification:** None

##### FR-FLT-004 - Changing any filter retains dependent values

**Status:** Verified - manual

**Implementation:**

- [`frontend/src/components/ElectionResults/SwingRidingControls.vue`](../frontend/src/components/ElectionResults/SwingRidingControls.vue)
- [`frontend/src/stores/electionResults.ts`](../frontend/src/stores/electionResults.ts)

**Verification:**

- Manual verification: Entering data into the swing filter settings, and then disabling or hiding them, and later re-enabling them or showing them, retains the data.

Note to self: I am not sure what this requirement means - how it is different from FR-FLT-005

##### FR-FLT-005 - Sort selection will remain

The sort selections will remain when the filters are changed, if, that is, the sorted fields remain available.

**Status:** Verified - manual

**Implementation:**

- [`frontend/src/components/ElectionResults/SwingRidingControls.vue`](../frontend/src/components/ElectionResults/SwingRidingControls.vue)
- [`frontend/src/stores/electionResults.ts`](../frontend/src/stores/electionResults.ts)

**Verification:**

- Manual verification: Entering data into the swing filter settings, and then disabling or hiding them, and later re-enabling them or showing them, retains the data.

##### FR-FLT-006 - Default used if sorted fields removed

If changing the filters removes the sorted fields, then the sort shall revert to the default sort.

**Status:** Not implemented

**Implementation:** None

**Verification:** None

##### FR-FLT-007 - Filters applied

Both the filter from the text search and the filter from the swing ridings are applied.

**Status:** Not implemented

**Implementation:** None

**Verification:** None

##### FR-FLT-008 - Disabled control status

The table below determines when the results-mode and swing controls are disabled, and the effective mode of the results table showing the ridings. This requirement refers to the disabled or enabled state of the results-mode and swing controls, as shown in the table below.

| Party selection | Results-mode control             | Effective mode                    | Swing controls |
| --------------- | -------------------------------- | --------------------------------- | -------------- |
| All parties     | Disabled                         | All ridings                       | Disabled       |
| Selected party  | Enabled and set to All ridings   | All ridings with party comparison | Disabled       |
| Selected party  | Enabled and set to Swing ridings | Matching swing ridings            | Enabled        |

**Status:** Verified - manual

**Implementation:**

- [`frontend/src/components/ElectionResults/ElectionFilters/SwingRidingControls.vue`](../frontend/src/components/ElectionResults/ElectionFilters/SwingRidingControls.vue)
- [`frontend/src/components/ElectionResults/ElectionFilters/ElectionFilters.vue`](../frontend/src/components/ElectionResults/ElectionFilters/ElectionFilters.vue)
- [`frontend/src/components/ElectionResults/ElectionFilters/ResultsModeToggle.vue`](../frontend/src/components/ElectionResults/ElectionFilters/ResultsModeToggle.vue)

**Verification:**

- Manual verification: Choosing all parties disables results-mode control. The swing controls are disabled unless a party is selected and the results mode is set to Swing ridings.

#### Riding text search

##### FR-FLT-010 - Immediately filter

After removing leading and trailing whitespace, a non-empty search term shall immediately filter results by district name or district number.

##### FR-FLT-011 - The search filter starts when a single character is entered

##### FR-FLT-012 - The text search looks in both the riding name and the district number

##### FR-FLT-013 - The search starts immediately from the first non-whitespace character

##### FR-FLT-014 - District-name matching shall be case-insensitive and accent-insensitive

##### FR-FLT-015 - Search contains only whitespace

A search value containing only whitespace shall be treated as an empty search and shall not filter results.

#### Party Drop-down and selection

- **FR-FLT-020:** The default, and initial, selection for parties will be 'All parties'.
- **FR-FLT-021:** Switching the Party drop-down from All parties to a selected party switches the
  columns from Riding, Winner, Winner share, Winning vote margin, Winning margin %, to:
  Riding, Winner, Winner share, Selected Party vote share, Selected Party vote margin,
  Selected party margin %.
- **FR-FLT-022:** The selected-party heading should use its short name,
  i.e. Conservative, Liberal, NDP
- **FR-FLT-023:** Selecting All parties shall disable swing-riding mode and return the results mode
  to All ridings.
- **FR-FLT-024:** Selecting a party does not remove or add ridings. It simply adds the party comparison data.
- **FR-FLT-025:** Selecting a party shall display that party’s riding-level result.
- **FR-FLT-026:** Selecting a party enables the results-mode toggle, but does not automatically
  enable the swing settings.
- **FR-FLT-027:** Changing from one party to another preserves the swing settings.

#### Results-mode toggle

- **FR-FLT-030:** A results-mode radio button with the title Results and the two options
  'All ridings' and 'Swing ridings' will be present below the text search and party selection.
- **FR-FLT-031:** The default for the results mode radio button will be 'All ridings.'
- **FR-FLT-032:** When 'All ridings' is selected from the Results-mode toggle the entire swing riding
  section will be inactive.
- **FR-FLT-033:** Switching from Swing ridings to All ridings preserves the inactive
  swing settings.

#### Swing-riding controls

- **FR-FLT-040:** A bordered section with the title 'Find swing ridings' will include the controls for
  Outcome, Margin measured by, and Maximum margin.
- **FR-FLT-041:** The maximum-margin filter shall be applied only when its value
  is valid for the selected margin measure.
- **FR-FLT-042:** If the maximum-margin field is temporarily empty or invalid
  while being edited, the interface shall not apply the invalid value, but shall keep
  the previously valid value.
- **FR-FLT-043:** The maximum-margin field will be trimmed of spaces before determining
  if it is a valid value.
- **FR-FLT-044:** A valid value for the maximum-margin field when in vote mode is any integer
  greater than or equal to 1.
- **FR-FLT-045:** A valid value for the maximum-margin field when in percentage mode is any
  real number greater than 0 and less than or equal to 100.
- **FR-FLT-046:** When the margin measured by field changes the title for the Maximum margin
  field will change from 'Maximum vote margin' to 'Maximum margin %'.
- **FR-FLT-047:** The defaults for the swing riding controls will be Outcome: Won or lost,
  Margin measured by: Percentage points, Maximum margin %: 10, and Maximum vote margin: 1000
- **FR-FLT-048:** Switching the margin measured by votes or percentage points will retain
  the values entered by the user in the other mode.

#### Reset button

- **FR-FLT-050:** Pressing the reset button resets all filters to their defaults.
- **FR-FLT-051:** Reset returns sorting to its default, district number ascending.
- **FR-FLT-052:** Reset returns pagination to page 1.

### 7.4. Table Headings, Table Display, and Sorting Requirements

- **FR-SRT-001:** The table headings in all parties mode are:

| Riding                        | Winner                                                      |
| ----------------------------- | ----------------------------------------------------------- |
| Riding name / District number | Party / Vote share / Vote margin / Margin percentage points |

- **FR-SRT-002:** The table headings when there is a party selected are:

| Riding                        | Winner             | Selected party                                      |
| ----------------------------- | ------------------ | --------------------------------------------------- |
| Riding name / District number | Party / Vote share | Vote share / Vote margin / Margin percentage points |

- **FR-SRT-003:** There is a top heading above Vote share, Vote margin, and Margin % in 'All parties'
  mode that says 'Winner'. There is a top heading above the extra Vote share column, Vote margin,
  and Margin % in selected party mode that has the short display name of the party.
- **FR-SRT-004:** When sorting by a selected-party value, ridings in
  which the party had no candidate shall appear after ridings containing
  values, regardless of sort direction.
- **FR-SRT-005:** The first column has text which has the riding name on the first line,
  and the district number beneath it on the second line. It has, however, two headings.
  The first is the Riding Name, and the second is District Number.
- **FR-SRT-006:** The default sort of all columns is ascending, so A to Z, or lower numbers to
  higher numbers.
- **FR-SRT-007:** Only one column can be sorted at a time. All other columns are unsorted,
  showing the two arrows.
- **FR-SRT-008:** Clicking on an unsorted column header first sorts on that column in
  an ascending order, placing the up arrow at the top, and switches all other columns to be
  unsorted.
- **FR-SRT-009:** Clicking on a column header where the column is sorted in ascending manner
  switches that column to be sorted in descending order, with a down arrow in the column header.
- **FR-SRT-010:** Clicking on a column header where the column is sorted in descending manner
  switches that column to be sorted in an ascending order, with an up arrow in the column header.
- **FR-SRT-011:** The 'View' riding column will not be present until the 'View' riding screen
  is implemented.
- **FR-SRT-012:** If the selected party did not field a candidate in a riding,
  the selected-party area shall display `No candidate`.
- **FR-SRT-013:** `No candidate` shall span the selected party's vote-share,
  vote-margin and percentage-point-margin columns.

### 7.5. Pagination Requirements

- **FR-PAG-001:** The application shall paginate the filtered and sorted riding results.
- **FR-PAG-002:** Pagination shall operate after search, swing filtering and sorting
  have been applied.
- **FR-PAG-003:** The initial page shall be page 1.
- **FR-PAG-004:** Changing a filter, search value or sort selection shall return
  pagination to page 1.
- **FR-PAG-005:** The interface shall display the currently visible result range
  and total number of filtered results.
- **FR-PAG-006:** Previous-page navigation shall be unavailable on the first page.
- **FR-PAG-007:** Next-page navigation shall be unavailable on the final page.
- **FR-PAG-008:** The number of results displayed per page shall be determined
  through responsive usability testing before release.

### 7.6. Loading, Empty and Error States

#### Loading

- **FR-STA-001:** While initial election data is loading, the Results view shall
  display a visible loading message, "Loading election results..."
- **FR-STA-002:** Controls that depend on election or political-party data shall
  remain disabled until the required data has loaded.
- **FR-STA-003:** The application shall not display an empty-results message while
  the initial request is still in progress.

#### Empty results

- **FR-STA-010:** When active filters produce no results, the table area shall
  display an explanatory empty-state message.
- **FR-STA-011:** The empty-state message shall distinguish between search-only,
  swing-filter-only, and combined filtering.
- **FR-STA-012:** The interface shall continue to display the active filters and
  Reset control when no results are found
- **FR-STA-013:** If no ridings are found with the text box, but there are ridings found with
  the swing riding filters, it would display "No ridings match your search term."
- **FR-STA-014:** If there are no ridings found which match the swing riding filters but there are ridings
  found that match the search term, it would display, "No ridings match the swing-riding criteria."
- **FR-STA-015:** If there are no ridings found with both filters together, but there are separately, it
  would display, "No ridings match both your search term and swing-riding criteria."
- **FR-STA-016:** If there are no ridings which match either, it would display, "No ridings match either your
  search term or the swing-riding criteria."

#### Error

- **FR-STA-020:** When election data cannot be loaded, the Results view shall
  display a user-readable error message.
- **FR-STA-021:** A loading failure shall not be presented as an empty result set.
- **FR-STA-022:** The error state shall provide a Retry control.
- **FR-STA-023:** Retrying shall clear the previous visible error and initiate a
  new request.
- **FR-STA-024:** Cancellation caused by leaving or unmounting the Results view
  shall not display an error.

### 7.7. About Page Requirements

- **FR-ABT-001:** Until About-page content is implemented, the application shall
  display a placeholder identifying the page as under development.

### 7.8 Election Summary Requirements

The election-summary feature is planned but not included in the current release.
It will eventually summarize national seat totals and popular-vote results by
political party. Detailed requirements will be added before implementation.

## 8. Non-functional Requirements

### 8.1. Accessibility Requirements

- **NFR-ACC-001:** Every form control shall have an accessible label.
- **NFR-ACC-002:** Disabled controls shall remain understandable from their visible labels and
  supporting text.
- **NFR-ACC-003:** Sortable columns shall expose their current sorting state.
- **NFR-ACC-004:** Loading and result-count changes shall be announced appropriately.
- **NFR-ACC-005:** All interactions shall be keyboard accessible.

### 8.2. Performance Requirements

- **NFR-PER-001:** The frontend shall request riding-level election data once when
  the Results view is initially loaded, rather than making a backend request for
  every filter, sort or page change.
- **NFR-PER-002:** After election data has loaded, searching, filtering, sorting
  and pagination shall be performed in the browser without additional API calls.
- **NFR-PER-003:** User-interface controls shall provide immediate visual feedback
  when their values change.
- **NFR-PER-004:** While a network request is in progress, the application shall
  display a loading state rather than appearing unresponsive.
- **NFR-PER-005:** Polling-division datasets shall not be transferred to the
  browser as a complete unpaginated dataset.
- **NFR-PER-006:** Before deployment, API response time and frontend rendering
  performance shall be measured using the production-like environment and
  documented baseline data.

### 8.3. Security and Privacy Requirements

- **NFR-SEC-001:** The application shall not require users to create accounts or
  provide personal information to explore election results.
- **NFR-SEC-002:** The application shall not expose database credentials, environment
  variables or other secrets in frontend code, API responses or the repository.
- **NFR-SEC-003:** The FastAPI application shall connect to PostgreSQL using a
  dedicated, non-superuser database role with only the permissions required by
  the application.
- **NFR-SEC-004:** All values supplied to database queries shall be passed as
  parameters rather than concatenated into SQL text.
- **NFR-SEC-005:** CORS shall permit only explicitly configured frontend origins.
- **NFR-SEC-006:** Production traffic shall use HTTPS.
- **NFR-SEC-007:** API query parameters shall be validated before they are used.
- **NFR-SEC-008:** The public interface shall not display developer contact details
  that are intended to remain private.
- **NFR-SEC-009:** If a contact form is introduced, its collected data, retention
  behaviour, abuse protection and privacy notice shall be specified before release.

## 9. Acceptance Scenarios

### 9.1. Party selection

**Given** the table is displaying all parties  
**When** the user selects the Conservative Party  
**Then** Conservative vote-share data shall appear for each applicable riding  
**And** the table shall continue to include all ridings.

**Given** a political party is selected
**And** close-race filtering is enabled
**When** the user changes the margin measure from percentage points to votes
**Then** the vote-margin input shall become active
**And** the percentage-point input shall become inactive
**And** the results shall be recalculated using the vote-margin threshold
**And** pagination shall return to the first page

## 10. Open Questions

- **OQ-001:** The details of pagination, how many rows to show per page, will be deferred until
  the site is live and it can be viewed on multiple devices.

## 11. Decision Log

| Date       | Decision                                                                                                                                                                        | Reason                                                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-16 | Keep party selection separate from close-race filtering                                                                                                                         | Supports both national party-strength comparisons and close-race analysis                                                                                  |
| 2026-10-19 | When sorting by a selected-party numeric value, ridings in which the party had no candidate shall appear after ridings containing numeric values, regardless of sort direction. | This prevents missing candidates from unexpectedly appearing first during descending or ascending sorting.                                                 |
| 2026-10-22 | Filters apply immediately with no Apply button.                                                                                                                                 | The filtering is done on the front-end only giving high enough performance to provide immediate feed-back.                                                 |
| 2026-10-22 | Search and swing filtering compose.                                                                                                                                             | Users may well want to search for a riding within a particular set of swing-filter settings.                                                               |
| 2026-10-22 | Missing selected-party candidates display as `No candidate`.                                                                                                                    | This is understandble to the end-user.                                                                                                                     |
| 2026-10-22 | All candidates remain in a single API `results` list.                                                                                                                           | Keeping this data on the front-end ensures the application is fast and responsive.                                                                         |
| 2026-10-22 | Official Elections Canada `elected_candidate` identifies winners.                                                                                                               | There is a small possibility of a tie, in which case the official Elections Canada field `elected_candidate` is best for identifying the winner of a race. |
| 2026-10-22 | API DTO fields remain snake_case.                                                                                                                                               | This simplifies transferring data from the back-end to the front-end                                                                                       |
| 2026-10-22 | The frontend uses separate API and domain types.                                                                                                                                | The conventions for TypeScript and Python are different.                                                                                                   |
| 2026-10-22 | Riding-level filtering occurs client-side.                                                                                                                                      | There are only 343 ridings, so it is fastest to do the riding-level filtering client side.                                                                 |
| 2026-10-22 | Polling-level data will require backend querying.                                                                                                                               | There are over 400,000 rows of data, when polling-level data is included, so it is not feasible to send all this data to the frontend.                     |
| 2026-10-22 | Page size remains deferred pending responsive testing.                                                                                                                          | It will be necessary to test the pagination methods on various devices to see what works best.                                                             |
| 2026-10-22 | The inactive View is omitted until riding details exist.                                                                                                                        | This view riding will be implemented later. It would be confusing to users to have an inactive link.                                                       |

## 12. Requirements Traceability

| Requirement   | Summary                                               | Verification                                                               | Status   |
| ------------- | ----------------------------------------------------- | -------------------------------------------------------------------------- | -------- |
| FR-FILTER-001 | Party defaults to All parties                         | `ElectionFilters.test.ts` — displays default filter state                  | Verified |
| FR-FILTER-002 | Results mode is disabled without a selected party     | `ResultsModeToggle.test.ts` — disables mode controls and displays guidance | Verified |
| FR-FILTER-003 | Selecting All parties restores All ridings            | `electionResults.test.ts` — clears party and resets results mode           | Verified |
| FR-FILTER-004 | Swing controls require a party and Swing ridings mode | `SwingRidingControls.test.ts` — disables controls and displays guidance    | Verified |
| FR-FILTER-005 | Reset restores filters, sorting, and pagination       | `electionResults.test.ts` — resets results-table state                     | Verified |
