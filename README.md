# Idea → Reality — Next.js Portfolio

## Stack
- **Next.js 15** (App Router)
- **React 19**
- **GSAP 3** + ScrollTrigger
- **TypeScript**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
  layout.tsx        # Root layout + Google Fonts
  globals.css       # All global styles
  page.tsx          # Main page — assembles all sections
components/
  CinemaIntro.tsx   # Opening curtain animation
  CustomCursor.tsx  # Custom cursor + trail
  StarsCanvas.tsx   # Animated star field background
  NavDots.tsx       # Fixed side navigation dots
  HeroSection.tsx   # Hero / headline section
  BrainSection.tsx  # Brain node canvas animation
  JourneySection.tsx# GSAP sticky scroll — 5 phases
  AboutSection.tsx  # About me + animated stats
  ProjectsSection.tsx # Project cards + modal
  SocialSection.tsx # Social links grid
  GlobeSection.tsx  # Rotating 3D globe canvas
  SkillsSection.tsx # Skills cards
  CTASection.tsx    # Call to action
lib/
  data.ts           # All projects & socials data
```

---

## 📞 Contact

Developed and architected by **Ali**  
*Full Stack Software Engineer*

- 💼 **LinkedIn:** [Ali](https://linkedin.com)
- 📧 **Email:** [alialrubay499@gmail.com](mailto:alialrubay499@gmail.com)

---

## Customisation

- Edit **`lib/data.ts`** to change projects, social links, and handles
- Edit **`components/AboutSection.tsx`** to update stats and bio text
- Edit **`components/CTASection.tsx`** to change the contact email
