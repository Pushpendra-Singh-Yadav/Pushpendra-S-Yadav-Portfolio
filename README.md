Pushpendra Singh Yadav's Portfolio
Welcome to my personal portfolio, a dynamic and visually striking showcase of my skills, projects, and achievements as a web developer and game design enthusiast. Built with modern web technologies, this portfolio reflects a bold, professional, and "dangerously creative" aesthetic, featuring animated particles, glowing effects, and interactive elements.
Table of Contents

Overview
Features
Technologies
Setup Instructions
File Structure
Dependencies
Customization
Deployment
Contributing
License
Contact

Overview
This portfolio highlights my expertise in web development and game design through distinct sections: About, Education, Skills, Projects, Contact, Footer, and Certificates. It showcases my proficiency in HTML, CSS, JavaScript, React, and the MERN stack, alongside creative skills in game design. The design uses a white and blue color scheme (#ffffff, #007bff to #00c4ff, #b3d4fc) with dark text (#1a1a1a, #4a4a4a) for readability, enhanced by animations and interactive modals.
Features

About: Introduces my background as a passionate web developer and game design enthusiast.
Education: Details my academic journey and relevant coursework.
Skills: Showcases technical skills (HTML, CSS, JavaScript, React, MERN) and game design competencies.
Projects: Highlights key projects with descriptions, technologies, and links.
Contact: Features a Netlify-integrated contact form in a pop-up modal, accessible via the Footer.
Footer: A bold, informative section with bio, contact info, newsletter subscription, social media links, and a 3D badge.
Certificates: Displays certifications with interactive cards and modals, including:
Meta Front-End Developer (Coursera by Meta, May 7, 2024)
Game Design: Art and Concepts (Coursera, July 2025)


Creative Elements:
Animated background particles with parallax effects.
Glowing hover effects on buttons, links, and cards.
3D rotating badges with tooltips ("Dangerously Creative" and "Certified Excellence").
Scroll-based animations using AOS.


Responsiveness: Fully optimized for desktop, tablet, and mobile devices.
Interactivity: Modals for certificate details, form submissions with feedback, and social media links.

Technologies

HTML5: Structure for all sections.
CSS3: Styling with gradients, animations, and responsive design.
JavaScript (ES6+): Interactivity for modals, form handling, and animations.
Font Awesome: Icons for visual elements (e.g., social media, badges).
AOS (Animate on Scroll): Scroll-based animations.
Netlify Forms: Contact and newsletter form submissions.

Setup Instructions

Clone the Repository:
git clone https://github.com/your-username/your-portfolio.git
cd your-portfolio


Install Dependencies:No npm or package installations are required, as dependencies are loaded via CDNs. Ensure an internet connection for:

Font Awesome: https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css
AOS: https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css and https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js


Serve Locally:Use a local server (e.g., VS Code Live Server, Python, or Node.js) to view the portfolio:
python -m http.server 8000

Open http://localhost:8000 in your browser.

Update Content:

Replace placeholder images in certificates.html (e.g., https://via.placeholder.com/600x400) with actual certificate images.
Update certificate links in certificates.js (e.g., certificateData.link) with verification URLs.
Modify content in footer.html (bio, contact info) and other sections as needed.



File Structure
your-portfolio/
├── index.html            # Main HTML file (integrates all sections)
├── css/
│   ├── footer.css        # Styles for Footer section
│   ├── certificates.css  # Styles for Certificates section
│   └── styles.css        # General styles (About, Education, Skills, Projects, Contact)
├── js/
│   ├── footer.js         # Scripts for Footer interactivity
│   ├── certificates.js   # Scripts for Certificates interactivity
│   └── main.js           # General scripts for other sections
├── images/               # Store certificate images and other assets
└── README.md             # This file

Dependencies
Include the following in the <head> of index.html:
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>

Customization

Content:
Update footer.html with your actual bio, email, phone, and location.
Modify certificates.html and certificates.js to add or remove certificates, updating titles, issuers, dates, descriptions, and skills.
Replace placeholder images with actual certificate images in images/.


Styling:
Adjust colors in CSS files (e.g., --white, #007bff, #00c4ff, #b3d4fc) to match your branding.
Modify particle animations in .bg-particle or badge styles in .badge-container.


Forms:
Update form names in footer.html (footer-contact-form, newsletter-form) if integrating with a different backend.
Add more form fields or customize validation in footer.js.



Deployment

Host on Netlify:
Push the repository to GitHub.
Connect to Netlify via the GitHub repository.
Netlify will auto-detect forms (footer-contact-form, newsletter-form) for submission handling.


Verify Forms:
Check the "Forms" section in the Netlify dashboard to view submissions.
Enable notifications (e.g., email, Slack) for form submissions.


Custom Domain (Optional):
Configure a custom domain in Netlify settings for a professional URL.



Contributing
This is a personal portfolio, but suggestions are welcome! Feel free to open an issue or submit a pull request on GitHub for improvements or bug fixes.
License
This project is licensed under the MIT License. See the LICENSE file for details.
Contact

Email: pushpendra@example.com
Phone: +91 98765 43210
Location: Rajpura, Punjab, India
Social Media:
LinkedIn
GitHub
Twitter
Instagram


Portfolio: Your Portfolio URL (Update with actual URL after deployment)


Built with passion by Pushpendra Singh Yadav, 2025.