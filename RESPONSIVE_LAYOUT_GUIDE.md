# Video Showcase - Responsive Layout Guide

## Desktop Layout (≥768px)
The video showcase displays in a 2-column grid layout:

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ┌──────────────────┐  ┌──────────────────────────────────┐ │
│  │                  │  │ See Our Creative Work            │ │
│  │                  │  │                                  │ │
│  │    [VIDEO]       │  │ Watch how we transform ideas     │ │
│  │                  │  │ into stunning visual experiences.│ │
│  │                  │  │ Our creative team brings your    │ │
│  │                  │  │ brand story to life.             │ │
│  │                  │  │                                  │ │
│  │                  │  │ [View Portfolio] [Get Started]   │ │
│  │                  │  │                                  │ │
│  └──────────────────┘  └──────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Key Features:**
- Video on the left (50% width)
- Content on the right (50% width)
- Gap between columns: 40px
- Vertical centering of content
- Padding: 60-80px top/bottom

---

## Tablet Layout (768px - 1024px)
Same as desktop but with adjusted spacing:

```
┌──────────────────────────────────────────────────────┐
│                                                      │
│  ┌──────────────┐  ┌──────────────────────────────┐ │
│  │              │  │ See Our Creative Work        │ │
│  │   [VIDEO]    │  │                              │ │
│  │              │  │ Watch how we transform ideas │ │
│  │              │  │ into stunning visual...      │ │
│  │              │  │                              │ │
│  │              │  │ [View Portfolio] [Get Start] │ │
│  └──────────────┘  └──────────────────────────────┘ │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

## Mobile Layout (<768px)
Stacked vertical layout with centered content:

```
┌──────────────────────────┐
│                          │
│      [VIDEO]             │
│                          │
├──────────────────────────┤
│                          │
│  See Our Creative Work   │
│                          │
│  Watch how we transform  │
│  ideas into stunning     │
│  visual experiences.     │
│  Our creative team       │
│  brings your brand       │
│  story to life.          │
│                          │
│  [View Portfolio]        │
│  [Get Started]           │
│                          │
└──────────────────────────┘
```

**Key Features:**
- Full-width video on top
- Centered text content
- Full-width stacked buttons
- Padding: 30-40px top/bottom
- Gap between elements: 30px

---

## Responsive Breakpoints

| Breakpoint | Width | Layout | Button Style |
|-----------|-------|--------|--------------|
| Desktop | ≥768px | 2-column grid | Inline (flex row) |
| Tablet | 600-768px | 2-column grid | Inline (flex row) |
| Mobile | <600px | Stacked (flex col) | Full-width stacked |

---

## Typography Scaling

### Heading (h2)
- Desktop: 3.2rem (clamp: 2rem - 3.2rem)
- Tablet: 2.2rem
- Mobile: 1.5rem - 1.8rem

### Paragraph (p)
- Desktop: 1.1rem (clamp: 1rem - 1.1rem)
- Tablet: 1rem
- Mobile: 0.9rem - 0.95rem

---

## Spacing & Gaps

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Section Padding | 60-80px | 50px | 30-40px |
| Column Gap | 40px | 30px | N/A |
| Content Gap | 30px | 24px | 24px |
| Button Gap | 16px | 12px | 12px |

---

## Video Container

### Desktop & Tablet
- Aspect Ratio: Auto (maintains video ratio)
- Border Radius: 16px
- Shadow: 0 10px 40px rgba(0, 0, 0, 0.08)
- Hover Shadow: 0 20px 60px rgba(227, 30, 36, 0.15)
- Hover Transform: translateY(-4px)

### Mobile
- Full width with padding
- Same border radius and shadows
- Touch-friendly controls

---

## Button Styling

### Desktop & Tablet
- Display: Inline-flex (side by side)
- Gap: 16px
- Flex-wrap: Wrap (for smaller screens)

### Mobile
- Display: Flex column (stacked)
- Width: 100% (full-width)
- Gap: 12px
- Padding: Adjusted for touch targets

---

## Color Scheme

- Primary Color: #e31e24 (Red)
- Text Dark: #1a1a1a
- Text Body: #666
- Background: #fff (White)
- Shadow: rgba(0, 0, 0, 0.08)

---

## Accessibility Features

✅ Semantic HTML structure
✅ Proper heading hierarchy (h2)
✅ Video controls for user interaction
✅ Sufficient color contrast
✅ Touch-friendly button sizes (min 44px)
✅ Proper link semantics
✅ Responsive text sizing

---

## Performance Considerations

- Video poster image for quick preview
- CSS transitions for smooth animations
- Optimized shadow effects
- Responsive images (video adapts to container)
- No JavaScript required for basic functionality

---

## Customization Tips

1. **Change Video**: Update `src` in video tag
2. **Change Colors**: Edit CSS variables in video-showcase.css
3. **Adjust Spacing**: Modify padding/gap values in CSS
4. **Update Text**: Edit h2 and p content
5. **Change Links**: Update href attributes in buttons
6. **Modify Sizes**: Adjust font-size and clamp values

---

## Testing Checklist

- [ ] Desktop view (1920px, 1440px, 1024px)
- [ ] Tablet view (768px, 600px)
- [ ] Mobile view (480px, 375px)
- [ ] Video playback works
- [ ] Buttons are clickable
- [ ] Hover effects work on desktop
- [ ] Text is readable on all sizes
- [ ] No horizontal scrolling on mobile
- [ ] Touch targets are adequate (44px+)
- [ ] Video controls are accessible
