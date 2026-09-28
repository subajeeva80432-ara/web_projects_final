import './Project2(2).css'
import HobbyCard from './HobbyCard.jsx'

const hobbyData = {
  title: 'My Hobbies',
  subtitle: 'A few things that make my free time brighter and more meaningful.',
  hobbies: [
    {
      icon: '📚',
      title: 'Reading Books',
      description:
        'I love reading fiction and self-development books that spark new ideas and improve my thinking.',
      level: 'Advanced',
      tag: 'Fiction · Self-Help',
    },
    {
      icon: '🎨',
      title: 'Drawing & Painting',
      description:
        'Sketching and painting help me relax and express my creativity using colours and designs.',
      level: 'Intermediate',
      tag: 'Art · Creativity',
    },
    {
      icon: '🎮',
      title: 'Gaming',
      description:
        'Playing strategy and puzzle games keeps my mind sharp and is a fun way to unwind.',
      level: 'Beginner',
      tag: 'Puzzle · Strategy',
    },
  ],
}

function Project2_2() {
  return (
    <div className="hobby-page">
      <div className="hobby-container">
        <header className="hobby-header">
          <span className="hobby-badge">Explore</span>
          <h2 className="hobby-heading">{hobbyData.title}</h2>
          <p className="hobby-subtitle">{hobbyData.subtitle}</p>
        </header>
        <div className="hobby-grid">
          {hobbyData.hobbies.map((hobby) => (
            <HobbyCard
              key={hobby.title}
              icon={hobby.icon}
              title={hobby.title}
              description={hobby.description}
              level={hobby.level}
              tag={hobby.tag}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Project2_2
