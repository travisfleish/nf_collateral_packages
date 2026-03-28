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
            pdfSrc="/images_new/world_cup_new.svg"
            imageTopCropPercent={11}
          />
        }
      />
      <Route
        path="/football"
        element={
          <SportCollateralPage
            pageTitle="Football"
            pdfSrc="/images/Football.svg"
          />
        }
      />
      <Route
        path="/basketball"
        element={
          <SportCollateralPage
            pageTitle="Basketball"
            pdfSrc="/images_new/basketball_new.svg"
            imageTopCropPercent={11}
          />
        }
      />
      <Route
        path="/soccer"
        element={
          <SportCollateralPage
            pageTitle="Soccer"
            pdfSrc="/images_new/soccer_new.svg"
            imageTopCropPercent={11}
          />
        }
      />
      <Route
        path="/augmentation"
        element={
          <SportCollateralPage
            pageTitle="Augmentation"
            collateralHeader="Augmentation"
            collateralHeaderStyle="treatment"
            pdfSrc={['/images_new/augmentation_1_new.svg', '/images_new/augmentation_2_new.svg']}
            imageTopCropPercent={[33, 16]}
            imageBottomCropPercent={[10, 0]}
            imageWidthPercent={[94, 94]}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
