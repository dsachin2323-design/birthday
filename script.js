/* =========================================================
   DREAMY GARDEN BIRTHDAY WEBSITE
   Edit ONLY the CONFIG section below first.
   ========================================================= */

const CONFIG = {
  // Use a date in your local timezone: YYYY-MM-DDTHH:mm:ss
  birthdayDate: "2026-08-29T00:00:00",

  // This is a CLIENT-SIDE entrance gate, not true server security.
  secret: "love",

  // Change these names/texts to make it yours.
  name: "My Love",
  heroIntro: "You make ordinary days feel like something worth remembering.",
  storyText: "Replace this with the story of how you met, your first conversation, your first date, or the moment you knew she was special.",
  letterText: "Write your real birthday message here. Keep it honest, personal and a little silly if that is how the two of you talk.",
  finalText: "I hope this little garden reminds you that you are loved, celebrated, and deeply appreciated.",
  hint: "Think of the word only we would know…"
};

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];

document.addEventListener("DOMContentLoaded", () => {
  $("#heroName").textContent = CONFIG.name;
  $("#footerName").textContent = CONFIG.name;
  $("#surpriseName").textContent = CONFIG.name;
  $("#heroIntro").textContent = CONFIG.heroIntro;
  $("#storyText").textContent = CONFIG.storyText;
  $("#letterText").textContent = CONFIG.letterText;
  $("#finalText").textContent = CONFIG.finalText;
  $("#hintText").textContent = CONFIG.hint;
  $("#gateYear").textContent = new Date().getFullYear();

  startCountdown();
  setupGate();
  setupMusic();
  setupLetter();
  setupMemories();
  setupSurprise();
  setupTilt();
  setupParticles();
  setupCursorGlow();
  setupScrollReveal();
});

function getTargetDate() {
  return new Date(CONFIG.birthdayDate).getTime();
}

function format(n) {
  return String(Math.max(0, n)).padStart(2, "0");
}

function getRemaining() {
  const diff = getTargetDate() - Date.now();
  if (diff <= 0) return {days:0,hours:0,minutes:0,seconds:0,done:true};
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return {days,hours,minutes,seconds,done:false};
}

function paintCountdown() {
  const t = getRemaining();
  const values = [t.days,t.hours,t.minutes,t.seconds].map(format);
  const gate = $("#gateCountdown");
  if (gate) {
    const strongs = gate.querySelectorAll("strong");
    strongs.forEach((el,i) => el.textContent = values[i]);
  }
  const big = $("#bigCountdown");
  if (big) {
    const strongs = big.querySelectorAll("strong");
    strongs.forEach((el,i) => el.textContent = values[i]);
  }
}
function startCountdown() {
  paintCountdown();
  setInterval(paintCountdown,1000);
}

