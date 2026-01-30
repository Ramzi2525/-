

/* RyanCV Business (Front-end clone) - Vanilla JS */

const $ = (q, el=document) => el.querySelector(q);
const $$ = (q, el=document) => [...el.querySelectorAll(q)];

/* Data (replace freely) */
const data = {
  roles: ["IT Consultant", "Career Consultant", "Sales Consultant"],
  services: [
    { title: "Management Consultation", desc: "Fundamental role is to troubleshoot concerns that include company organisation and implemented strategies." },
    { title: "IT Consultation", desc: "Provide various applications of information and technology for the company, business development of the organisation." },
    { title: "Strategy Consultation", desc: "The market for strategy consulting services consists disciplines: Corporate Strategy, Economic Policy, Mergers." },
    { title: "Legal Consultation", desc: "Experts in a specific field of law, such as real estate, business, or health care. We work with top executives." },
  ],
  pricing: [
    { tag: "Popular", popular: true, price: 29, unit: "hour",
      items: ["Process management", "Outsourcing", "Procurement no include", "Supply chain management", "Risk management no include"] },
    { tag: "Premium", popular: false, price: 59, unit: "hour",
      items: ["Process management", "Outsourcing", "Procurement included", "Supply chain management", "Risk management included"] },
  ],
  clients: ["Google", "Upwork", "Freelancer", "Envato"],
  testimonials: [
    { name: "Robert Chase", role: "CEO", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { name: "Helen Floyd", role: "Art Director", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { name: "Erica Anderson", role: "Art Director", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  ],
  facts: [
    { label: "Albumes Listened", value: 80 },
    { label: "Awards Won", value: 15 },
    { label: "Cups Of Coffee", value: 1000 },
    { label: "Countries Visited", value: 10 },
  ],
  experience: [
    { time: "2013 - Present", title: "Sales Consultant", org: "Google Inc.", desc: "Simply providing the trusted advice of someone with business experience." },
    { time: "2011 - 2012", title: "Business Consultant", org: "Upwork Inc.", desc: "Employed externally whose expertise is provided on a temporary basis." },
    { time: "2009 - 2010", title: "IT Consultation", org: "Envato Inc.", desc: "Responsible for helping businesses and organizations manage their technology use." },
  ],
  education: [
    { time: "2006 - 2008", title: "New York University", org: "New York City", desc: "NYU has over 450 student clubs and organizations on campus." },
    { time: "2005 - 2006", title: "Business Course", org: "Paris", desc: "Online business courses from Harvard University." },
    { time: "2004 - 2005", title: "Sales Course", org: "London", desc: "The online Software Sales Training program for professionals." },
  ],
  skillsOverall: [
    { label: "Marketing & Sales", value: 92 },
    { label: "Strategy Consulting", value: 85 },
    { label: "IT Consulting", value: 78 },
    { label: "Management & Operations", value: 88 },
  ],
  skillsLang: [
    { label: "English", value: 95 },
    { label: "German", value: 70 },
    { label: "Italian", value: 60 },
    { label: "French", value: 65 },
  ],
  checks: [
    { label: "Data analysis", value: 90 },
    { label: "Collaboration", value: 75 },
    { label: "Adaptability", value: 85 },
    { label: "Critical thinking", value: 95 },
  ],
  knowledge: [
    "Creative thinking",
    "Problem-solving",
    "Practical thinking",
    "Teamwork",
    "Excellent decision-making",
    "Advertising services include",
    "Communication",
    "Adaptability",
  ],
  works: [
    { title: "Corporate Stationery Branding", type: "Gallery", cat: "gallery", img: "img/1.png" },
    { title: "Technology Logo Idea", type: "Gallery", cat: "gallery", img: "img/2.jpg" },
    { title: "Business Annual Report", type: "Image", cat: "image", img: "img/3.jpg", link: "#" },
    { title: "Business Card Idea", type: "Link", cat: "link", img: "img/4.jpg", link: "https://vimeo.com" },
    { title: "Tech & Data Statistic", type: "Video", cat: "video", img: "img/5.jpg", link: "https://vimeo.com" },
    { title: "Colorful Business Card Idea", type: "Video", cat: "video", img: "img/6.jpg", link: "#" },
    { title: "T-shirt Logo View", type: "Image", cat: "image", img: "img/7.jpg" },
    { title: "Daylight Entrance", type: "Content", cat: "content", img: "img/8.jpg" },
  ],
  blog: [
    { title: "By spite about do of allow", date: "April 28, 2020", cat: "Music", img:"img/13.jpg", excerpt:"Ex audire suavitate has, ei quodsi tacimates sapientem sed, pri zril ubique ut..." },
    { title: "A Song And Dance Act", date: "April 28, 2020", cat: "Design", img:"img/9.jpg", excerpt:"Te cule tation munere noluisse. Enim torquatos…" },
    { title: "Music Player Design", date: "April 28, 2020", cat: "Code", img:"img/11.png", excerpt:"Ex audire suavitate has, ei quodsi tacimates sapientem sed..." },
    { title: "Designing the perfect", date: "April 28, 2020", cat: "Design", img:"img/10.jpg", excerpt:"Pri zril ubique ut. Te cule tation munere noluisse..." },
    { title: "Creativity Is More Than", date: "April 28, 2020", cat: "Music", img:"img/14.jpg", excerpt:"Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
  ]
};

/* Rotating roles (hero badge) */
(function roleRotator(){
  const el = $("#roleWord");
  if (!el) return;
  let i = 0;
  setInterval(() => {
    i = (i + 1) % data.roles.length;
    el.animate([{opacity:1, transform:"translateY(0)"},{opacity:0, transform:"translateY(-6px)"}], {duration:180, fill:"forwards"})
      .onfinish = () => {
        el.textContent = data.roles[i];
        el.animate([{opacity:0, transform:"translateY(6px)"},{opacity:1, transform:"translateY(0)"}], {duration:180, fill:"forwards"});
      };
  }, 2300);
})();

/* Render helpers */
function renderServices(){
  const root = $("#services");
  root.innerHTML = data.services.map(s => `
    <article class="service reveal">
      <h4>${s.title}</h4>
      <p>${s.desc}</p>
    </article>
  `).join("");
}
function renderPricing(){
  const root = $("#pricing");
  root.innerHTML = data.pricing.map(p => `
    <article class="price reveal">
      <div class="price__tag ${p.popular ? "popular" : ""}">${p.tag}</div>
      <div class="price__value">$ ${p.price} <span>${p.unit}</span></div>
      <ul>${p.items.map(it=>`<li>${it}</li>`).join("")}</ul>
      <a class="btn ${p.popular ? "" : "btn--ghost"}" href="#">Order Now</a>
    </article>
  `).join("");
}
function renderClients(){
  const root = $("#clients");
  root.innerHTML = data.clients.map(c => `<a class="client reveal" href="#" aria-label="${c}">${c}</a>`).join("");
}
function renderTestimonials(){
  const track = $("#testiTrack");
  const dots = $("#testiDots");
  track.innerHTML = data.testimonials.map(t => `
    <div class="tcard">
      <p>${t.text}</p>
      <div class="tcard__who">
        <div class="tavatar">${t.name.split(" ").map(x=>x[0]).slice(0,2).join("")}</div>
        <div class="tmeta"><b>${t.name}</b><span>${t.role}</span></div>
      </div>
    </div>
  `).join("");

  dots.innerHTML = data.testimonials.map((_,idx)=>`<button class="dot ${idx===0?"is-active":""}" aria-label="Testimonial ${idx+1}" data-idx="${idx}"></button>`).join("");

  let current = 0;
  const apply = (idx) => {
    current = idx;
    track.style.transform = `translateX(-${idx * 100}%)`;
    $$(".dot", dots).forEach(d => d.classList.toggle("is-active", Number(d.dataset.idx) === idx));
  };
  // make track slideable using translate
  track.style.transition = "transform .45s ease";
  dots.addEventListener("click", (e) => {
    const btn = e.target.closest(".dot");
    if (!btn) return;
    apply(Number(btn.dataset.idx));
  });
  // auto slide
  setInterval(() => apply((current + 1) % data.testimonials.length), 5000);
}
function renderFacts(){
  const root = $("#facts");
  root.innerHTML = data.facts.map(f => `
    <div class="fact reveal">
      <div class="fact__num" data-count="${f.value}">0</div>
      <div class="fact__label">${f.label}</div>
    </div>
  `).join("");
}
function renderTimeline(rootId, items){
  const root = $(rootId);
  root.innerHTML = items.map(it => `
    <div class="titem reveal">
      <div class="titem__top">
        <div class="titem__time">${it.time}</div>
        <div class="titem__title">${it.title}</div>
      </div>
      <div class="titem__org">${it.org}</div>
      <div class="titem__desc">${it.desc}</div>
    </div>
  `).join("");
}
function renderBars(rootId, items){
  const root = $(rootId);
  root.innerHTML = items.map(it => `
    <div class="reveal">
      <div class="bar__row"><b>${it.label}</b><span>${it.value}%</span></div>
      <div class="bar"><i data-to="${it.value}"></i></div>
    </div>
  `).join("");
}
function renderChecks(){
  const root = $("#checks");
  root.innerHTML = data.checks.map(it => `
    <div class="check reveal">
      <b>${it.label}</b>
      <span>${it.value}%</span>
    </div>
  `).join("");
}
function renderKnowledge(){
  const root = $("#knowledge");
  root.innerHTML = data.knowledge.map(k => `<li class="reveal">${k}</li>`).join("");
}

/* Works + filters */
function buildFilters(rootEl, allCats, onChange){
  rootEl.innerHTML = ["All", ...allCats].map((c, i) => `
    <button class="pill ${i===0?'is-active':''}" data-cat="${c.toLowerCase()}">${c}</button>
  `).join("");

  rootEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".pill");
    if (!btn) return;
    $$(".pill", rootEl).forEach(p => p.classList.remove("is-active"));
    btn.classList.add("is-active");
    onChange(btn.dataset.cat);
  });
}
function renderWorks(cat="all"){
  const root = $("#works");
  const items = data.works.filter(w => cat === "all" ? true : w.cat === cat);
  root.innerHTML = items.map(w => `
    <a class="work reveal" href="${w.link || '#'}" target="${w.link ? '_blank' : '_self'}" rel="noreferrer">
      <div class="work__img">
        <img src="${w.img}" alt="${w.title}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22450%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%2310141b%22/><text x=%2250%25%22 y=%2250%25%22 font-size=%2222%22 text-anchor=%22middle%22 fill=%22%239aa3b2%22 dominant-baseline=%22middle%22>${encodeURIComponent(w.title)}</text></svg>';">
      </div>
      <div class="work__body">
        <div class="work__type">${w.type}</div>
        <div class="work__title">${w.title}</div>
      </div>
    </a>
  `).join("");
}

/* Blog + filters + simple load more */
let blogShown = 4;
function renderBlog(cat="all"){
  const root = $("#blogGrid");
  const items = data.blog.filter(p => cat === "all" ? true : p.cat.toLowerCase() === cat);
  const slice = items.slice(0, blogShown);

  root.innerHTML = slice.map(p => `
    <article class="post reveal" data-cat="${p.cat.toLowerCase()}">
      <div class="post__img">
        <img src="${p.img}" alt="${p.title}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22800%22 height=%22480%22><rect width=%22100%25%22 height=%22100%25%22 fill=%22%2310141b%22/><text x=%2250%25%22 y=%2250%25%22 font-size=%2222%22 text-anchor=%22middle%22 fill=%22%239aa3b2%22 dominant-baseline=%22middle%22>blog image</text></svg>';">
      </div>
      <div>
        <div class="post__meta">${p.date} • ${p.cat}</div>
        <div class="post__title">${p.title}</div>
        <div class="post__excerpt">${p.excerpt}</div>
      </div>
    </article>
  `).join("");

  // recent posts list
  const recent = $("#recentPosts");
  recent.innerHTML = data.blog.slice(0,5).map(p => `<li><a href="#blog">${p.title}</a></li>`).join("");

  // update loadmore visibility
  const btn = $("#loadMore");
  btn.style.display = (slice.length < items.length) ? "inline-flex" : "none";
}

/* Active nav on scroll */
function setupActiveNav(){
  const links = $$(".nav__link");
  const sections = links.map(a => $(a.getAttribute("href"))).filter(Boolean);

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if (!en.isIntersecting) return;
      const id = "#" + en.target.id;
      links.forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === id));
    });
  }, {root:null, threshold:0.35});

  sections.forEach(s => io.observe(s));
}

