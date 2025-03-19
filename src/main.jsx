// Suppress specific Quill.js warning
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Listener added for a 'DOMNodeInserted'")
  ) {
    return; // Ignore the warning
  }
  originalWarn(...args); // Log other warnings as usual
};
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import { SidebarProvider } from './context/sidebarContext.jsx';
import { ProfileProvider } from './context/ProfileContext.jsx';
import { GameProvider } from './context/GameContext.jsx';
import { PricingProvider } from './context/PricingContext.jsx';
import { PublicHolidayProvider } from './context/PublicHolidaysContext.jsx';
import { TimeSlotProvider } from './context/TimeSlot.jsx';
import { BlogProvider } from './context/BlogContext.jsx';
import { CouponProvider } from './context/CouponContext.jsx';
import { BookingProvider } from './context/BookingContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BookingProvider>
  <CouponProvider>
  <BlogProvider>
  <TimeSlotProvider>
  <PublicHolidayProvider>
  <PricingProvider>
  <GameProvider>
  <ProfileProvider>
  <SidebarProvider>
    <App />
  </SidebarProvider>
  </ProfileProvider>
  </GameProvider>
  </PricingProvider>
  </PublicHolidayProvider>
  </TimeSlotProvider>
  </BlogProvider>
  </CouponProvider>
  </BookingProvider>
)