function setupGate() {
  $("#secretForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = $("#secret");
    const entered = input.value.trim().toLowerCase();
    if (entered === CONFIG.secret.toLowerCase()) {
      openWorld();
    } else {
      $("#gateHint").innerHTML = "Not quite… <span>try the little secret again ♡</span>";
      input.classList.remove("shake");
      void input.offsetWidth;
      input.classList.add("shake");
    }
  });
}
function openWorld() {
  $("#gate").animate(
    [{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(1.04)"}],
    {duration:900,easing:"ease-in-out"}
  );
  setTimeout(() => {
    $("#gate").classList.add("hidden");
    $("#world").classList.remove("hidden");
    document.body.classList.add("world-open");
    window.scrollTo(0,0);
    playMusic();
    burstPetals(34);
  }, 800);
}

function setupMusic() {
  const audio = $("#bgMusic");
  $("#musicToggle").addEventListener("click", () => {
    if (audio.paused) playMusic(); else {
      audio.pause();
      $("#musicToggle").textContent = "♫";
    }
  });
}
function playMusic() {
  const audio = $("#bgMusic");
  audio.play().then(() => $("#musicToggle").textContent = "❚❚").catch(() => {});
}

function setupLetter() {
  $("#openLetter").addEventListener("click", () => {
    const env = $("#envelope");
    env.classList.toggle("open");
    if (env.classList.contains("open")) burstPetals(16);
  });
}

function setupMemories() {
  const lightbox = $("#lightbox");
  const photo = $("#lightboxPhoto");
  const caption = $("#lightboxCaption");
  $$(".memory-card").forEach(card => {
    card.addEventListener("click", () => {
      const path = card.dataset.photo;
      const text = card.dataset.caption;
      const img = new Image();
      img.onload = () => { photo.innerHTML = ""; photo.appendChild(img); };
      img.onerror = () => {
        photo.innerHTML = `<div class="photo-placeholder"><span>ADD YOUR PHOTO</span><small>${path}</small></div>`;
      };
      img.src = path;
      caption.textContent = text;
      lightbox.classList.remove("hidden");
    });
  });
  $("#closeLightbox").addEventListener("click",()=>lightbox.classList.add("hidden"));
  lightbox.addEventListener("click",(e)=>{if(e.target===lightbox)lightbox.classList.add("hidden")});
}

function setupSurprise() {
  $("#surpriseButton").addEventListener("click", () => {
    $("#surpriseOverlay").classList.remove("hidden");
    burstPetals(80);
  });
  $("#closeSurprise").addEventListener("click",()=>$("#surpriseOverlay").classList.add("hidden"));
}

function setupTilt() {
  if (window.matchMedia("(pointer:fine)").matches) {
    $$(".tilt").forEach(card => {
      card.addEventListener("mousemove",(e)=>{
        const r=card.getBoundingClientRect();
        const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        card.style.transform=`perspective(700px) rotateX(${y*-4}deg) rotateY(${x*4}deg) translateY(-5px)`;
      });
      card.addEventListener("mouseleave",()=>card.style.transform="");
    });
  }
}

function setupParticles() {
  setInterval(() => {
    if (!document.body.classList.contains("world-open")) return;
    const p=document.createElement("span");
    p.className="petal";
    p.textContent=Math.random()>.25 ? "✿" : "♡";
    p.style.left=(Math.random()*100)+"vw";
    p.style.fontSize=(8+Math.random()*13)+"px";
    p.style.color=Math.random()>.5 ? "#c98586" : "#839783";
    p.style.setProperty("--drift",(Math.random()*180-90)+"px");
    p.style.animationDuration=(8+Math.random()*9)+"s";
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),18000);
  },1400);
}
function burstPetals(count=30) {
  for(let i=0;i<count;i++){
    const p=document.createElement("span");
    p.className="petal";
    p.textContent=Math.random()>.18?"✿":"♡";
    p.style.left=(42+Math.random()*16)+"vw";
    p.style.fontSize=(10+Math.random()*18)+"px";
    p.style.color=Math.random()>.5?"#c98586":"#839783";
    p.style.setProperty("--drift",(Math.random()*500-250)+"px");
    p.style.animationDuration=(2.5+Math.random()*4)+"s";
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),8000);
  }
}

function setupCursorGlow() {
  const glow = $(".cursor-glow");
  if (!window.matchMedia("(pointer:fine)").matches) { glow.remove(); return; }
  window.addEventListener("mousemove",(e)=>{
    glow.style.left=e.clientX+"px";
    glow.style.top=e.clientY+"px";
  });
}

function setupScrollReveal() {
  const items=$$(".section-heading,.story-copy,.polaroid,.memory-card,.envelope-wrap,.countdown-copy,.big-countdown,.reason,.final-photo,.final-copy");
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.animate(
          [{opacity:0,transform:"translateY(25px)"},{opacity:1,transform:"translateY(0)"}],
          {duration:800,easing:"cubic-bezier(.2,.8,.2,1)",fill:"forwards"}
        );
        io.unobserve(entry.target);
      }
    });
  },{threshold:.12});
  items.forEach(i=>{i.style.opacity=0;io.observe(i)});
}

const style = document.createElement("style");
style.textContent = `.shake{animation:gateShake .45s ease}@keyframes gateShake{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}`;
document.head.appendChild(style);
