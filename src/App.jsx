import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Bell,
  Bookmark,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  GraduationCap,
  Heart,
  LogOut,
  MapPin,
  Menu,
  Plus,
  Search,
  Sparkles,
  Ticket,
  Users,
  X,
  Zap,
} from "lucide-react";

const campusImage = "/BMSpjBlockImage.webp";
const bmsLogo = "/assets/bmsce-logo.jpeg";
const eventImages = {
  1: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
  2: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=80",
  3: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
  4: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
  5: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=80",
  6: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=900&q=80",
  7: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=900&q=80",
  8: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=900&q=80",
};
const events = [
  {
    id: 1,
    title: "Robotics & Autonomous Systems Workshop",
    category: "Workshop",
    date: "Sep 27, 2026",
    day: "2026-09-27",
    time: "10:00 AM – 1:00 PM",
    venue: "Innovation Lab",
    organizer: "Robotics Club",
    tags: ["Robotics", "ROS2", "Embedded"],
    match: 95,
    tone: "green",
    description:
      "A hands-on sprint into autonomous navigation, robot perception and the tools that make machines move with purpose.",
    learn:
      "Build a ROS2 node, map a space with sensors, and tune an autonomous rover.",
    audience: "Curious builders, robotics beginners and embedded enthusiasts.",
    seats: 24,
  },
  {
    id: 2,
    title: "Campus AI Hackathon",
    category: "Hackathon",
    date: "Sep 29, 2026",
    day: "2026-09-29",
    time: "9:00 AM – 6:00 PM",
    venue: "Innovation Center",
    organizer: "Coding Club",
    tags: ["AI", "ML", "Programming"],
    match: 91,
    tone: "orange",
    description:
      "One high-energy day to turn an everyday campus problem into a working AI-powered prototype.",
    learn:
      "Shape a product idea, work with real datasets and ship a demo with a team.",
    audience:
      "Students who want to build, pitch and meet future collaborators.",
    seats: 60,
  },
  {
    id: 3,
    title: "Embedded Systems Bootcamp",
    category: "Technical",
    date: "Oct 1, 2026",
    day: "2026-10-01",
    time: "2:00 PM – 5:00 PM",
    venue: "ECE Seminar Hall",
    organizer: "ECE Association",
    tags: ["STM32", "ESP32", "IoT"],
    match: 88,
    tone: "cream",
    description:
      "Get closer to the metal. Learn how microcontrollers become connected, responsive products.",
    learn:
      "Flash your first board, read sensor data and send a device message over Wi-Fi.",
    audience: "ECE, CSE and IoT learners with basic programming experience.",
    seats: 32,
  },
  {
    id: 4,
    title: "Inter-College Tech Fest",
    category: "Fest",
    date: "Oct 4, 2026",
    day: "2026-10-04",
    time: "9:00 AM – 7:00 PM",
    venue: "Main Auditorium",
    organizer: "Student Council",
    tags: ["Technology", "Competition", "Innovation"],
    match: 84,
    tone: "orange",
    description:
      "A full-campus celebration of ideas with product battles, lightning talks, showcases and music.",
    learn:
      "Explore student innovation, find your next team and compete for the campus cup.",
    audience: "Every student who wants to discover something new.",
    seats: 240,
  },
  {
    id: 5,
    title: "Design Thinking for Social Impact",
    category: "Workshop",
    date: "Oct 7, 2026",
    day: "2026-10-07",
    time: "11:00 AM – 1:00 PM",
    venue: "Design Studio",
    organizer: "Innovation Cell",
    tags: ["Design", "Entrepreneurship", "SDG"],
    match: 82,
    tone: "green",
    description:
      "A practical workshop for turning observations into thoughtful solutions for real people.",
    learn:
      "Frame a problem, interview users and create a testable first concept.",
    audience: "Designers, founders and students who care about impact.",
    seats: 40,
  },
  {
    id: 6,
    title: "Cybersecurity Capture The Flag",
    category: "Competition",
    date: "Oct 10, 2026",
    day: "2026-10-10",
    time: "1:00 PM – 5:00 PM",
    venue: "Computer Center",
    organizer: "Cyber Society",
    tags: ["Cybersecurity", "Competition", "Programming"],
    match: 78,
    tone: "cream",
    description:
      "Solve a series of clever security puzzles and learn how defenders think like attackers.",
    learn:
      "Practice web security, cryptography and forensics in a friendly challenge.",
    audience: "Beginners welcome; bring curiosity and a laptop.",
    seats: 80,
  },
  {
    id: 7,
    title: "Open Mic Under The Banyan",
    category: "Cultural",
    date: "Oct 12, 2026",
    day: "2026-10-12",
    time: "5:00 PM – 7:00 PM",
    venue: "Central Courtyard",
    organizer: "Cultural Committee",
    tags: ["Cultural", "Music", "Community"],
    match: 76,
    tone: "orange",
    description:
      "An easy-going evening for voices, poetry, acoustic sets and new campus friendships.",
    learn:
      "Find your stage, discover a new sound and meet the people behind the campus culture.",
    audience: "Performers, listeners and anyone looking for a softer evening.",
    seats: 120,
  },
  {
    id: 8,
    title: "Sunrise 5K Campus Run",
    category: "Sports",
    date: "Oct 15, 2026",
    day: "2026-10-15",
    time: "6:30 AM – 8:00 AM",
    venue: "East Gate",
    organizer: "Sports Council",
    tags: ["Sports", "Wellness", "Community"],
    match: 74,
    tone: "green",
    description:
      "Start the day with a friendly campus run, hydration stops and a lot of cheering.",
    learn:
      "Build a small ritual, meet active students and make the campus feel like yours.",
    audience: "All paces welcome. Just bring comfortable shoes.",
    seats: 200,
  },
];
const interests = [
  "Robotics",
  "AI",
  "Embedded Systems",
  "Software",
  "VLSI",
  "IoT",
  "Cybersecurity",
  "Entrepreneurship",
  "Competitions",
  "Cultural",
  "Sports",
];
const categories = [
  "ALL",
  "TECH",
  "WORKSHOPS",
  "HACKATHONS",
  "COMPETITIONS",
  "CULTURAL",
  "SPORTS",
  "FESTS",
];

