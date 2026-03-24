import { Navigate, Route, Routes } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage'
import { SportCollateralPage } from '../pages/SportCollateralPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/world-cup" replace />} />
      <Route
        path="/world-cup"
        element={<SportCollateralPage pageTitle="World Cup" imageSrc="/world_cup.jpg" />}
      />
      <Route
        path="/football"
        element={<SportCollateralPage pageTitle="Football" pdfSrc="/pdfs/placeholder.pdf" />}
      />
      <Route
        path="/basketball"
        element={<SportCollateralPage pageTitle="Basketball" pdfSrc="/pdfs/placeholder.pdf" />}
      />
      <Route
        path="/soccer"
        element={<SportCollateralPage pageTitle="Soccer" pdfSrc="/pdfs/placeholder.pdf" />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
