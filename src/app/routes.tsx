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
          <SportCollateralPage
            pageTitle="World Cup"
            pdfSrc="/pdfs/World%20Cup.svg"
          />
        }
      />
      <Route
        path="/football"
        element={
          <SportCollateralPage
            pageTitle="Football"
            pdfSrc="/pdfs/Football.svg"
          />
        }
      />
      <Route
        path="/basketball"
        element={
          <SportCollateralPage
            pageTitle="Basketball"
            pdfSrc="/pdfs/basketball.svg"
          />
        }
      />
      <Route
        path="/soccer"
        element={
          <SportCollateralPage
            pageTitle="Soccer"
            pdfSrc="/pdfs/Soccer.svg"
          />
        }
      />
      <Route
        path="/augmentation"
        element={
          <SportCollateralPage
            pageTitle="Augmentation"
            pdfSrc="/pdfs/Augmentation.svg"
            stackMobile
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
