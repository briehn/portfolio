(() => {
  const links = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = links
    .map((link) => {
      const id = link.getAttribute("href");
      if (!id || !id.startsWith("#")) return null;
      const section = document.querySelector(id);
      return section ? { link, section } : null;
    })
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    for (const item of sections) {
      if (item.section.id === id) item.link.classList.add("is-active");
      else item.link.classList.remove("is-active");
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) setActive(visible[0].target.id);
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: [0.2, 0.4, 0.6],
    }
  );

  for (const item of sections) observer.observe(item.section);
})();
