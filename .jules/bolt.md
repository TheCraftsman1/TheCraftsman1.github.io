# BOLT'S JOURNAL

## 2026-01-27 - [Scroll Spy Layout Thrashing]
**Learning:** The application was using a scroll event listener that called `getBoundingClientRect()` on multiple elements every frame. This causes layout thrashing and significantly impacts scrolling performance, especially on pages with complex DOM or 3D elements.
**Action:** Replaced the scroll listener with `IntersectionObserver` to offload visibility detection to the browser and eliminate main-thread layout calculation during scrolling.
