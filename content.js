window.portfolioContent = {
  header: {
    name: 'Akshay Hire',
    role: 'Director of Platform Engineering',
    accent: 'Cloud Architect',
    genericrole: 'Software Architect & Gen AI Platform Designer',
    nav: [
      { label: 'Home', href: '#about', active: true },
      { label: 'About', href: '#about' },
      { label: 'Resume', href: '#resume' },
      { label: 'Services', href: '#services' },
      { label: 'Contact', href: '#contact' }
    ],
    social: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/akshay-h', icon: 'fab fa-linkedin-in' },
      { platform: 'email', url: 'mailto:akshay_hire@outlook.com', icon: 'fas fa-envelope' },
      { platform: 'github', url: 'https://github.com/akshayh696', icon: 'fab fa-github' }
    ]
  },
  about: {
    title: 'Learn More About Me',
    intro: 'Strategic and hands-on technology leader with 14+ years of experience building and scaling enterprise-grade Platform Engineering and Cloud Infrastructure.',
    image: '',
    alt: 'Akshay Hire',
    details: [
      { label: 'Phone', value: '+65 9275 5920' },
      { label: 'City', value: 'Singapore (Open to EU Relocation)' },
      { label: 'Degree', value: 'Masters in Tech (Software Eng) - NUS' },
      { label: 'Email', value: 'akshay_hire@outlook.com' },
      { label: 'Freelance', value: 'Available' },
      { label: 'Certifications', value: 'AWS Pro, CKA, TOGAF' }
    ],
    summary: 'Expert in leading cross-functional teams, driving DevSecOps/MLOps transformations, and architecting multi-cloud solutions (AWS/GCP/Azure). Proven track record in establishing Internal Developer Platforms (IDP) that accelerate product delivery while maintaining rigorous security and governance standards.'
  },
  skills: [
    { name: 'Cloud Architecture (AWS, GCP, Azure)', value: 95 },
    { name: 'Platform Engineering & IDP', value: 90 },
    { name: 'Kubernetes & Container Orchestration', value: 90 },
    { name: 'API Governance & REST Design', value: 95 },
    { name: 'CI/CD & GitOps (ArgoCD, GitLab)', value: 85 },
    { name: 'Java / Python / Go / Node.js', value: 85 }
  ],
  resume: {
    summary: {
      name: 'Akshay Hire',
      text: 'Innovative and data-driven Director of Platform Engineering with 14+ years of experience designing and developing enterprise cloud architecture and distributed systems.',
      details: [
        'Singapore (Open to EU Relocation)',
        '+65 9275 5920',
        'akshay_hire@outlook.com'
      ]
    },
    education: [
      {
        title: 'Masters in Technology - Software Engineering',
        period: '2019',
        org: 'National University of Singapore (NUS)'
      },
      {
        title: 'Masters in Business Administration',
        period: '2017',
        org: 'University of Mumbai'
      },
      {
        title: 'Bachelor of Engineering',
        period: '2011',
        org: 'University of Mumbai'
      }
    ],
    experience: [
      {
        title: 'Head of Solution Engineering, APAC',
        period: '04/2025 – Present',
        company: 'Wise • Singapore',
        responsibilities: [
          'Lead a team of solutions engineers delivering complex REST API integrations for major financial institutions across APAC.',
          'Provide technical consulting on RESTful API design, OpenAPI, OAuth2, and platform scalability.'
        ]
      },
      {
        title: 'Head of Platform Engineering & Cloud Architect',
        period: '08/2022 – 03/2025',
        company: 'Terrascope • Singapore',
        responsibilities: [
          'Architected and scaled an Internal Developer Platform (IDP) on AWS, reducing environment provisioning time by 60%.',
          'Built scalable MLOps pipelines on AWS/Azure supporting AI-driven sustainability analytics.'
        ]
      },
      {
        title: 'Product Architect',
        period: '09/2021 – 08/2022',
        company: 'Lendlease Digital • Singapore',
        responsibilities: [
          'Architected the "Podium" SaaS platform on GCP integrating Big Data, AI/ML, and IoT.'
        ]
      },
      {
        title: 'Solutions Architect',
        period: '07/2019 – 09/2021',
        company: 'Bambu B2B Wealth Tech • Singapore',
        responsibilities: [
          'Designed greenfield wealth-tech platform serving 14+ financial institutions.'
        ]
      }
    ]
  },
  services: [
    {
      title: 'Cloud & Multi-Cloud Architecture',
      icon: 'fas fa-cloud',
      description: 'Designing resilient multi-cloud infrastructures across AWS, GCP, and Azure with high availability.'
    },
    {
      title: 'Internal Developer Platforms (IDP)',
      icon: 'fas fa-cogs',
      description: 'Building self-service developer portals and automated toolchains to accelerate delivery velocity.'
    },
    {
      title: 'API Strategy & Governance',
      icon: 'fas fa-network-wired',
      description: 'Defining RESTful API standards, OpenAPI specifications, and scalable microservices.'
    }
  ],
  contact: {
    location: 'Singapore (Open to EU Relocation)',
    email: 'akshay_hire@outlook.com',
    phone: 'Hidden for privacy — use Nudge Me',
    whatsappUsername: 'akshaysrc',
    social: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/akshay-h', icon: 'fab fa-linkedin-in' },
      { platform: 'github', url: 'https://github.com/metalhead44', icon: 'fab fa-github' }
    ]
  }
};

function renderHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const navLinks = window.portfolioContent.header.nav
    .map((item) => `<li><a class="nav-link ${item.active ? 'active' : ''}" href="${item.href}">${item.label}</a></li>`)
    .join('');

  const socialLinks = window.portfolioContent.header.social
    .map((item) => `<a href="${item.url}" target="_blank" class="${item.platform}"><i class="${item.icon}"></i></a>`)
    .join('');

  header.innerHTML = `
    <div class="container">
      <h1><a href="index.html">${window.portfolioContent.header.name}</a></h1>
      <h2>I'm a passionate <span>${window.portfolioContent.header.genericrole}</span></h2>

      <nav id="navbar" class="navbar">
        <ul>
          ${navLinks}
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

      <div class="social-links d-inline-flex align-items-center">
        ${socialLinks}
        <button id="theme-toggle" class="theme-toggle" type="button" aria-label="Toggle color mode"><i class="fas fa-sun"></i></button>
      </div>
    </div>
  `;
}

function renderAbout() {
  const about = document.getElementById('about-content');
  const detailsColumnOne = window.portfolioContent.about.details.slice(0, 3)
    .map((item) => `<li><i class="bi bi-chevron-right"></i> <strong>${item.label}:</strong> <span>${item.value}</span></li>`)
    .join('');
  const detailsColumnTwo = window.portfolioContent.about.details.slice(3)
    .map((item) => `<li><i class="bi bi-chevron-right"></i> <strong>${item.label}:</strong> <span>${item.value}</span></li>`)
    .join('');

  if (about) {
    about.innerHTML = `
      <div class="section-title">
        <h2>About</h2>
        <p>${window.portfolioContent.about.title}</p>
      </div>

      <div class="row align-items-center g-3 reveal-item reveal-delay-1">
        <div class="col-lg-4">
          <div class="profile-placeholder" aria-label="${window.portfolioContent.about.alt}">
            <div class="profile-badge"><i class="fas fa-code"></i></div>
          </div>
        </div>
        <div class="col-lg-8 pt-2 pt-lg-0 content reveal-item reveal-delay-2">
          <h3>Software Architect &amp; Gen AI Platform Designer</h3>
          <p class="fst-italic">
            ${window.portfolioContent.about.intro}
          </p>
          <div class="row">
            <div class="col-lg-6">
              <ul>
                ${detailsColumnOne}
              </ul>
            </div>
            <div class="col-lg-6">
              <ul>
                ${detailsColumnTwo}
              </ul>
            </div>
          </div>
          <p>
            ${window.portfolioContent.about.summary}
          </p>
        </div>
      </div>
    `;
  }

  const skillsContent = document.getElementById('skills-content');
  if (skillsContent) {
    const leftSkills = window.portfolioContent.skills.slice(0, 3)
      .map((skill, index) => `
        <div class="progress reveal-item reveal-delay-${index + 1}">
          <span class="skill">${skill.name} <val>${skill.value}%</val></span>
          <div class="progress-bar-wrap">
            <div class="progress-bar" role="progressbar" aria-valuenow="${skill.value}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      `).join('');

    const rightSkills = window.portfolioContent.skills.slice(3)
      .map((skill, index) => `
        <div class="progress reveal-item reveal-delay-${index + 4}">
          <span class="skill">${skill.name} <val>${skill.value}%</val></span>
          <div class="progress-bar-wrap">
            <div class="progress-bar" role="progressbar" aria-valuenow="${skill.value}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      `).join('');

    skillsContent.innerHTML = `
      <div class="col-lg-6">${leftSkills}</div>
      <div class="col-lg-6">${rightSkills}</div>
    `;
  }
}