function readStore(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function App() {
  const [page, setPage] = useState("home");
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeDate, setActiveDate] = useState("ALL DATES");
  const [saved, setSaved] = useState(() => readStore("cc-saved", []));
  const [registered, setRegistered] = useState(() =>
    readStore("cc-registered", []),
  );
  const [selected, setSelected] = useState(null);
  const [registering, setRegistering] = useState(null);
  const [toast, setToast] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(() =>
    readStore("cc-logged-in", false),
  );
  const [loginOpen, setLoginOpen] = useState(false);
  const [interestOpen, setInterestOpen] = useState(false);
  const [chosenInterests, setChosenInterests] = useState(() =>
    readStore("cc-interests", ["Robotics", "AI"]),
  );
  const [hostedEvents, setHostedEvents] = useState(() =>
    readStore("cc-hosted-events", []),
  );
  const [successEvent, setSuccessEvent] = useState(null);
  const [passEvent, setPassEvent] = useState(null);
  const [qaEvent, setQaEvent] = useState(null);
  const [hostOpen, setHostOpen] = useState(false);

  useEffect(
    () => localStorage.setItem("cc-saved", JSON.stringify(saved)),
    [saved],
  );
  useEffect(
    () => localStorage.setItem("cc-registered", JSON.stringify(registered)),
    [registered],
  );
  useEffect(
    () => localStorage.setItem("cc-logged-in", JSON.stringify(loggedIn)),
    [loggedIn],
  );
  useEffect(
    () => localStorage.setItem("cc-interests", JSON.stringify(chosenInterests)),
    [chosenInterests],
  );
  useEffect(
    () =>
      localStorage.setItem("cc-hosted-events", JSON.stringify(hostedEvents)),
    [hostedEvents],
  );
  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(""), 2800);
      return () => clearTimeout(id);
    }
  }, [toast]);
  const toggleSaved = (id) => {
    setSaved((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
    setToast(saved.includes(id) ? "Removed from saved" : "Saved to My Campus");
  };
  const openRegister = (event) => {
    setSelected(null);
    setRegistering(event);
  };
  const finishRegistration = (event) => {
    setRegistered((items) => [...new Set([...items, event.id])]);
    localStorage.setItem(
      `cc-pass-${event.id}`,
      JSON.stringify({ eventId: event.id, createdAt: Date.now() }),
    );
    setRegistering(null);
    setSuccessEvent(event);
    setToast("You're in! Your place has been reserved.");
  };
  const publishEvent = (event) => {
    setHostedEvents((items) => [
      ...items,
      {
        ...event,
        id: `hosted-${Date.now()}`,
        match: 96,
        tone: "green",
        day: event.date,
      },
    ]);
    setHostOpen(false);
    setToast("Your event is now live on CampusPulse.");
  };
  const navigate = (nextPage) => {
    setPage(nextPage);
    setMobileNav(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const openDiscover = (value = "") => {
    setQuery(value);
    navigate("discover");
  };
  const logout = () => {
    setLoggedIn(false);
    setToast("Signed out");
  };
  const eventList = useMemo(() => [...events, ...hostedEvents], [hostedEvents]);
  return (
    <div className="app-shell">
      <Navbar
        page={page}
        navigate={navigate}
        savedCount={saved.length}
        notificationsOpen={notificationsOpen}
        setNotificationsOpen={setNotificationsOpen}
        mobileNav={mobileNav}
        setMobileNav={setMobileNav}
        loggedIn={loggedIn}
        setLoginOpen={setLoginOpen}
        logout={logout}
      />
      {page === "home" && (
        <Home
          eventsList={eventList}
          chosenInterests={chosenInterests}
          setInterests={setChosenInterests}
          setInterestOpen={setInterestOpen}
          openDiscover={openDiscover}
          openRegister={openRegister}
          navigateCalendar={() => navigate("calendar")}
          setSelected={setSelected}
          toggleSaved={toggleSaved}
          saved={saved}
          registered={registered}
          loggedIn={loggedIn}
          setHostOpen={setHostOpen}
        />
      )}
      {page === "discover" && (
        <Discover
          eventsList={eventList}
          query={query}
          setQuery={setQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          setSelected={setSelected}
          toggleSaved={toggleSaved}
          saved={saved}
          registered={registered}
        />
      )}
      {page === "calendar" && (
        <CalendarView eventsList={eventList} setSelected={setSelected} />
      )}
      {page === "my-events" && (
        <MyEvents
          saved={saved}
          registered={registered}
          setRegistered={setRegistered}
          setSelected={setSelected}
          toggleSaved={toggleSaved}
          saved={saved}
          setToast={setToast}
        />
      )}
      {successEvent && (
        <RegistrationSuccess
          event={successEvent}
          onClose={() => setSuccessEvent(null)}
          onPass={() => {
            setSuccessEvent(null);
            setPassEvent(successEvent);
          }}
        />
      )}
      {passEvent && (
        <EntryPass event={passEvent} onClose={() => setPassEvent(null)} />
      )}
      {qaEvent && (
        <EventAssistant event={qaEvent} onClose={() => setQaEvent(null)} />
      )}
      {hostOpen && (
        <HostEventModal
          onClose={() => setHostOpen(false)}
          onPublish={publishEvent}
        />
      )}
      <Footer navigate={navigate} setLoginOpen={setLoginOpen} />
      {selected && (
        <EventModal
          event={selected}
          saved={saved}
          registered={registered}
          onClose={() => setSelected(null)}
          toggleSaved={toggleSaved}
          openRegister={openRegister}
          onAskAI={() => setQaEvent(selected)}
        />
      )}
      {registering && (
        <RegistrationModal
          event={registering}
          onClose={() => setRegistering(null)}
          onSubmit={finishRegistration}
        />
      )}
      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onLogin={() => {
            setLoggedIn(true);
            setLoginOpen(false);
            setInterestOpen(true);
            setToast("Hi, Student!");
          }}
        />
      )}
      {interestOpen && (
        <InterestModal
          interests={chosenInterests}
          setInterests={setChosenInterests}
          onClose={() => setInterestOpen(false)}
        />
      )}
      {toast && (
        <div className="toast">
          <Check size={16} /> {toast}
        </div>
      )}
    </div>
  );
}

function Navbar({
  page,
  navigate,
  savedCount,
  notificationsOpen,
  setNotificationsOpen,
  mobileNav,
  setMobileNav,
  loggedIn,
  setLoginOpen,
  logout,
}) {
  const links = [
    ["home", "Home"],
    ["discover", "Discover"],
    ["calendar", "Calendar"],
    ["my-events", "My Events"],
  ];
  return (
    <header className="navbar">
      <div className="nav-inner">
        <button className="brand" onClick={() => navigate("home")}>
          <span className="brand-mark">
            <Building2 size={16} />
          </span>
          <span>
            CampusConnect <b>AI</b>
          </span>
        </button>
        <button
          className="mobile-menu"
          aria-label="Open navigation"
          onClick={() => setMobileNav(!mobileNav)}
        >
          <Menu />
        </button>
        <nav className={mobileNav ? "nav-links open" : "nav-links"}>
          {links.map(([id, label]) => (
            <button
              className={page === id ? "active" : ""}
              key={id}
              onClick={() => navigate(id)}
            >
              {label}
              {id === "my-events" && savedCount > 0 && (
                <span className="nav-count">{savedCount}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <div className="notification-wrap">
            <button
              className="icon-button"
              aria-label="Notifications"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell size={18} />
              <i />
            </button>
            {notificationsOpen && (
              <div className="notification-pop">
                <div className="pop-heading">
                  <b>Campus updates</b>
                  <span>3 new</span>
                </div>
                <p>
                  <Check size={15} /> Registration confirmed for Robotics
                  Workshop.
                </p>
                <p>
                  <Zap size={15} /> New AI Hackathon added.
                </p>
                <p>
                  <Zap size={15} /> Campus AI Hackathon is filling fast.
                </p>
                <p>
                  <CalendarDays size={15} /> Your saved event starts tomorrow.
                </p>
                <p>
                  <Ticket size={15} /> Your entry pass is ready.
                </p>
              </div>
            )}
          </div>
          {loggedIn ? (
            <button className="student-pill" onClick={logout}>
              <span className="avatar">AK</span>
              <span>Hi, Student</span>
              <LogOut size={14} />
            </button>
          ) : (
            <button className="login-link" onClick={() => setLoginOpen(true)}>
              Student Login <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function Home({
  chosenInterests,
  setInterests,
  setInterestOpen,
  openDiscover,
  openRegister,
  navigateCalendar,
  setSelected,
  toggleSaved,
  saved,
  registered,
  loggedIn,
  eventsList,
  setHostOpen,
}) {
  const [aiQuery, setAiQuery] = useState("");
  const [aiResults, setAiResults] = useState(null);
  const askAI = () => {
    if (aiQuery.trim())
      setAiResults(findMatches(aiQuery, eventsList, chosenInterests));
  };
  const recommended = useMemo(
    () =>
      eventsList
        .slice()
        .sort(
          (a, b) =>
            scoreEvent(b, chosenInterests) - scoreEvent(a, chosenInterests),
        )
        .slice(0, 4),
    [chosenInterests],
    [chosenInterests, eventsList],
  );
  return (
    <main>
      <div className="bmsce-identity">
        <div className="bmsce-logo-wrap">
          <img src={bmsLogo} alt="BMS College of Engineering logo" />
        </div>
        <div>
          <b>BMS COLLEGE OF ENGINEERING</b>
          <span>BENGALURU</span>
        </div>
        <strong>CAMPUSPULSE</strong>
        <small>Your Campus. Your Opportunities.</small>
      </div>
      <section className="campus-hero">
        <div className="hero-copy">
          <div className="edition-badge">
            <span /> CAMPUS EDITION 2026
          </div>
          <h1>
            YOUR CAMPUS.
            <br />
            <em>YOUR OPPORTUNITIES.</em>
          </h1>
          <p>
            Discover workshops, hackathons, competitions, fests and student
            communities — all in one place.
          </p>
          <div className="hero-actions">
            <button className="orange-button" onClick={() => openDiscover()}>
              Explore events <ArrowRight size={16} />
            </button>
            <button
              className="outline-button"
              onClick={() =>
                document
                  .getElementById("campus-ai")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              <Sparkles size={16} /> Ask Campus AI
            </button>
          </div>
          <div className="hero-note">
            <Check size={14} /> Curated for students, built around campus life
          </div>
        </div>
        <div className="campus-hero-visual">
          <div className="image-frame">
            <img
              src={campusImage}
              alt="BMS Narayan Platinum Jubilee Academic Block"
            />
            <span className="campus-live">CAMPUS LIVE</span>
            <div className="image-caption">
              BMS Narayan Platinum Jubilee Academic Block{" "}
              <small>Innovation starts here</small>
            </div>
          </div>
          <span className="shape shape-one" />
          <span className="shape shape-two" />
          <div className="float-stat stat-events">
            <strong>
              120<span>+</span>
            </strong>
            <small>Events</small>
          </div>
          <div className="float-stat stat-students">
            <strong>
              2,500<span>+</span>
            </strong>
            <small>Students</small>
          </div>
          <div className="float-stat stat-communities">
            <strong>
              35<span>+</span>
            </strong>
            <small>Communities</small>
          </div>
        </div>
      </section>
      <NextBigThing
        onRegister={() =>
          openRegister(
            eventsList.find((event) => event.category === "Hackathon") ||
              events[1],
          )
        }
      />
      <section className="ai-concierge" id="campus-ai">
        <div className="ai-heading">
          <span className="compass-badge">
            <Compass size={22} />
          </span>
          <div>
            <div className="section-kicker">CAMPUS CONCIERGE</div>
            <h2>Ask your campus.</h2>
            <p>Tell us what you want to find. We’ll connect the dots.</p>
          </div>
        </div>
        <div className="concierge-search">
          <Compass size={19} />
          <input
            value={aiQuery}
            onChange={(e) => setAiQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && askAI()}
            placeholder="Find robotics events this weekend..."
          />
          <button onClick={askAI}>
            Discover <ArrowRight size={15} />
          </button>
        </div>
        <div className="try-row">
          <span>Try asking</span>
          {[
            "Robotics events",
            "Technical events this week",
            "Upcoming hackathons",
            "Free workshops",
            "Events after 4 PM",
            "Something related to embedded systems",
          ].map((item) => (
            <button
              key={item}
              onClick={() => {
                setAiQuery(item);
                setAiResults(findMatches(item, eventsList, chosenInterests));
              }}
            >
              {item}
            </button>
          ))}
        </div>
        {aiResults && (
          <div className="concierge-result">
            <div>
              <span className="section-kicker">
                CAMPUS CONCIERGE{" "}
                <button onClick={() => setAiResults(null)} aria-label="Close">
                  <X size={14} />
                </button>
              </span>
              <h3>
                {aiResults.length
                  ? `I found ${aiResults.length} opportunities for you.`
                  : "Try a broader campus search."}
              </h3>
              <p>Matched across event topics, communities and campus spaces.</p>
            </div>
            <div className="concierge-result-list">
              {aiResults.slice(0, 3).map((event) => (
                <button key={event.id} onClick={() => setSelected(event)}>
                  <span className="result-date">
                    {event.date.split(" ")[1]?.replace(",", "")}
                    <small>{event.date.split(" ")[0]}</small>
                  </span>
                  <span>
                    <b>{event.title}</b>
                    <small>
                      {event.match}% match · {event.venue}
                    </small>
                  </span>
                  <ArrowRight size={15} />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
      <section className="home-section">
        <SectionHeading
          kicker="PICKED FOR YOU"
          title="Opportunities worth showing up for"
          copy="A living shortlist, tuned to what you care about."
          action="Explore all"
          onAction={() => openDiscover()}
        />
        <div className="poster-grid">
          {recommended.map((event) => (
            <EventPoster
              key={event.id}
              event={event}
              saved={saved}
              registered={registered}
              toggleSaved={toggleSaved}
              setSelected={setSelected}
            />
          ))}
        </div>
      </section>
      <section className="interest-strip">
        <div>
          <div className="section-kicker">PERSONALIZE YOUR CAMPUS</div>
          <h2>
            {loggedIn
              ? "Keep shaping your feed."
              : "What are you curious about?"}
          </h2>
          <p>
            Select a few interests and CampusConnect will bring the right
            opportunities closer.
          </p>
        </div>
        <div className="selected-interest-preview">
          {chosenInterests.slice(0, 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
          <button onClick={() => setInterestOpen(true)}>
            {loggedIn ? "Edit interests" : "Choose interests"}{" "}
            <ArrowRight size={14} />
          </button>
        </div>
      </section>
      <Pulse />
      <button className="host-event-button" onClick={() => setHostOpen(true)}>
        <Plus size={16} /> HOST AN EVENT
      </button>
      <CampusLife
        openDiscover={openDiscover}
        navigateCalendar={navigateCalendar}
      />
      <Impact />
    </main>
  );
}

function SectionHeading({ kicker, title, copy, action, onAction }) {
  return (
    <div className="section-heading">
      <div>
        <div className="section-kicker">{kicker}</div>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      {action && (
        <button className="text-button" onClick={onAction}>
          {action} <ArrowRight size={15} />
        </button>
      )}
    </div>
  );
}
function scoreEvent(event, selected) {
  return event.tags.reduce(
    (score, tag) =>
      score +
      (selected.some(
        (item) =>
          tag.toLowerCase().includes(item.toLowerCase()) ||
          item.toLowerCase().includes(tag.toLowerCase()),
      )
        ? 1
        : 0),
    0,
  );
}
function findMatches(query, eventList = events, selectedInterests = []) {
  const words = query
    .toLowerCase()
    .split(/\W+/)
    .filter(
      (word) =>
        word.length > 2 &&
        ![
          "find",
          "events",
          "event",
          "this",
          "weekend",
          "week",
          "upcoming",
          "free",
          "for",
        ].includes(word),
    );
  const afterFour = /after\s*4|4\s*pm/i.test(query);
  return eventList
    .map((event) => ({
      event,
      score: words.reduce(
        (score, word) =>
          score +
          ([
            event.title,
            event.category,
            event.organizer,
            event.venue,
            event.description,
            event.time,
            ...event.tags,
            ...selectedInterests,
          ]
            .join(" ")
            .toLowerCase()
            .includes(word)
            ? 1
            : 0),
        0,
      ),
    }))
    .filter(
      ({ event, score }) =>
        (words.length === 0 || score > 0) &&
        (!afterFour || startsAfterFour(event)),
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ event }) => event);
}

function startsAfterFour(event) {
  const match = event.time.match(/(\d+)(?::\d+)?\s*(AM|PM)/i);
  if (!match) return false;
  let hour = Number(match[1]);
  if (match[2].toUpperCase() === "PM" && hour !== 12) hour += 12;
  if (match[2].toUpperCase() === "AM" && hour === 12) hour = 0;
  return hour >= 16;
}

function NextBigThing({ onRegister }) {
  const target = new Date("2026-09-29T09:00:00");
  const [remaining, setRemaining] = useState(
    Math.max(0, target.getTime() - Date.now()),
  );
  useEffect(() => {
    const id = setInterval(
      () => setRemaining(Math.max(0, target.getTime() - Date.now())),
      1000,
    );
    return () => clearInterval(id);
  }, []);
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return (
    <section className="next-big-thing">
      <div>
        <div className="section-kicker">NEXT BIG THING</div>
        <h2>
          INTER-COLLEGE
          <br />
          <em>24H HACKATHON</em>
        </h2>
        <p>
          Starts September 29, 2026
          <br />
          <b>9:00 AM · Innovation Center</b>
        </p>
        <div className="hero-actions">
          <button className="orange-button" onClick={onRegister}>
            Register now <ArrowRight size={15} />
          </button>
          <button
            className="outline-button"
            onClick={() =>
              addToGoogleCalendar({
                title: "Inter-College 24H Hackathon",
                date: "Sep 29, 2026",
                description: "Build, pitch and ship with campus teams.",
                venue: "Innovation Center",
                start: "09:00 AM",
                end: "09:00 AM",
              })
            }
          >
            Add to calendar <CalendarDays size={15} />
          </button>
        </div>
      </div>
      <div className="countdown-wrap">
        {remaining ? (
          <>
            <span>STARTS IN</span>
            <strong>
              {days ? `${String(days).padStart(2, "0")} : ` : ""}
              {String(hours).padStart(2, "0")} :{" "}
              {String(minutes).padStart(2, "0")} :{" "}
              {String(seconds).padStart(2, "0")}
            </strong>
            <small>
              DAYS &nbsp;&nbsp; HOURS &nbsp;&nbsp; MINUTES &nbsp;&nbsp; SECONDS
            </small>
          </>
        ) : (
          <strong className="happening-now">● HAPPENING NOW</strong>
        )}
      </div>
    </section>
  );
}

function eventStatus(event, registered = false) {
  if (registered) return { label: "✓ REGISTERED", tone: "positive" };
  if (event.id === 2) return { label: "🔥 FILLING FAST", tone: "urgent" };
  if (event.id === 1) return { label: "⏳ 2 DAYS LEFT", tone: "urgent" };
  return { label: "🟢 OPEN", tone: "positive" };
}

function googleDate(value) {
  return value
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
}

function addToGoogleCalendar(event) {
  const startText = event.start || event.time.split("–")[0].trim();
  const endText = event.end || event.time.split("–")[1]?.trim() || startText;
  const start = new Date(`${event.date || "Sep 27, 2026"} ${startText}`);
  const end = new Date(`${event.date || "Sep 27, 2026"} ${endText}`);
  if (end <= start) end.setHours(start.getHours() + 2);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${googleDate(start)}/${googleDate(end)}`,
    details:
      event.description || "CampusPulse event at BMS College of Engineering.",
    location: event.venue,
  });
  window.open(
    `https://calendar.google.com/calendar/render?${params.toString()}`,
    "_blank",
    "noopener,noreferrer",
  );
}
function EventPoster({ event, saved, registered, toggleSaved, setSelected }) {
  const status = eventStatus(event, registered.includes(event.id));
  const image = event.image || eventImages[event.id] || campusImage;
  return (
    <article className={`event-poster ${event.tone}`}>
      <div className="poster-image"><img src={image} alt="" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = campusImage; }} /></div>
      <div className="poster-top">
        <span className="poster-date">
          <b>{event.date.split(" ")[1]?.replace(",", "")}</b>
          <small>{event.date.split(" ")[0]}</small>
        </span>
        <span className="poster-category">{event.category}</span>
        <span className={`event-status ${status.tone}`}>{status.label}</span>
        <button
          className={
            saved.includes(event.id)
              ? "poster-bookmark saved"
              : "poster-bookmark"
          }
          aria-label="Save event"
          onClick={() => toggleSaved(event.id)}
        >
          <Bookmark
            size={16}
            fill={saved.includes(event.id) ? "currentColor" : "none"}
          />
        </button>
      </div>
      <div className="poster-main">
        <span className="poster-mark">
          <Sparkles size={18} />
        </span>
        <h3>{event.title}</h3>
        <span className="poster-match">
          <Sparkles size={12} /> {event.match}% match
        </span>
      </div>
      <div className="poster-bottom">
        <span>
          <Clock3 size={13} /> {event.time.split(" ").slice(0, 2).join(" ")}
        </span>
        <span>
          <MapPin size={13} /> {event.venue}
        </span>
        <button onClick={() => setSelected(event)}>
          RSVP <ArrowRight size={14} />
        </button>
      </div>
      {registered.includes(event.id) && (
        <span className="poster-confirmed">
          <Check size={12} /> RSVP confirmed
        </span>
      )}
    </article>
  );
}

function Discover({
  eventsList,
  query,
  setQuery,
  activeCategory,
  setActiveCategory,
  activeDate,
  setActiveDate,
  setSelected,
  toggleSaved,
  saved,
  registered,
}) {
  const filtered = eventsList.filter((event) => {
    const searchable = [
      event.title,
      event.category,
      event.organizer,
      event.venue,
      ...event.tags,
    ]
      .join(" ")
      .toLowerCase();
    const categoryMatch =
      activeCategory === "ALL" ||
      (activeCategory === "TECH"
        ? event.category === "Technical"
        : activeCategory === "WORKSHOPS"
          ? event.category === "Workshop"
          : activeCategory === "HACKATHONS"
            ? event.category === "Hackathon"
            : activeCategory === "COMPETITIONS"
              ? event.category === "Competition"
              : activeCategory === "FESTS"
                ? event.category === "Fest"
                : event.category.toUpperCase() === activeCategory);
    const dateMatch =
      activeDate === "ALL DATES" ||
      (activeDate === "THIS WEEK" && event.id <= 3) ||
      (activeDate === "THIS MONTH" && event.id <= 6);
    return (
      searchable.includes(query.toLowerCase()) && categoryMatch && dateMatch
    );
  });
  return (
    <main className="page-main">
      <div className="page-title">
        <div>
          <div className="section-kicker">THE CAMPUS BOARD</div>
          <h1>Explore what's happening.</h1>
          <p>Find the next thing that makes campus feel bigger.</p>
        </div>
        <div className="event-total">
          <strong>{filtered.length}</strong>
          <span>opportunities</span>
        </div>
      </div>
      <div className="discover-toolbar">
        <div className="discover-search">
          <Search size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, clubs, communities..."
          />
        </div>
        <div className="date-filters">
          {["ALL DATES", "TODAY", "THIS WEEK", "THIS MONTH"].map((date) => (
            <button
              className={activeDate === date ? "active" : ""}
              key={date}
              onClick={() => setActiveDate(date)}
            >
              {date}
            </button>
          ))}
        </div>
      </div>
      <div className="category-row">
        {categories.map((category) => (
          <button
            className={activeCategory === category ? "active" : ""}
            key={category}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
        <button className="location-filter">
          <MapPin size={14} /> All locations <ChevronDown size={14} />
        </button>
      </div>
      <div className="poster-grid discover-posters">
        {filtered.length ? (
          filtered.map((event) => (
            <EventPoster
              key={event.id}
              event={event}
              saved={saved}
              registered={registered}
              toggleSaved={toggleSaved}
              setSelected={setSelected}
            />
          ))
        ) : (
          <div className="empty-search">
            <Search size={28} />
            <h3>No opportunities found</h3>
            <p>Try a different keyword or clear a filter.</p>
            <button
              className="orange-button"
              onClick={() => {
                setQuery("");
                setActiveCategory("ALL");
                setActiveDate("ALL DATES");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function CalendarView({ setSelected }) {
  const timeline = [
    ["MON", "09:00", "Coding Workshop", events[1]],
    ["TUE", "14:00", "AI Seminar", events[1]],
    ["WED", "10:00", "Robotics Workshop", events[0]],
    ["THU", "16:00", "Club Fair", events[6]],
    ["FRI", "09:00", "Hackathon", events[1]],
  ];
  return (
    <main className="page-main calendar-page">
      <div className="page-title">
        <div>
          <div className="section-kicker">YOUR WEEK, AT A GLANCE</div>
          <h1>Campus Calendar</h1>
          <p>A visual rhythm for the moments you do not want to miss.</p>
        </div>
        <div className="calendar-month">
          <CalendarDays size={17} /> September 2026 <ChevronDown size={14} />
        </div>
      </div>
      <div className="timeline">
        {timeline.map(([day, time, title, event]) => (
          <button
            className="timeline-row"
            key={day}
            onClick={() => setSelected(event)}
          >
            <span className="timeline-day">{day}</span>
            <span className="timeline-time">{time}</span>
            <span className="timeline-line">
              <i />
            </span>
            <span className="timeline-event">
              <b>{title}</b>
              <small>
                {event.venue} · {event.organizer}
              </small>
            </span>
            <ArrowRight size={16} />
          </button>
        ))}
      </div>
      <div className="calendar-note">
        <Sparkles size={18} />
        <span>
          <b>Good week to be curious.</b>
          <small>
            5 events are already waiting across your campus communities.
          </small>
        </span>
      </div>
    </main>
  );
}
function MyEvents({
  saved,
  registered,
  setRegistered,
  setSelected,
  toggleSaved,
  setToast,
}) {
  const registeredEvents = events.filter((event) =>
    registered.includes(event.id),
  );
  const savedEvents = events.filter(
    (event) => saved.includes(event.id) && !registered.includes(event.id),
  );
  return (
    <main className="page-main">
      <div className="page-title">
        <div>
          <div className="section-kicker">YOUR CAMPUS CALENDAR</div>
          <h1>My Campus</h1>
          <p>Keep the opportunities that matter close at hand.</p>
        </div>
        <div className="profile-summary">
          <div className="avatar large">AK</div>
          <span>
            <b>Student explorer</b>
            <small>
              {registeredEvents.length} upcoming RSVP
              {registeredEvents.length === 1 ? "" : "s"}
            </small>
          </span>
        </div>
      </div>
      <div className="my-events-layout">
        <section>
          <div className="subheading">
            <h2>Upcoming</h2>
            <span>{registeredEvents.length} events</span>
          </div>
          {registeredEvents.length ? (
            <div className="registered-list">
              {registeredEvents.map((event) => (
                <div className="registered-card" key={event.id}>
                  <div className={`date-tile ${event.tone}`}>
                    <b>{event.date.split(" ")[1]?.replace(",", "")}</b>
                    <small>{event.date.split(" ")[0]}</small>
                  </div>
                  <div>
                    <h3>{event.title}</h3>
                    <p>
                      <CalendarDays size={14} /> {event.time}{" "}
                      <MapPin size={14} /> {event.venue}
                    </p>
                    <span className="registered-label">
                      <Check size={13} /> RSVP confirmed
                    </span>
                  </div>
                  <div className="registered-actions">
                    <button
                      className="view-link"
                      onClick={() => setSelected(event)}
                    >
                      View details <ArrowRight size={15} />
                    </button>
                    <button
                      className="cancel-link"
                      onClick={() => {
                        setRegistered(
                          registered.filter((id) => id !== event.id),
                        );
                        setToast("RSVP cancelled");
                      }}
                    >
                      Cancel RSVP
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Ticket />}
              title="No RSVPs yet"
              text="Your next campus moment is waiting in Discover."
            />
          )}
        </section>
        <section>
          <div className="subheading">
            <h2>Saved</h2>
            <span>{savedEvents.length} saved</span>
          </div>
          {savedEvents.length ? (
            <div className="saved-list">
              {savedEvents.map((event) => (
                <div className="saved-row" key={event.id}>
                  <div className="saved-dot" />
                  <div>
                    <b>{event.title}</b>
                    <span>
                      {event.date} · {event.venue}
                    </span>
                  </div>
                  <button
                    aria-label="Remove saved event"
                    onClick={() => toggleSaved(event.id)}
                  >
                    <Bookmark size={17} fill="currentColor" />
                  </button>
                  <button
                    className="view-link"
                    onClick={() => setSelected(event)}
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<Bookmark />}
              title="Nothing saved yet"
              text="Bookmark events you want to remember."
            />
          )}
        </section>
      </div>
    </main>
  );
}
function Pulse() {
  const liveItems = [
    ["09:00 AM", "AI & ML Workshop", "academic"],
    ["11:30 AM", "Robotics Club Meet", "academic"],
    ["02:00 PM", "Embedded Systems Seminar", "academic"],
    ["04:30 PM", "Cultural Auditions", "social"],
    ["06:00 PM", "Badminton League", "social"],
  ];
  return (
    <section className="pulse-section">
      <div>
        <div className="section-kicker">THE CAMPUS PULSE</div>
        <h2>More happening. More together.</h2>
        <p>Sample platform stats from the CampusConnect demo.</p>
      </div>
      <div className="pulse-stats">
        <div>
          <strong>
            120<span>+</span>
          </strong>
          <small>Events</small>
        </div>
        <div>
          <strong>
            35<span>+</span>
          </strong>
          <small>Communities</small>
        </div>
        <div>
          <strong>
            2,500<span>+</span>
          </strong>
          <small>Students</small>
        </div>
        <div>
          <strong>18</strong>
          <small>Categories</small>
        </div>
      </div>
      <div className="pulse-live-timeline">
        <div className="section-kicker">LIVE AROUND CAMPUS</div>
        {liveItems.map(([time, title, tone]) => (
          <div className="pulse-live-row" key={time}>
            <span className={`pulse-marker ${tone}`} />
            <time>{time}</time>
            <b>{title}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
function CampusLife({ openDiscover, navigateCalendar }) {
  return (
    <section className="campus-life">
      <div className="life-image">
        <img
          src={campusImage}
          alt="BMS Narayan Platinum Jubilee Academic Block"
        />
        <span>Campus in motion</span>
      </div>
      <div className="life-copy">
        <div className="section-kicker">LIFE ON CAMPUS</div>
        <h2>Find your people. Find your next thing.</h2>
        <p>
          From technical workshops to cultural festivals, discover the
          opportunities happening around your campus.
        </p>
        <div className="hero-actions">
          <button className="orange-button" onClick={openDiscover}>
            Explore events <ArrowRight size={15} />
          </button>
          <button className="outline-button" onClick={navigateCalendar}>
            View calendar <CalendarDays size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
function Impact() {
  return (
    <section className="impact-section">
      <div>
        <div className="section-kicker">WHY IT MATTERS</div>
        <h2>
          More access.
          <br />
          <em>More participation.</em>
        </h2>
      </div>
      <div className="impact-copy">
        <p>
          CampusConnect helps students discover educational and extracurricular
          opportunities more easily, especially when information usually lives
          in scattered groups and posters.
        </p>
        <div className="sdg-list">
          <span>
            <GraduationCap size={16} />
            <b>SDG 4</b> Quality Education
          </span>
          <span>
            <Users size={16} />
            <b>SDG 10</b> Reduced Inequalities
          </span>
          <span>
            <Heart size={16} />
            <b>SDG 17</b> Partnerships for the Goals
          </span>
        </div>
      </div>
    </section>
  );
}
function EmptyState({ icon, title, text }) {
  return (
    <div className="empty-state">
      <span>{icon}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

function EventModal({
  event,
  saved,
  registered,
  onClose,
  toggleSaved,
  openRegister,
  onAskAI,
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="event-modal campus-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <div className={`modal-color-band ${event.tone}`}>
          <span>{event.category}</span>
          <strong>{event.match}% match</strong>
        </div>
        <div className="modal-content">
          <div className="section-kicker">CAMPUS OPPORTUNITY</div>
          <h2>{event.title}</h2>
          <p className="modal-description">{event.description}</p>
          <div className="modal-details">
            <span>
              <CalendarDays />
              {event.date}
            </span>
            <span>
              <Clock3 />
              {event.time}
            </span>
            <span>
              <MapPin />
              {event.venue}
            </span>
            <span>
              <Users />
              {event.organizer}
            </span>
          </div>
          <div className="learn-grid">
            <div>
              <b>What you'll experience</b>
              <p>{event.learn}</p>
            </div>
            <div>
              <b>Who should attend</b>
              <p>{event.audience}</p>
            </div>
            <div>
              <b>Requirements</b>
              <p>
                {event.requirements ||
                  "No prior experience required. Bring a laptop and your curiosity."}
              </p>
            </div>
            <div>
              <b>Event details</b>
              <p>
                {event.speaker || "Student-led session"} ·{" "}
                {event.department || "Student Community"} ·{" "}
                {event.fee || "Free entry"}
              </p>
            </div>
          </div>
          <div className="event-facts">
            <span>♿ Wheelchair Accessible</span>
            <span>🟢 Free Entry</span>
            <span>🤝 Networking Opportunity</span>
            <span>Seats: {event.seats || 40}</span>
          </div>
          <div className="tag-list">
            {event.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="why-match">
            <Compass size={18} />
            <div>
              <b>Why this event matches you</b>
              <p>
                You selected {event.tags.slice(0, 2).join(" and ")}, and this
                event turns that curiosity into something practical.
              </p>
            </div>
          </div>
          <div className="modal-actions">
            <button
              className="secondary-button"
              onClick={() => toggleSaved(event.id)}
            >
              <Bookmark
                size={17}
                fill={saved.includes(event.id) ? "currentColor" : "none"}
              />{" "}
              {saved.includes(event.id) ? "Saved" : "Save event"}
            </button>
            {registered.includes(event.id) ? (
              <button className="primary-button registered-button">
                <Check size={17} /> RSVP confirmed
              </button>
            ) : (
              <button
                className="orange-button"
                onClick={() => openRegister(event)}
              >
                <Ticket size={17} /> RSVP now
              </button>
            )}
            <button
              className="secondary-button"
              onClick={() => addToGoogleCalendar(event)}
            >
              <CalendarDays size={17} /> Add to Google Calendar
            </button>
            <button className="secondary-button" onClick={onAskAI}>
              <Compass size={17} /> Ask AI about this event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function RegistrationSuccess({ event, onClose, onPass }) {
  return (
    <div className="modal-backdrop">
      <div className="registration-modal success-modal">
        <div className="success-seal">
          <Check size={24} />
        </div>
        <div className="section-kicker">RSVP CONFIRMED</div>
        <h2>🎉 YOU'RE IN!</h2>
        <p>Your place has been reserved for {event.title}.</p>
        <button className="orange-button full" onClick={onPass}>
          View entry pass <Ticket size={16} />
        </button>
        <button className="modal-text-button" onClick={onClose}>
          Back to CampusPulse
        </button>
      </div>
    </div>
  );
}

function qrPattern(seed) {
  return Array.from(
    { length: 81 },
    (_, index) =>
      (index * 17 + seed.length * 11 + (index % 7)) % 5 < 2 ||
      [0, 1, 2, 6, 7, 8, 72, 73, 74, 78, 79, 80].includes(index),
  );
}

function EntryPass({ event, onClose }) {
  const pattern = qrPattern(event.title);
  return (
    <div className="modal-backdrop">
      <div className="entry-pass">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <div className="pass-brand">
          <Building2 size={16} /> CAMPUSPULSE <span>AI</span>
        </div>
        <div className="pass-school">BMS COLLEGE OF ENGINEERING</div>
        <div className="pass-rule" />
        <div className="pass-kicker">DIGITAL ENTRY PASS</div>
        <h2>{event.title}</h2>
        <div className="pass-meta">
          <span>{event.date.toUpperCase()}</span>
          <span>{event.time.split("–")[0].trim()}</span>
          <span>{event.venue.toUpperCase()}</span>
        </div>
        <div className="qr-code">
          {pattern.map((filled, index) => (
            <i className={filled ? "filled" : ""} key={index} />
          ))}
        </div>
        <div className="pass-id">
          PASS ID: CP-{String(event.id).slice(-4).toUpperCase()}-2847
        </div>
        <div className="pass-confirmed">
          <Check size={14} /> REGISTERED
        </div>
        <button className="modal-text-button" onClick={onClose}>
          Close entry pass
        </button>
      </div>
    </div>
  );
}

function EventAssistant({ event, onClose }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "Ask me anything about this campus opportunity.",
  );
  const prompts = [
    "Where is this event?",
    "Do I need a team?",
    "Is this free?",
    "Is it beginner friendly?",
    "What should I bring?",
    "What are the prerequisites?",
  ];
  const ask = (text) => {
    const q = text.toLowerCase();
    let response = q.includes("where")
      ? `It is happening at ${event.venue}.`
      : q.includes("team")
        ? event.category === "Hackathon"
          ? "Teams are welcome, and you can also join a team during the opening session."
          : "No team is required. You can register individually and meet other students there."
        : q.includes("free") || q.includes("fee")
          ? "Yes. This event has free entry for BMSCE students."
          : q.includes("beginner") || q.includes("prerequisite")
            ? event.audience
            : q.includes("bring")
              ? "Bring your student ID, a notebook and a curious mind. A laptop is useful for technical sessions."
              : `This event is led by ${event.organizer} and covers ${event.tags.join(", ")}.`;
    setQuestion(text);
    setAnswer(response);
  };
  return (
    <div className="modal-backdrop">
      <div className="qa-drawer">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <div className="qa-heading">
          <span className="compass-badge">
            <Compass size={18} />
          </span>
          <div>
            <div className="section-kicker">CAMPUS CONCIERGE</div>
            <h2>Ask about this event</h2>
            <small>{event.title}</small>
          </div>
        </div>
        <div className="qa-answer">
          <b>{question ? "Campus Concierge" : "Ready when you are"}</b>
          <p>{answer}</p>
        </div>
        <div className="qa-prompts">
          {prompts.map((prompt) => (
            <button key={prompt} onClick={() => ask(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
        <div className="qa-input">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask(question)}
            placeholder="Ask a question..."
          />
          <button onClick={() => ask(question)}>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function HostEventModal({ onClose, onPublish }) {
  const [form, setForm] = useState({
    title: "",
    category: "Workshop",
    date: "",
    time: "",
    venue: "",
    organizer: "",
    description: "",
    tags: "",
    speaker: "",
    fee: "Free",
    accessibility: "Wheelchair accessible",
  });
  const update = (key, value) => setForm({ ...form, [key]: value });
  return (
    <div className="modal-backdrop">
      <div className="registration-modal host-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <div className="login-mark">
          <Plus size={22} />
        </div>
        <div className="section-kicker">CAMPUS COMMUNITY</div>
        <h2>Host an event</h2>
        <p>Put your opportunity on the campus pulse.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (Object.values(form).every(Boolean))
              onPublish({
                ...form,
                title: form.title,
                date: new Date(form.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }),
                day: form.date,
                time: form.time,
                tags: form.tags.split(",").map((tag) => tag.trim()),
                learn:
                  "Meet people, learn something useful and leave with momentum.",
                audience: "BMSCE students curious about this opportunity.",
                seats: 40,
              });
          }}
        >
          <label>
            Event Name
            <input
              required
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="e.g. Product Design Jam"
            />
          </label>
          <div className="form-row">
            <label>
              Category
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
              >
                <option>Workshop</option>
                <option>Technical</option>
                <option>Competition</option>
                <option>Cultural</option>
                <option>Sports</option>
              </select>
            </label>
            <label>
              Date
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              Time
              <input
                required
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                placeholder="4:00 PM – 6:00 PM"
              />
            </label>
            <label>
              Venue
              <input
                required
                value={form.venue}
                onChange={(e) => update("venue", e.target.value)}
                placeholder="Campus venue"
              />
            </label>
          </div>
          <label>
            Organizer
            <input
              required
              value={form.organizer}
              onChange={(e) => update("organizer", e.target.value)}
              placeholder="Club or department"
            />
          </label>
          <label>
            Description
            <textarea
              required
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="What will students experience?"
            />
          </label>
          <div className="form-row">
            <label>
              Tags
              <input
                required
                value={form.tags}
                onChange={(e) => update("tags", e.target.value)}
                placeholder="AI, Community"
              />
            </label>
            <label>
              Speaker
              <input
                required
                value={form.speaker}
                onChange={(e) => update("speaker", e.target.value)}
                placeholder="Speaker name"
              />
            </label>
          </div>
          <button className="orange-button full" type="submit">
            Publish event <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

function RegistrationModal({ event, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    year: "",
  });
  const update = (key, value) => setForm({ ...form, [key]: value });
  return (
    <div className="modal-backdrop">
      <div className="registration-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <div className="register-icon">
          <Ticket size={22} />
        </div>
        <div className="section-kicker">SAVE YOUR SPOT</div>
        <h2>RSVP for {event.title}</h2>
        <p>Your place is one small form away.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (Object.values(form).every(Boolean)) onSubmit(event, form);
          }}
        >
          <label>
            Name
            <input
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Your full name"
            />
          </label>
          <label>
            College Email
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@campus.edu"
            />
          </label>
          <div className="form-row">
            <label>
              Department
              <input
                required
                value={form.department}
                onChange={(e) => update("department", e.target.value)}
                placeholder="e.g. CSE"
              />
            </label>
            <label>
              Year
              <select
                required
                value={form.year}
                onChange={(e) => update("year", e.target.value)}
              >
                <option value="">Select</option>
                <option>1st year</option>
                <option>2nd year</option>
                <option>3rd year</option>
                <option>4th year</option>
              </select>
            </label>
          </div>
          <button className="orange-button full" type="submit">
            Confirm RSVP <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="modal-backdrop">
      <div className="registration-modal login-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <div className="login-mark">
          <Building2 size={22} />
        </div>
        <div className="section-kicker">CAMPUSCONNECT STUDENT ACCESS</div>
        <h2>Welcome back.</h2>
        <p>Pick up where your campus story left off.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email && password) onLogin();
          }}
        >
          <label>
            College Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@campus.edu"
            />
          </label>
          <label>
            Password
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>
          <button className="orange-button full" type="submit">
            Continue <ArrowRight size={16} />
          </button>
        </form>
        <button className="college-login" onClick={onLogin}>
          Continue with College Email
        </button>
        <div className="login-links">
          <button>Forgot password?</button>
          <button>Create student account</button>
        </div>
      </div>
    </div>
  );
}
function InterestModal({ interests: selected, setInterests, onClose }) {
  const [draft, setDraft] = useState(selected);
  return (
    <div className="modal-backdrop">
      <div className="interest-modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <X />
        </button>
        <div className="section-kicker">YOUR CAMPUS, YOUR WAY</div>
        <h2>What are you interested in?</h2>
        <p>
          Choose a few signals and we’ll make your feed feel more like yours.
        </p>
        <div className="interest-options">
          {interests.map((item) => (
            <button
              className={draft.includes(item) ? "selected" : ""}
              key={item}
              onClick={() =>
                setDraft(
                  draft.includes(item)
                    ? draft.filter((value) => value !== item)
                    : [...draft, item],
                )
              }
            >
              {item}
              {draft.includes(item) ? <Check size={14} /> : <Plus size={14} />}
            </button>
          ))}
        </div>
        <button
          className="orange-button full"
          onClick={() => {
            setInterests(draft);
            onClose();
          }}
        >
          Build my feed <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
function Footer({ navigate, setLoginOpen }) {
  return (
    <footer className="campus-footer">
      <div className="footer-brand">
        <span className="brand-mark">
          <Building2 size={15} />
        </span>
        <div>
          <b>
            CampusConnect <i>AI</i>
          </b>
          <p>Your Campus. Your Opportunities.</p>
        </div>
      </div>
      <div className="footer-links">
        <button onClick={() => navigate("discover")}>Explore</button>
        <button onClick={() => navigate("calendar")}>Calendar</button>
        <button onClick={() => navigate("my-events")}>My Events</button>
        <button onClick={() => setLoginOpen(true)}>Student Login</button>
      </div>
      <span className="footer-note">Built for students, by students.</span>
    </footer>
  );
}

export default App;
