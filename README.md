# SolidLabs — React + Vite

Full website for SolidLabs 3D Printing, Bengaluru.  
Converted from `solidlabs-v5.html` into a proper multi-file React + Vite project.

---

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Project Structure

```
solidlabs/
├── index.html                    ← Entry HTML (Vite root)
├── vite.config.js                ← Vite + React plugin config
├── package.json
└── src/
    ├── main.jsx                  ← React root, BrowserRouter
    ├── App.jsx                   ← Routes + global layout
    │
    ├── components/
    │   ├── Nav.jsx               ← Nav + hamburger + services dropdown
    │   ├── Cursor.jsx            ← Custom cursor (hidden on touch)
    │   ├── Cart.jsx              ← Cart overlay + addToCart()
    │   ├── Imagenie.jsx          ← AI chatbot (FAQ + human handoff)
    │   └── Shared.jsx            ← Ticker, Footer, SectionHeader, Eyebrow
    │
    ├── hooks/
    │   └── useReveal.js          ← IntersectionObserver scroll reveals
    │
    ├── pages/
    │   ├── Home.jsx              ← Full homepage (complete)
    │   ├── InjectionMoulding.jsx ← Full page (complete)
    │   ├── NewServices.jsx       ← VacuumForming + SLAPrinting + CarbonFibre
    │   │
    │   │   — Below: stub pages to be ported from solidlabs-v5.html —
    │   ├── Originals.jsx
    │   ├── Precision.jsx
    │   ├── Extreme.jsx
    │   ├── Learn.jsx
    │   ├── Evidence.jsx
    │   ├── Stream.jsx
    │   └── About.jsx
    │
    └── styles/
        ├── base.css              ← Imports all CSS + shared styles
        ├── nav.css               ← Navigation styles
        ├── cart.css              ← Cart overlay
        ├── imagenie.css          ← Chatbot styles
        ├── mobile.css            ← All responsive breakpoints
        └── pages/
            ├── home.css
            ├── originals.css
            ├── precision.css
            ├── extreme.css
            ├── learn.css
            ├── evidence.css
            ├── stream.css
            ├── about.css
            ├── injection.css
            ├── vacuum.css
            ├── sla.css
            └── carbon.css
```

---

## Pages & Routes

| Route                 | Component           | Status   |
|-----------------------|---------------------|----------|
| `/`                   | Home.jsx            | ✅ Full  |
| `/originals`          | Originals.jsx       | 🔄 Port  |
| `/precision`          | Precision.jsx       | 🔄 Port  |
| `/extreme`            | Extreme.jsx         | 🔄 Port  |
| `/learn`              | Learn.jsx           | 🔄 Port  |
| `/evidence`           | Evidence.jsx        | 🔄 Port  |
| `/stream`             | Stream.jsx          | 🔄 Port  |
| `/about`              | About.jsx           | 🔄 Port  |
| `/injection-moulding` | InjectionMoulding   | ✅ Full  |
| `/vacuum-forming`     | VacuumForming       | ✅ Full  |
| `/sla-printing`       | SLAPrinting         | ✅ Full  |
| `/carbon-fibre`       | CarbonFibre         | ✅ Full  |

---

## Porting Stub Pages from v5

Each stub page (Originals, Precision, etc.) is ready to receive the HTML from `solidlabs-v5.html`.

**Steps:**
1. Open `solidlabs-v5.html`, find the `<div id="pg-originals">` section
2. Copy the inner HTML into the corresponding JSX page
3. Convert HTML attributes:
   - `class=` → `className=`
   - `onclick=` → `onClick={}`
   - Inline styles: `style="color:red"` → `style={{ color:'red' }}`
   - `href="#"` navigation → `<Link to="/route">` or `onClick={() => nav('/route')}`
4. Use the `useReveal()` hook at the top of each component (already included in stubs)
5. The CSS classes are already in `/styles/pages/` — no changes needed

---

## Imagenie Chatbot

Located at `src/components/Imagenie.jsx`.

**To add FAQ entries:**
```js
// In the FAQ array:
{
  keys: ['keyword1', 'keyword2'],  // words that trigger this answer
  answer: "Your response text here",
  chips: ['Follow-up chip 1', 'Follow-up chip 2'],
}
```

**Human handoff** triggers automatically when user types words like "contact", "help", "talk to person", etc.

**Update WhatsApp number** in the handoff banner:
```js
href="https://wa.me/91XXXXXXXXXX"
```

---

## Cursor Colors Per Page

Defined in `App.jsx` → `PAGE_COLORS` object:
```js
export const PAGE_COLORS = {
  home:     { solid: '#f05c1e', ring: 'rgba(240,92,30,.35)', hover: '...' },
  precision:{ solid: '#f0c020', ... },
  extreme:  { solid: '#1e7aff', ... },
  // add new pages here
}
```

---

## Adding a New Page

1. Create `src/pages/MyPage.jsx`
2. Create `src/styles/pages/mypage.css` 
3. Add `@import './pages/mypage.css'` to `base.css`
4. Add route in `App.jsx`: `<Route path="/my-page" element={<MyPage />} />`
5. Add nav link in `Nav.jsx`

---

## Build for Production

```bash
npm run build
# Output: dist/
```

Deploy `dist/` to Cloudflare Pages, Netlify, or Vercel.  
For Cloudflare Pages: set build command to `npm run build`, output dir to `dist`.
