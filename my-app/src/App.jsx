import { useEffect } from "react";
import "./App.css";

export default function App() {
  useEffect(() => {
    const menuBtn = document.getElementById("menuBtn");
    const navMenu = document.getElementById("navMenu");
    const backToTop = document.getElementById("backToTop");
    const feedbackForm = document.getElementById("feedbackForm");
    const formMessage = document.getElementById("formMessage");
    const themeToggle = document.getElementById("themeToggle");

    // MOBILE MENU
    const closeMenu = () => {
      navMenu?.classList.remove("open");

      const icon = menuBtn?.querySelector("i");
      icon?.classList.remove("fa-xmark");
      icon?.classList.add("fa-bars");
    };

    const toggleMenu = () => {
      if (!menuBtn || !navMenu) return;

      navMenu.classList.toggle("open");

      const icon = menuBtn.querySelector("i");

      if (navMenu.classList.contains("open")) {
        icon?.classList.remove("fa-bars");
        icon?.classList.add("fa-xmark");
      } else {
        icon?.classList.remove("fa-xmark");
        icon?.classList.add("fa-bars");
      }
    };

    menuBtn?.addEventListener("click", toggleMenu);

    navMenu?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // ACTIVE NAVIGATION AND BACK TO TOP
    const navLinks = document.querySelectorAll(
      ".nav-menu > a:not(.nav-apply)"
    );

    const sections = document.querySelectorAll("main section[id]");

    const handleScroll = () => {
      let currentSection = "";

      sections.forEach((section) => {
        const top = section.offsetTop - 130;

        if (
          window.scrollY >= top &&
          window.scrollY < top + section.offsetHeight
        ) {
          currentSection = section.id;
        }
      });

      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${currentSection}`
        );
      });

      backToTop?.classList.toggle("show", window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const scrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    backToTop?.addEventListener("click", scrollTop);

    // FEEDBACK FORM
    const handleFeedback = (event) => {
      event.preventDefault();

      if (!feedbackForm || !formMessage) return;

      const name = document
        .getElementById("feedbackName")
        ?.value.trim();

      const email = document
        .getElementById("feedbackEmail")
        ?.value.trim();

      const type = document.getElementById("feedbackType")?.value;

      const message = document
        .getElementById("feedbackMessage")
        ?.value.trim();

      formMessage.style.display = "block";

      if (!name || !email || !type || !message) {
        formMessage.style.color = "#c14954";
        formMessage.textContent =
          "Please complete all fields before submitting.";
        return;
      }

      formMessage.style.color = "#27834b";
      formMessage.textContent =
        "Thank you! Your feedback has been received.";

      feedbackForm.reset();
    };

    feedbackForm?.addEventListener("submit", handleFeedback);

    // IMAGE ERROR HANDLING
    const handleImageError = (event) => {
      event.currentTarget.style.backgroundColor = "#e8f0f5";
      event.currentTarget.style.objectFit = "cover";
    };

    const images = document.querySelectorAll("img");

    images.forEach((img) => {
      img.addEventListener("error", handleImageError);
    });

    // LIGHT AND DARK THEME
    const applyTheme = (dark) => {
      document.body.classList.toggle("dark-theme", dark);

      const icon = themeToggle?.querySelector("i");

      icon?.classList.toggle("fa-sun", dark);
      icon?.classList.toggle("fa-moon", !dark);

      themeToggle?.setAttribute(
        "aria-label",
        dark ? "Switch to light theme" : "Switch to dark theme"
      );
    };

    const savedTheme = localStorage.getItem("theme");

    applyTheme(savedTheme === "dark");

    const toggleTheme = () => {
      const dark = !document.body.classList.contains("dark-theme");

      localStorage.setItem("theme", dark ? "dark" : "light");

      applyTheme(dark);
    };

    themeToggle?.addEventListener("click", toggleTheme);

    // CLEANUP
    return () => {
      menuBtn?.removeEventListener("click", toggleMenu);

      navMenu?.querySelectorAll("a").forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });

      window.removeEventListener("scroll", handleScroll);

      backToTop?.removeEventListener("click", scrollTop);

      feedbackForm?.removeEventListener("submit", handleFeedback);

      images.forEach((img) => {
        img.removeEventListener("error", handleImageError);
      });

      themeToggle?.removeEventListener("click", toggleTheme);
    };
  }, []);

  return (
    <>
      {/* ================= HEADER ================= */}

      <header className="navbar">
        <div className="nav-container">
          <a href="#home" className="logo">
            <img
              src="/images/logo.png"
              alt="Prime Institute Logo"
            />

            <div>
              <span>PRIME</span>
              <small>INSTITUTE OF PAKISTAN</small>
            </div>
          </a>

          <button className="menu-btn" id="menuBtn">
            <i className="fas fa-bars"></i>
          </button>

          <nav className="nav-menu" id="navMenu">
            <a href="#home" className="active">Home</a>
            <a href="#about">About</a>
            <a href="#programs">Programs</a>
            <a href="#admissions">Admissions</a>
            <a href="#resources">Resources</a>
            <a href="#gallery">Campus-life</a>
            <a href="#reviews">Google Reviews</a>
            <a href="#feedback">Feedback</a>
            <a href="#contact">Contact</a>

            {/* <button
              className="theme-toggle"
              id="themeToggle"
              type="button"
              aria-label="Switch to dark theme"
            >
              <i className="fas fa-moon" aria-hidden="true"></i>
            </button> */}

            <a href="#admissions" className="nav-apply">
              Apply Now
            </a>
          </nav>
        </div>
      </header>

      
        {/* ================= HERO SECTION ================= */}

        <section className="hero" id="home">
          <div className="hero-image"></div>
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <div className="hero-label">
              <span></span>
              LEARN • GROW • EXCEL
            </div>

            <h1>
              Shape Your Future
              <strong>With Prime.</strong>
            </h1>

            <p>
              Discover quality education, practical learning,
              experienced faculty and opportunities designed to
              prepare you for a successful future.
            </p>

            <div className="hero-buttons">
              <a href="#admissions" className="btn btn-primary">
                Apply Now
                <i className="fas fa-arrow-right"></i>
              </a>

              <a href="#about" className="btn btn-outline">
                Explore Prime
              </a>
            </div>

            <div className="hero-stats">
              <div>
                <strong>4+</strong>
                <span>Programs</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Learning Focus</span>
              </div>

              <div>
                <strong>1</strong>
                <span>Bright Future</span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}

        <section className="about section" id="about">
          <div className="section-container about-grid">
            <div className="about-image-wrap">
              <img
                src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85"
                alt="University campus"
              />

              <div className="experience-card">
                <i className="fas fa-graduation-cap"></i>

                <div>
                  <strong>Education</strong>
                  <span>That Inspires</span>
                </div>
              </div>
            </div>

            <div className="about-content">
              <span className="section-tag">WHO WE ARE</span>

              <h2>
                Building Knowledge,
                <span>Creating Opportunities.</span>
              </h2>

              <p>
                Prime Institute of Pakistan is committed to creating
                an environment where students can learn, explore
                their potential and develop the skills needed for
                the modern world.
              </p>

              <p>
                Our approach combines academic knowledge with
                practical learning, technology and student support
                to help learners move confidently toward their goals.
              </p>

              <div className="about-points">
                <div>
                  <i className="fas fa-circle-check"></i>
                  <span>Student-focused learning</span>
                </div>

                <div>
                  <i className="fas fa-circle-check"></i>
                  <span>Modern educational approach</span>
                </div>

                <div>
                  <i className="fas fa-circle-check"></i>
                  <span>Practical skills development</span>
                </div>

                <div>
                  <i className="fas fa-circle-check"></i>
                  <span>Supportive learning environment</span>
                </div>
              </div>

              <a href="#programs" className="text-link">
                Discover our programs
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>

        {/* ================= PROGRAMS SECTION ================= */}

        <section className="programs section" id="programs">
          <div className="section-container">
            <div className="section-heading">
              <div>
                <span className="section-tag">WHAT WE OFFER</span>

                <h2>
                  Explore Our
                  <span>Programs</span>
                </h2>
              </div>

              <p>
                Choose a field that matches your interests and
                build knowledge and skills for your future career.
              </p>
            </div>

            <div className="program-grid">
              {/* PROGRAM 1 */}

              <article className="program-card">
                <div className="program-image">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85"
                    alt="Computer science students"
                  />

                  <span className="program-number">01</span>
                </div>

                <div className="program-content">
                  <div className="program-icon">
                    <i className="fas fa-laptop-code"></i>
                  </div>

                  <h3>Computer Science</h3>

                  <p>
                    Learn programming, software development,
                    problem solving and modern computing concepts.
                  </p>

                  <a href="#contact">
                    Learn More
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </article>

              {/* PROGRAM 2 */}

              <article className="program-card">
                <div className="program-image">
                  <img
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85"
                    alt="Business studies"
                  />

                  <span className="program-number">02</span>
                </div>

                <div className="program-content">
                  <div className="program-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>

                  <h3>Business Studies</h3>

                  <p>
                    Explore management, entrepreneurship,
                    marketing and essential business skills.
                  </p>

                  <a href="#contact">
                    Learn More
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </article>

              {/* PROGRAM 3 */}

              <article className="program-card">
                <div className="program-image">
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85"
                    alt="Information technology"
                  />

                  <span className="program-number">03</span>
                </div>

                <div className="program-content">
                  <div className="program-icon">
                    <i className="fas fa-microchip"></i>
                  </div>

                  <h3>Information Technology</h3>

                  <p>
                    Develop practical knowledge of networks,
                    databases, systems and digital technologies.
                  </p>

                  <a href="#contact">
                    Learn More
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </article>

              {/* PROGRAM 4 */}

              <article className="program-card">
                <div className="program-image">
                  <img
                    src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=85"
                    alt="Science and research"
                  />

                  <span className="program-number">04</span>
                </div>

                <div className="program-content">
                  <div className="program-icon">
                    <i className="fas fa-flask"></i>
                  </div>

                  <h3>Science &amp; Research</h3>

                  <p>
                    Discover scientific thinking, research methods
                    and creative problem-solving approaches.
                  </p>

                  <a href="#contact">
                    Learn More
                    <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>
                {/* ================= ADMISSIONS SECTION ================= */}

        <section className="admissions section" id="admissions">
          <div className="section-container admissions-grid">
            <div className="admissions-content">
              <span className="section-tag light">
                START YOUR JOURNEY
              </span>

              <h2>
                Your Future
                <span> Begins Here.</span>
              </h2>

              <p>
                Take the first step toward your academic and
                professional goals. Explore your options and
                become part of a learning environment focused
                on growth and opportunity.
              </p>

              <div className="admission-points">
                <div>
                  <i className="fas fa-check-circle"style={{ marginRight: "8px" }}></i>
                    Explore available programs
                </div>

                <div>
                  <i className="fas fa-check-circle"style={{ marginRight: "8px" }}></i>
                    Get admission guidance
                </div>

                <div>
                  <i className="fas fa-check-circle "style={{ marginRight: "8px" }}></i>
                    Take the next step in your education
                </div>
              </div>
               <br></br>
              <a href="#contact" className="btn btn-white">
                  Get Admission Information
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>

            <div className="admissions-image">
              <img
                src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1000&q=85"
                alt="Students at an educational institution"
              />
            </div>
          </div>
        </section>

        {/* ================= RESOURCES SECTION ================= */}

        
{/* ================= RESOURCES SECTION ================= */}

<section className="resources section" id="resources">
  <div className="section-container">

    <div className="center-heading">
      <span className="section-tag">LEARN MORE</span>

      <h2>
        Explore Our <span>Resources.</span>
      </h2>

      <p>
        Everything you need to support your learning journey.
      </p>
    </div>

    <div className="resources-grid">

      <article className="resource-card">
        <div className="resource-image">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85"
            alt="Digital learning"
          />
        </div>

        <div className="resource-content">
          <span className="section-tag">01 / DIGITAL</span>
          <h3>Digital Learning</h3>
          <p>
            Explore online learning tools, digital platforms
            and technology for modern education.
          </p>
          <a href="#contact">Explore More →</a>
        </div>
      </article>

      <article className="resource-card">
        <div className="resource-image">
          <img
            src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=85"
            alt="Learning materials and books"
          />
        </div>

        <div className="resource-content">
          <span className="section-tag">02 / STUDY</span>
          <h3>Learning Materials</h3>
          <p>
            Access useful study resources, books, notes
            and educational materials.
          </p>
          <a href="#contact">Explore More →</a>
        </div>
      </article>

      <article className="resource-card">
        <div className="resource-image">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85"
            alt="Student guidance and teamwork"
          />
        </div>

        <div className="resource-content">
          <span className="section-tag">03 / SUPPORT</span>
          <h3>Student Guidance</h3>
          <p>
            Get academic support, career advice and
            guidance for your future.
          </p>
          <a href="#contact">Explore More →</a>
        </div>
      </article>

    </div>
  </div>
</section>


        {/* ================= GALLERY SECTION ================= */}

        <section className="gallery section" id="gallery">
          <div className="section-container">
            <div className="section-heading">
              <div>
                <span className="section-tag">
                  CAMPUS LIFE
                </span>

                <h2>
                  Moments At
                  <span> Prime</span>
                </h2>
              </div>

              <p>
                Explore the learning environment, student
                activities and inspiring moments of campus life.
              </p>
            </div>

            <div className="gallery-grid">
              <div className="gallery-item gallery-large">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1000&q=85"
                  alt="Educational campus building"
                />
              </div>

              <div className="gallery-item">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=85"
                  alt="Students studying together"
                />
              </div>

              <div className="gallery-item">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=85"
                  alt="Classroom learning"
                />
              </div>

              <div className="gallery-item">
                <img
                  src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=85"
                  alt="Students working together"
                />
              </div>

              <div className="gallery-item">
                <img
                  src="https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=85"
                  alt="University students"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= GOOGLE REVIEWS SECTION ================= */}

        <section className="reviews-section section" id="reviews">
          <div className="section-container">
            <div className="center-heading">
              <span className="section-tag">
                STUDENT EXPERIENCES
              </span>

              <h2>
                Hear From
                <span> Our Students</span>
              </h2>

              <p>
                Student experiences and feedback help us
                understand what matters most in education.
              </p>
            </div>

            <div className="google-review-box">
              <div className="google-review-heading">
                <div className="google-logo">
                  <span><img src="https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/3:2/w_2560%2Cc_limit/google-logo.jpg" alt="G" /></span>
                </div>

                <div>
                  <h3>Student Feedback</h3>
                  <p>Experiences shared by learners</p>
                </div>
              </div>

              <div className="google-review-grid">
                <article className="google-review-card">
                  <div className="review-top">
                    <div className="review-avatar">A</div>

                    <div>
                      <h4>Ali R.</h4>
                      <span>Student feedback</span>
                    </div>
                  </div>

                  <div className="review-stars">
                    ★★★★★
                  </div>

                  <p>
                    A positive learning experience with a
                    supportive environment and opportunities
                    to improve my skills.
                  </p>
                </article>

                <article className="google-review-card">
                  <div className="review-top">
                    <div className="review-avatar">S</div>

                    <div>
                      <h4>Sara K.</h4>
                      <span>Student feedback</span>
                    </div>
                  </div>

                  <div className="review-stars">
                    ★★★★★
                  </div>

                  <p>
                    I appreciate the focus on learning,
                    personal development and building
                    confidence for the future.
                  </p>
                </article>

                <article className="google-review-card">
                  <div className="review-top">
                    <div className="review-avatar">H</div>

                    <div>
                      <h4>Hassan M.</h4>
                      <span>Student feedback</span>
                    </div>
                  </div>

                  <div className="review-stars">
                    ★★★★★
                  </div>

                  <p>
                    An encouraging educational environment
                    that motivates students to explore
                    new ideas and improve.
                  </p>
                </article>
              </div>

              <p className="review-disclaimer">
                Take the next step towards your goals and become part of the Prime Institute community.
              </p>
            </div>
          </div>
        </section>
                {/* ================= FEEDBACK SECTION ================= */}

        <section className="feedback section" id="feedback">
          <div className="section-container feedback-grid">

            <div className="feedback-intro">
              <span className="section-tag">
                YOUR OPINION MATTERS
              </span>

              <h2>
                Help Us Make
                <span> Prime Better.</span>
              </h2>

              <p>
                Your thoughts and suggestions help us improve
                the learning experience. Share your feedback
                and let us know how we can do better.
              </p>

              <div className="feedback-points">
                <div>
                  <i className="fas fa-comments"style={{ marginRight: "8px" }}></i>
                  <span>Share your experience</span>
                </div>

                <div>
                  <i className="fas fa-lightbulb"style={{ marginRight: "10px" }}></i>
                  <span>Suggest new ideas</span>
                </div>

                <div>
                  <i className="fas fa-heart"style={{ marginRight: "8px" }}></i>
                  <span>Help us improve</span>
                </div>
              </div>
            </div>

            <div className="feedback-form-wrap">
              <form id="feedbackForm" className="feedback-form">

                <h3>Send Your Feedback</h3>

                <p>
                  We would love to hear from you.
                </p>

                <div className="form-group">
                  <label htmlFor="feedbackName">
                    Your Name
                  </label>

                  <input
                    type="text"
                    id="feedbackName"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="feedbackEmail">
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="feedbackEmail"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="feedbackType">
                    Feedback Type
                  </label>

                  <select id="feedbackType" required defaultValue="">
                    <option value="" disabled>
                      Select feedback type
                    </option>

                    <option value="Suggestion">
                      Suggestion
                    </option>

                    <option value="Complaint">
                      Complaint
                    </option>

                    <option value="Appreciation">
                      Appreciation
                    </option>

                    <option value="General">
                      General Feedback
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="feedbackMessage">
                    Your Message
                  </label>

                  <textarea
                    id="feedbackMessage"
                    rows="5"
                    placeholder="Write your feedback here..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary feedback-submit"
                >
                  Submit Feedback
                  <i className="fas fa-paper-plane"></i>
                </button>

                <div
                  id="formMessage"
                  className="form-message"
                  role="status"
                ></div>

              </form>
            </div>

          </div>
        </section>

        {/* ================= CONTACT SECTION ================= */}

       
{/* ================= PREMIUM CONTACT SECTION ================= */}

<section className="contact section" id="contact">
  <div className="section-container">

    <div className="center-heading contact-heading">
      <span className="section-tag">GET IN TOUCH</span>

      <h2>
        Let's Build Your
        <span> Future Together.</span>
      </h2>

      <p>
        Have questions about admissions, programs or student
        services? Our team is here to help you take the next step.
      </p>
    </div>

    <div className="premium-contact-grid">

      {/* LEFT CONTACT INFORMATION */}

      <div className="contact-information">

        <span className="contact-small-label">
          CONTACT INFORMATION
        </span>

        <h3>
          We'd Love to
          <span> Hear From You.</span>
        </h3>

        <p className="contact-description">
          Reach out to Prime Institute of Pakistan. Whether
          you're a prospective student or a parent, we're
          ready to answer your questions.
        </p>

        <div className="contact-info-list">

          <a
            href="https://www.google.com/maps/search/?api=1&query=Lahore%2C+Punjab%2C+Pakistan"
            target="_blank"
            rel="noreferrer"
            className="contact-info-item"
          >
            <div className="contact-info-icon">
              <i className="fas fa-location-dot"></i>
            </div>

            <div>
              <span>OUR LOCATION</span>
              <h4>Lahore, Punjab, Pakistan</h4>
              <small>View location on Google Maps</small>
            </div>

            <i className="fas fa-arrow-up-right-from-square contact-arrow"></i>
          </a>

          <a
            href="mailto:info@primeinstitute.edu.pk"
            className="contact-info-item"
          >
            <div className="contact-info-icon">
              <i className="fas fa-envelope"></i>
            </div>

            <div>
              <span>EMAIL ADDRESS</span>
              <h4>info@primeinstitute.edu.pk</h4>
              <small>Send us an email</small>
            </div>

            <i className="fas fa-arrow-up-right-from-square contact-arrow"></i>
          </a>

          <div className="contact-info-item">
            <div className="contact-info-icon">
              <i className="fas fa-clock"></i>
            </div>

            <div>
              <span>ADMISSIONS SUPPORT</span>
              <h4>We're Here to Help</h4>
              <small>Contact us for admission guidance</small>
            </div>
          </div>

        </div>

        <div className="contact-bottom-note">
          <i className="fas fa-graduation-cap"></i>
          <span>Your journey towards a brighter future starts here.</span>
        </div>

      </div>

      {/* RIGHT CONTACT FORM */}

      <div className="premium-contact-form-wrap">

        <div className="contact-form-heading">
          <span>HAVE A QUESTION?</span>
          <h3>Send Us a Message</h3>
          <p>Fill in the details below and we'll be happy to assist.</p>
        </div>

        <form
          className="premium-contact-form"
          action="mailto:info@primeinstitute.edu.pk"
          method="post"
          encType="text/plain"
        >

          <div className="contact-form-row">

            <div className="contact-field">
              <label htmlFor="contactName">Full Name</label>
              <input
                type="text"
                id="contactName"
                name="Name"
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="contact-field">
              <label htmlFor="contactEmail">Email Address</label>
              <input
                type="email"
                id="contactEmail"
                name="Email"
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>

          </div>

          <div className="contact-field">
            <label htmlFor="contactSubject">Subject</label>
            <select
              id="contactSubject"
              name="Subject"
              defaultValue=""
              required
            >
              <option value="" disabled>Select your inquiry</option>
              <option value="Admission Inquiry">Admission Inquiry</option>
              <option value="Program Information">Program Information</option>
              <option value="Fee Information">Fee Information</option>
              <option value="General Question">General Question</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="contact-field">
            <label htmlFor="contactMessage">Your Message</label>
            <textarea
              id="contactMessage"
              name="Message"
              rows="5"
              placeholder="Tell us how we can help you..."
              required
            ></textarea>
          </div>

          <button type="submit" className="contact-send-btn">
            Send Your Message
            <i className="fas fa-paper-plane"></i>
          </button>

          <p className="contact-form-note">
            <i className="fas fa-lock"></i>
            Your information is used to respond to your inquiry.
          </p>

        </form>

      </div>

    </div>
  </div>
</section>

      {/* ================= FOOTER ================= */}

      <footer className="footer">
        <div className="section-container footer-grid">

          <div className="footer-about">
            <a href="#home" className="footer-logo">
              <img
                src="/images/logo.png"
                alt="Prime Institute Logo"
              />

              <div>
                <strong>PRIME</strong>
                <span>INSTITUTE OF PAKISTAN</span>
              </div>
            </a>

            <p>
              Inspiring students through education,
              knowledge and opportunities to build
              a brighter future.
            </p>

            <div className="social-links">
              <a href="#contact" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>

              <a href="#contact" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>

              <a href="#contact" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>

              <a href="#contact" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>

            <a href="#home">Home</a>
            <a href="#about">About Us</a>
            <a href="#programs">Programs</a>
            <a href="#admissions">Admissions</a>
            <a href="#resources">Resources</a>
          </div>

          <div className="footer-links">
            <h3>Explore</h3>

            <a href="#gallery">Gallery</a>
            <a href="#reviews">Student Reviews</a>
            <a href="#feedback">Feedback</a>
            <a href="#contact">Contact Us</a>
          </div>

          <div className="footer-contact">
            <h3>Contact Information</h3>

            <p>
              <i className="fas fa-location-dot"></i>
              Lahore, Punjab, Pakistan
            </p>

            <p>
              <i className="fas fa-envelope"></i>
              info@primeinstitute.edu.pk
            </p>

            <p>
              <i className="fas fa-phone"></i>
              0300-1234567
            </p>
          </div>

        </div>

        <div className="footer-bottom">
          <div className="section-container">
            <p>
              © {new Date().getFullYear()} Prime Institute of Pakistan.
              All Rights Reserved.
            </p>

            <a href="#home">
              Back to Top
              <i className="fas fa-arrow-up"style={{ marginLeft: "6px" }}></i>
            </a>
          </div>
        </div>
      </footer>

      {/* ================= BACK TO TOP BUTTON ================= */}

     <button
  className="back-to-top"
  id="backToTop"
  aria-label="Back to top"
  type="button"
>
  <i className="fas fa-arrow-up"></i>
</button>

</>
);
}