/* Reveal animations + progress + counters */
function setupReveals(){
  const els = $$(".reveal");
  els.forEach(el => el.style.opacity = 0);

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if (!en.isIntersecting) return;
      const el = en.target;
      el.style.transition = "opacity .55s ease, transform .55s ease";
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
      io.unobserve(el);

      // animate bars when they appear
      $$("i[data-to]", el).forEach(i => {
        const to = Number(i.dataset.to || 0);
        requestAnimationFrame(()=> i.style.width = `${to}%`);
      });

      // animate counters in facts
      const counter = el.querySelector?.("[data-count]");
      if (counter) animateCount(counter);
    });
  }, {threshold:0.18});

  els.forEach(el => {
    el.style.transform = "translateY(8px)";
    io.observe(el);
  });
}
function animateCount(el){
  const to = Number(el.dataset.count || 0);
  const start = 0;
  const dur = 900;
  const t0 = performance.now();

  function tick(t){
    const p = Math.min(1, (t - t0) / dur);
    // easeOutCubic
    const e = 1 - Math.pow(1 - p, 3);
    const val = Math.round(start + (to - start) * e);
    el.textContent = (to >= 1000) ? val.toLocaleString() : String(val);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* Mobile sidebar toggle */
function setupMobileMenu(){
  const btn = $("#menuBtn");
  const sidebar = $("#sidebar");
  if (!btn || !sidebar) return;

  btn.addEventListener("click", ()=>{
    sidebar.classList.toggle("is-open");
  });

  // close when clicking a nav link on mobile
  sidebar.addEventListener("click", (e)=>{
    const a = e.target.closest(".nav__link");
    if (!a) return;
    sidebar.classList.remove("is-open");
  });
}

/* Blog search */
function setupSearch(){
  const input = $("#searchInput");
  if (!input) return;

  input.addEventListener("input", ()=>{
    const q = input.value.trim().toLowerCase();
    const posts = $$(".post", $("#blogGrid"));
    posts.forEach(p => {
      const title = $(".post__title", p).textContent.toLowerCase();
      p.style.display = title.includes(q) ? "" : "none";
    });
  });
}

/* Contact form (front-end only) */
function setupForm(){
  const form = $("#contactForm");
  const note = $("#formNote");
  if (!form) return;

  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    note.textContent = "Message sent (demo). Connect it to your backend later.";
    form.reset();
    setTimeout(()=> note.textContent="", 3000);
  });
}

/* Init */
(function init(){
  $("#year").textContent = new Date().getFullYear();

  renderServices();
  renderPricing();
  renderClients();
  renderTestimonials();
  renderFacts();
  renderTimeline("#experience", data.experience);
  renderTimeline("#education", data.education);
  renderBars("#skillsOverall", data.skillsOverall);
  renderBars("#skillsLang", data.skillsLang);
  renderChecks();
  renderKnowledge();

  // filters
  const workCats = ["Video","Link","Image","Gallery","Content"];
  buildFilters($("#workFilters"), workCats, (cat)=> renderWorks(cat));
  renderWorks("all");

  const blogCats = ["Music","Design","Code"];
  buildFilters($("#blogFilters"), blogCats, (cat)=> { blogShown = 4; renderBlog(cat); setupReveals(); });
  renderBlog("all");

  $("#loadMore").addEventListener("click", ()=>{
    blogShown += 2;
    const active = $(".pill.is-active", $("#blogFilters"));
    renderBlog(active ? active.dataset.cat : "all");
    setupReveals();
  });

  setupActiveNav();
  setupMobileMenu();
  setupSearch();
  setupForm();

  // do reveals after initial render
  setupReveals();
})();

