import './Project2.css'
import Header from './Header.jsx'
import Profile from './Profile.jsx'
import About from './About.jsx'
import Skills from './Skills.jsx'
import Goal from './Goal.jsx'
import Contact from './Contact.jsx'
import Footer from './Footer.jsx'

const personalData = {
  title: 'Personal Introduction',
  subtitle: 'A quick look at who I am, what I do, and where I am headed.',
  name: 'Subasri',
  role: 'Frontend Developer',
  location: 'Bangalore, India',
  email: 'suba@gmail.com',
  phone: '+91 98765 43210',
  languages: ['English', 'Hindi', 'Telugu'],
  aboutHeading: 'About Me',
  aboutText:
    'Hello! I am Subasri, a passionate frontend developer who loves turning ideas into clean, responsive, and user-friendly web experiences. I enjoy learning new technologies and building small projects to sharpen my skills.',
  skillsHeading: 'Technical Skills',
  skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Git & GitHub', 'Responsive Design'],
  goalHeading: 'Career Goal',
  goal: 'To work as a software engineer in a product-based company, contributing to impactful web applications and growing into a full-stack developer over time.',
  contactHeading: 'Contact Me',
  footerMessage: 'Thank you for visiting my page! Made with ❤️ using React.',
}

function Project2() {
  return (
    <div className="intro-page">
      <div className="intro-container">
        <Header title={personalData.title} subtitle={personalData.subtitle} />
        <Profile
          name={personalData.name}
          role={personalData.role}
          location={personalData.location}
          email={personalData.email}
          languages={personalData.languages}
        />
        <About heading={personalData.aboutHeading} text={personalData.aboutText} />
        <Skills heading={personalData.skillsHeading} skills={personalData.skills} />
        <Goal heading={personalData.goalHeading} goal={personalData.goal} />
        <Contact
          heading={personalData.contactHeading}
          email={personalData.email}
          phone={personalData.phone}
          location={personalData.location}
        />
        <Footer message={personalData.footerMessage} />
      </div>
    </div>
  )
}

export default Project2
