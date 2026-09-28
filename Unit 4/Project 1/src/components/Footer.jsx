export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-logo"><span>S</span><span>A</span></div>
          <p>Crafting clean, human-centred web experiences — one production feature at a time.</p>
          <p>© {year} Subasri Aramudhu · Chennai, India</p>
        </div>
        <ul className="footer-links">
          <li><a href="https://github.com/subajeeva80432-ara" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/subasri-aramudhu-842a09373" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="https://leetcode.com/u/subasriaramudhu1/" target="_blank" rel="noopener">LeetCode</a></li>
          <li><a href="/resume.pdf" target="_blank" rel="noopener">Resume</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </div>
    </footer>
  )
}