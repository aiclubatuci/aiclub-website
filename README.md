# AI at UCI Club Site

Website for AI at UCI uses Next.js, React, TypeScript, and Tailwind.

## Getting started

```bash
npm install
npm run dev
```

The newsletter form also needs these environment variables in `.env.local`:

- `MAIL_CHIMP_API_KEY`
- `MAIL_CHIMP_SERVER_PREFIX`
- `MAIL_CHIMP_AUDIENCE_ID`

## File structure

```text
src/app/                  routes (page.tsx per page, plus layout)
src/components/home/      landing page
src/components/about/     mission, pillars, board
src/components/events/    upcoming and previous events
src/components/projects/  project cards and lists
src/components/contact/   newsletter form
src/components/layout/    header, footer, social icons
src/data/                 content JSON edited most often
src/types/                shared TypeScript types for that content
public/img/               images referenced by the JSON
```

Each page in `src/app` composes the components in the matching `src/components` folder. `Header`, `Footer`, and `SocialLinks` live under `layout` because more than one page uses them.

## Updating content

Most club updates are JSON edits. Image paths start with `/img/...` and the file itself goes in `public/img/...`.

| Change                         | Edit                                             |
| ------------------------------ | ------------------------------------------------ |
| Add or edit an event           | `src/data/events.json`                           |
| Update the board               | `src/data/team.json` and `public/img/team/`      |
| Add or edit a project          | `src/data/projects.json`                         |
| Change social links            | `src/data/socials.json`                          |
| Change the landing photo stack | `src/data/photos.json` and `public/img/landing/` |

**Events.** Set `status` to `"upcoming"` or `"previous"`. Upcoming events appear in the selector; previous events appear in the grid. Optional `flyerSrc` shows a flyer image.

**Team.** The file is a list of committees. Order in the file is the order on the About page. Each member needs `img`, `name`, `role`, and `linkedin`. Add `objectPosition` (for example `"50% 0%"`) when a headshot is cropped too low or too high.

**Projects.** `status` controls where a project shows up:

- `"open"` with a `link` shows an Apply button and stays under Ongoing
- `"closed"` stays under Ongoing and shows "Apps closed"
- `"completed"` moves the card to Previous

**Socials.** Each entry needs `href`, `icon`, and `alt`. Icons are SVGs in `public/img/global/`.

If you add or rename a field, update the matching type in `src/types` as well. Components import those types from `@/types`.

Page copy, layout, and sections live in `src/components/<page>`. The route file in `src/app/<page>/page.tsx` is where the page title and description for search results are set.
