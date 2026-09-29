import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Grades from './pages/Grades.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'
import ReportCard from './pages/ReportCard.jsx'
import Students from './pages/Students.jsx'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/report-card" element={<ReportCard />} />
          <Route path="/report-card/:studentId" element={<ReportCard />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
