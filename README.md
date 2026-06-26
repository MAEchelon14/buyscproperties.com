# Carolina Real Estate & Investment Group — Website

A six-page marketing website for Carolina Real Estate & Investment Group, a South
Carolina firm led by Jimmy Skipper and Mary Anne Eubank. The site presents the firm
across residential and commercial markets statewide, showcases current properties,
and captures leads.

---

## Pages

| File | Page | What it contains |
|------|------|------------------|
| `index.html` | Home | Hero (Columbia skyline), intro, commercial + residential previews, approach, About preview, lead form |
| `about.html` | About Us | Firm story, full bios for Jimmy Skipper and Mary Anne Eubank, values, call to action |
| `for-sale.html` | For Sale | Homes for sale. Currently: Moncks Corner (Coming Soon) |
| `for-rent.html` | For Rent | Homes for rent: 609 Center Street, 2315 Gadsden Street, and 217 Southport (rented) |
| `commercial.html` | Commercial | 134½ State Street (for rent) and 2192 Five Chop Road (investment holding) |
| `contact.html` | Contact | Contact details, service area, and the lead-capture form |

Navigation is consistent across all pages. The "Properties" menu is a dropdown with
**For Sale**, **For Rent**, and **Commercial**.

---

## How to view

Every page is a single self-contained HTML file. All images, fonts, and styles are
embedded directly in the file (images are base64-encoded), so there are **no external
files to manage and nothing to install**.

- To preview: double-click any `.html` file to open it in a web browser.
- Start with `index.html` — the navigation links connect all six pages.

Because images are embedded, the files are large (for-rent.html is the biggest at
~18 MB since it carries the most property photos). This is normal and keeps the site
fully portable.

---

## How to publish it

The site is plain HTML and works with any standard web host. Common options:

1. **Netlify / Cloudflare Pages / GitHub Pages** — drag-and-drop or connect a folder;
   all three offer free hosting for static sites like this.
2. **Traditional web host (cPanel, etc.)** — upload all `.html` files to the public
   web folder (often `public_html`).

Whatever host is used, `index.html` must be the home page (this is the default
behavior on essentially every host).

---

## Design system

- **Colors:** warm off-white background (`#FAF7F1`), deep slate-navy text (`#1C2A3A`),
  Carolina sunset gold accent (`#B07B2C`). Navy is used only as text and accent, never
  as a full background, to keep the look warm and human rather than "AI-generated."
- **Fonts:** Newsreader (headlines, serif) and Outfit (body, sans-serif), loaded from
  Google Fonts.
- **Photography:** real South Carolina photos drive the look — Columbia skyline,
  Congaree River, and actual photos of every property.

---

## Current listings

**For Sale**
- Renovated 3 bed / 2 bath home, Moncks Corner — *Coming Soon, call for pricing*

**For Rent**
- 609 Center Street, West Columbia — $2,500/mo, available now
- 2315 Gadsden Street, Columbia (Elmwood Park) — $4,200/mo, available July 15
- 217 Southport Drive, Summerville (Weatherstone) — *currently rented*

**Commercial**
- 134½ State Street, West Columbia — $2,500/mo, ±2,875 SF office space
- 2192 Five Chop Road, Orangeburg — 5.35 acres, investment holding, *not available*

---

## How the site is built (for whoever edits it)

The HTML files are **generated** from Python builder scripts plus a shared stylesheet,
rather than hand-edited. This keeps the header, footer, and styling identical across
every page. The source files used to generate the site:

- `shared.css` — the shared design system (colors, fonts, header, footer, layout)
- `build_base.py` — shared header, footer, page wrapper, and the image map
- `build_about.py` — builds About
- `build_residential.py` — builds **both** For Sale and For Rent
- `build_commercial.py` — builds Commercial
- `build_contact.py` — builds Contact
- `home_template.html` — the Home page template

> Note: these source files are kept separately from the published site. The six
> `.html` files in this folder are the finished, ready-to-publish output. If you want
> to make structural changes, ask to have them made through the builders so all pages
> stay consistent; small text tweaks can also be made directly in the HTML.

### Adding or updating a property

To add a listing, you provide: the property photos (exterior shot first), the address,
the price or status (For Sale / For Rent / Coming Soon / Rented / Not Available), and a
short description with bed/bath/sqft. The listing is then added to the correct page with
a photo gallery, specs panel, and an inquiry button.

---

## Open items before launch

These are intentionally left as clearly marked placeholders:

1. **SC real estate license number** — Mary Anne's license number (and brokerage
   affiliation, if any) needs to replace `[License # to be added]` in her About bio and
   in the footer disclaimer on every page. This is a regulatory requirement for a
   licensed agent's website.

2. **Contact form wiring** — the lead form currently logs submissions to the browser
   console as a placeholder. Before collecting real leads, it must be connected to a
   real destination so submissions actually arrive somewhere. Common options:
   - **Formspree** or **Google Apps Script** → delivers form entries to an inbox or a
     Google Sheet
   - **Mailchimp** or **ConvertKit** → adds subscribers to an email/deal-alert list
     automatically

3. **Investor-page legal review** — if an investor-focused page with Regulation D
   language is added later, it should be reviewed by a securities attorney first. The
   current pages carry a short disclaimer in the footer.

---

## Contact

Mary Anne Eubank
buyscproperties@gmail.com · 864-381-0808 (call/text)
Serving all of South Carolina, from Columbia to Charleston, Orangeburg to Sumter.
