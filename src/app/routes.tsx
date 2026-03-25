import { Navigate, Route, Routes } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage'
import { SportCollateralPage } from '../pages/SportCollateralPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/world-cup" replace />} />
      <Route
        path="/world-cup"
        element={
          <SportCollateralPage pageTitle="World Cup" pdfSrc="/pdfs/BarTableTopper_WorldCup_5x7.pdf" />
        }
      />
      <Route
        path="/football"
        element={
          <SportCollateralPage pageTitle="Football" pdfSrc="/pdfs/BarTableTopper_Football_5x7.pdf" />
        }
      />
      <Route
        path="/basketball"
        element={
          <SportCollateralPage
            pageTitle="Basketball"
            pdfSrc="/pdfs/BarTableTopper_Basketball_5x7.pdf"
          />
        }
      />
      <Route
        path="/soccer"
        element={
          <SportCollateralPage pageTitle="Soccer" pdfSrc="/pdfs/BarTableTopper_Soccer_5x7.pdf" />
        }
      />
      <Route
        path="/augmentation"
        element={
          <SportCollateralPage
            pageTitle="Augmentation"
            pdfSrc="/pdfs/BarTableTopper_Augmentation_5x7.pdf"
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
