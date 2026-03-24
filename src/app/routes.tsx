import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { LearnPage } from '../pages/LearnPage'
import { NotFoundPage } from '../pages/NotFoundPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/learn" element={<LearnPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