function renderResume() {
  const resumeContainer = document.getElementById('resume-content');
  if (!resumeContainer) return;

  const summaryList = window.portfolioContent.resume.summary.details
    .map((item) => `<li>${item}</li>`)
    .join('');

  const educationMarkup = window.portfolioContent.resume.education
    .map((item, index) => `
      <div class="resume-item reveal-item reveal-delay-${index + 1}">
        <h4>${item.title}</h4>
        <h5>${item.period}</h5>
        <p><em>${item.org}</em></p>
      </div>
    `).join('');

  const experienceMarkup = window.portfolioContent.resume.experience
    .map((item, index) => `
      <div class="resume-item reveal-item reveal-delay-${index + 1}">
        <h4>${item.title}</h4>
        <h5>${item.period}</h5>
        <p><em>${item.company}</em></p>
        <ul>
          ${item.responsibilities.map((responsibility) => `<li>${responsibility}</li>`).join('')}
        </ul>
      </div>
    `).join('');

  resumeContainer.innerHTML = `
    <div class="section-title">
      <h2>Resume</h2>
      <p>Check My Resume</p>
    </div>

    <div class="row">
      <div class="col-lg-6">
        <h3 class="resume-title">Summary</h3>
        <div class="resume-item pb-0">
          <h4>${window.portfolioContent.resume.summary.name}</h4>
          <p><em>${window.portfolioContent.resume.summary.text}</em></p>
          <ul>
            ${summaryList}
          </ul>
        </div>

        <h3 class="resume-title">Education</h3>
        ${educationMarkup}
      </div>

      <div class="col-lg-6">
        <h3 class="resume-title">Professional Experience</h3>
        ${experienceMarkup}
      </div>
    </div>
  `;
}

function renderServices() {
  const servicesContainer = document.getElementById('services-content');
  if (!servicesContainer) return;

  const cards = window.portfolioContent.services
    .map((service, index) => `
      <div class="col-lg-4 col-md-6 d-flex align-items-stretch reveal-item reveal-delay-${index + 1}">
        <div class="icon-box w-100 p-4" style="background: rgba(255,255,255,0.08); border-radius: 8px;">
          <div class="icon" style="color: #18d26e; font-size: 36px; margin-bottom: 15px;"><i class="${service.icon}"></i></div>
          <h4 style="font-size: 18px; font-weight: 700;"><a href="#" style="color: #fff;">${service.title}</a></h4>
          <p style="font-size: 14px; color: #ccc;">${service.description}</p>
        </div>
      </div>
    `).join('');

  servicesContainer.innerHTML = `
    <div class="section-title">
      <h2>Services</h2>
      <p>My Expertise &amp; Offerings</p>
    </div>

    <div class="row">
      ${cards}
    </div>
  `;
}

function renderContact() {
  const contactContainer = document.getElementById('contact-content');
  if (!contactContainer) return;

  const socialMarkup = window.portfolioContent.contact.social
    .map((item) => `<a href="${item.url}" target="_blank" class="${item.platform}"><i class="${item.icon}"></i></a>`)
    .join('');

  contactContainer.innerHTML = `
    <div class="section-title">
      <h2>Contact</h2>
      <p>Get in Touch</p>
    </div>

    <div class="row mt-2">
      <div class="col-md-6 d-flex align-items-stretch reveal-item reveal-delay-1">
        <div class="info-box w-100">
          <i class="bx bx-map"></i>
          <h3>My Location</h3>
          <p>${window.portfolioContent.contact.location}</p>
        </div>
      </div>

      <div class="col-md-6 mt-4 mt-md-0 d-flex align-items-stretch reveal-item reveal-delay-2">
        <div class="info-box w-100">
          <i class="bx bx-share-alt"></i>
          <h3>Social Profiles</h3>
          <div class="social-links">
            ${socialMarkup}
          </div>
        </div>
      </div>

      <div class="col-md-6 mt-4 d-flex align-items-stretch reveal-item reveal-delay-3">
        <div class="info-box w-100">
          <i class="bx bx-envelope"></i>
          <h3>Email Me</h3>
          <p>${window.portfolioContent.contact.email}</p>
        </div>
      </div>

      <div class="col-md-6 mt-4 d-flex align-items-stretch reveal-item reveal-delay-4">
        <div class="info-box w-100">
          <i class="bx bx-phone-call"></i>
          <h3>Contact Me</h3>
          <p>${window.portfolioContent.contact.phone}</p>
          <button type="button" class="nudge-button">Nudge Me</button>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeader();
  renderAbout();
  renderResume();
  renderServices();
  renderContact();

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    }
    return document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  on('click', '.nav-link', function (e) {
    const section = select(this.hash);
    if (section) {
      e.preventDefault();
      const sections = select('section', true);
      sections.forEach((item) => item.classList.remove('section-show'));
      section.classList.add('section-show');

      const navLinks = select('.navbar .nav-link', true);
      navLinks.forEach((item) => item.classList.remove('active'));
      this.classList.add('active');
    }
  }, true);

  const skillsContent = select('.skills-content');
  if (skillsContent) {
    const progressBars = select('.progress-bar', true);
    progressBars.forEach((el) => {
      el.style.width = el.getAttribute('aria-valuenow') + '%';
    });
  }

  window.addEventListener('load', () => {
    if (window.location.hash) {
      const initialNav = select(window.location.hash);
      if (initialNav) {
        const sections = select('section', true);
        sections.forEach((item) => item.classList.remove('section-show'));
        initialNav.classList.add('section-show');
      }
    }
  });
});
