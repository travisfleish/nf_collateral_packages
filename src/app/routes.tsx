import { Route, Routes } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage'
import { SportCollateralPage } from '../pages/SportCollateralPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <SportCollateralPage
            pageTitle="World Cup"
            pdfSrc="/images_new/world_cup_new.svg"
            imageTopCropPercent={11}
          />
        }
      />
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
            pdfSrc="/images_new/football_new.svg"
            imageTopCropPercent={11}
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
            pdfSrc={['/images_new/augmentation_1.svg', '/images_new/augmentation_2_new.svg']}
            imageTopCropPercent={[3, 0]}
            imageBottomCropPercent={[32, 0]}
            imageWidthPercent={[94, 94]}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
