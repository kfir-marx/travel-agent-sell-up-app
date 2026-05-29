export type Lang = "en" | "he";

export type Dict = Record<string, string>;

export const LOCALES: Record<Lang, string> = {
  en: "en-US",
  he: "he-IL",
};

const EN: Dict = {
  // nav / shell
  "nav.brand": "Atlas Travel",
  "nav.subtitle": "Upsell Suite",
  "nav.agent": "Agent",
  "nav.agency": "Agency",
  "nav.role": "Senior Travel Agent",
  "nav.lang.en": "EN",
  "nav.lang.he": "HE",
  "nav.lang.aria": "Switch language",

  // agent view
  "agent.eyebrow": "My Bookings",
  "agent.title": "Upcoming flights",
  "agent.subtitle.one": "1 booking is open for a hotel upsell — about {commission} in commission on the line.",
  "agent.subtitle.other": "{count} bookings are open for a hotel upsell — about {commission} in commission on the line.",
  "agent.pill.upsellAvailable": "Upsell available",
  "agent.pill.handled": "Handled",
  "agent.section.open.eyebrow": "Open",
  "agent.section.open.title": "Ready to upsell",
  "agent.section.open.hint": "Click a card to send the WhatsApp offer.",
  "agent.section.closed.eyebrow": "Closed",
  "agent.section.closed.title": "Already handled",
  "agent.section.closed.hint": "These bookings are no longer eligible for upsell.",

  // flight card
  "card.dates": "Dates",
  "card.potentialCommission": "Potential commission",
  "card.review": "Review",
  "card.view": "View",
  "card.help.upsold": "WhatsApp offer sent — earning commission on conversion.",
  "card.help.declined": "Agent skipped this upsell.",
  "card.help.past": "Hotel already booked through Atlas Travel.",
  "card.status.open": "Upsell available",
  "card.status.upsold": "Upsell sent",
  "card.status.declined": "Declined",
  "card.status.past": "Hotel on file",

  // detail modal
  "modal.bookingRef": "Booking {ref}",
  "modal.travelers.one": "1 traveler · {email}",
  "modal.travelers.other": "{count} travelers · {email}",
  "modal.itinerary": "Itinerary",
  "modal.nights": "Nights",
  "modal.flightCost": "Flight cost",
  "modal.hotelValue": "Hotel value",
  "modal.email": "Email",
  "modal.phone": "Phone",
  "modal.upsell.eyebrow": "Hotel upsell",
  "modal.upsell.title": "Would you like to book a hotel independently for this booking?",
  "modal.upsell.body": "We'll WhatsApp {firstName} a curated shortlist of 3 partner hotels at unpublished rates. Your projected commission on conversion is {commission}.",
  "modal.btn.no": "No, skip",
  "modal.btn.yes": "Yes, send WhatsApp offer",
  "modal.btn.close": "Close",
  "modal.legal": "Sends via Twilio WhatsApp Business · receipt logged to the booking",
  "modal.aria.close": "Close",

  // handled status card
  "handled.upsold.label": "Upsell sent",
  "handled.upsold.title": "WhatsApp offer delivered",
  "handled.upsold.body": "A curated hotel shortlist has been sent to {email}. Commission on conversion is {commission}.",
  "handled.declined.label": "Skipped",
  "handled.declined.title": "Upsell not offered",
  "handled.declined.body": "The agent chose not to send a hotel offer for this booking. No customer outreach was made.",
  "handled.past.label": "Hotel on file",
  "handled.past.title": "Hotel already booked",
  "handled.past.body": "This traveler already has a hotel booked through Atlas Travel for these dates. No further outreach needed.",

  // toasts
  "toast.upsold.title": "WhatsApp sent",
  "toast.upsold.body": "Hotel offer delivered to {name} at {email}.",
  "toast.declined.title": "Upsell skipped",
  "toast.declined.body": "{ref} marked as not eligible for outreach.",
  "toast.error.title": "WhatsApp delivery failed",
  "toast.aria.dismiss": "Dismiss",

  // agency view
  "agency.eyebrow": "Agency Performance",
  "agency.title": "Hotel upsell analytics",
  "agency.subtitle": "Real-time view of conversion, commission earned, and commission still on the table across all agents.",
  "agency.live": "Live",
  "agency.metric.closingRate": "Closing rate",
  "agency.metric.closingRate.delta": "{upsold} of {total} bookings converted",
  "agency.metric.netProfit": "Net profit (commission)",
  "agency.metric.netProfit.delta": "1% of {revenue} in booked hotel value",
  "agency.metric.potentialProfit": "Potential profit",
  "agency.metric.potentialProfit.delta.one": "1 open booking pending outreach",
  "agency.metric.potentialProfit.delta.other": "{count} open bookings pending outreach",
  "agency.leaderboard.eyebrow": "Agent leaderboard",
  "agency.leaderboard.title": "Commission earned this quarter",
  "agency.leaderboard.tracked": "{count} bookings tracked",
  "agency.leaderboard.row": "{upsold} sold · {rate} close",
  "agency.mix.eyebrow": "Pipeline mix",
  "agency.mix.title": "Booking status",
  "agency.mix.upsold": "Upsold",
  "agency.mix.open": "Open",
  "agency.mix.declined": "Declined",
  "agency.mix.past": "Hotel on file",
  "agency.mix.footer": "Closing every remaining open booking would add {amount} to this quarter's commission.",
};

const HE: Dict = {
  // nav / shell
  "nav.brand": "אטלס טראוול",
  "nav.subtitle": "מערכת מכירות נלוות",
  "nav.agent": "סוכן",
  "nav.agency": "סוכנות",
  "nav.role": "סוכנת נסיעות בכירה",
  "nav.lang.en": "EN",
  "nav.lang.he": "HE",
  "nav.lang.aria": "החלפת שפה",

  // agent view
  "agent.eyebrow": "ההזמנות שלי",
  "agent.title": "טיסות קרובות",
  "agent.subtitle.one": "הזמנה אחת פתוחה למכירת בית מלון — כ-{commission} עמלה פוטנציאלית.",
  "agent.subtitle.other": "{count} הזמנות פתוחות למכירת בית מלון — כ-{commission} עמלה פוטנציאלית.",
  "agent.pill.upsellAvailable": "ניתן למכור",
  "agent.pill.handled": "טופלו",
  "agent.section.open.eyebrow": "פתוח",
  "agent.section.open.title": "מוכן למכירה",
  "agent.section.open.hint": "לחיצה על כרטיס שולחת הצעת וואטסאפ.",
  "agent.section.closed.eyebrow": "סגור",
  "agent.section.closed.title": "כבר טופלו",
  "agent.section.closed.hint": "הזמנות אלו אינן זמינות יותר למכירת מלון.",

  // flight card
  "card.dates": "תאריכים",
  "card.potentialCommission": "עמלה פוטנציאלית",
  "card.review": "סקירה",
  "card.view": "צפייה",
  "card.help.upsold": "הצעת וואטסאפ נשלחה — מצפים לעמלה בהמרה.",
  "card.help.declined": "הסוכנת דילגה על הצעה זו.",
  "card.help.past": "המלון כבר הוזמן דרך אטלס טראוול.",
  "card.status.open": "ניתן למכור",
  "card.status.upsold": "הצעה נשלחה",
  "card.status.declined": "סורבה",
  "card.status.past": "מלון בתיק",

  // detail modal
  "modal.bookingRef": "הזמנה {ref}",
  "modal.travelers.one": "נוסע אחד · {email}",
  "modal.travelers.other": "{count} נוסעים · {email}",
  "modal.itinerary": "מסלול",
  "modal.nights": "לילות",
  "modal.flightCost": "עלות טיסה",
  "modal.hotelValue": "שווי מלון",
  "modal.email": "אימייל",
  "modal.phone": "טלפון",
  "modal.upsell.eyebrow": "מכירת מלון",
  "modal.upsell.title": "האם להציע ללקוח להזמין מלון בנפרד עבור הזמנה זו?",
  "modal.upsell.body": "אנו נשלח ל{firstName} בוואטסאפ רשימה אצורה של 3 מלונות שותפים במחירים בלעדיים. העמלה הצפויה בהמרה היא {commission}.",
  "modal.btn.no": "לא, דילוג",
  "modal.btn.yes": "כן, שליחת הצעה בוואטסאפ",
  "modal.btn.close": "סגירה",
  "modal.legal": "נשלח דרך Twilio WhatsApp Business · האישור נרשם בהזמנה",
  "modal.aria.close": "סגירה",

  // handled status card
  "handled.upsold.label": "הצעה נשלחה",
  "handled.upsold.title": "הצעת וואטסאפ נמסרה",
  "handled.upsold.body": "רשימת מלונות אצורה נשלחה אל {email}. העמלה בהמרה היא {commission}.",
  "handled.declined.label": "דולג",
  "handled.declined.title": "לא הוצעה מכירה",
  "handled.declined.body": "הסוכנת בחרה לא לשלוח הצעת מלון להזמנה זו. לא נשלחה כל פנייה ללקוח.",
  "handled.past.label": "מלון בתיק",
  "handled.past.title": "המלון כבר הוזמן",
  "handled.past.body": "ללקוח כבר יש מלון מוזמן דרך אטלס טראוול לתאריכים אלו. אין צורך בפנייה נוספת.",

  // toasts
  "toast.upsold.title": "וואטסאפ נשלח",
  "toast.upsold.body": "הצעת מלון נמסרה ל{name} בכתובת {email}.",
  "toast.declined.title": "המכירה דולגה",
  "toast.declined.body": "{ref} סומנה כלא זמינה לפנייה.",
  "toast.error.title": "שליחת הוואטסאפ נכשלה",
  "toast.aria.dismiss": "סגירה",

  // agency view
  "agency.eyebrow": "ביצועי הסוכנות",
  "agency.title": "אנליטיקת מכירות מלונות",
  "agency.subtitle": "תצוגה חיה של אחוז ההמרה, העמלה שנצברה, והעמלה שנשארה על השולחן בכל הסוכנים.",
  "agency.live": "בזמן אמת",
  "agency.metric.closingRate": "אחוז המרה",
  "agency.metric.closingRate.delta": "{upsold} מתוך {total} הזמנות הומרו",
  "agency.metric.netProfit": "רווח נקי (עמלה)",
  "agency.metric.netProfit.delta": "1% משווי מלונות מוזמנים של {revenue}",
  "agency.metric.potentialProfit": "רווח פוטנציאלי",
  "agency.metric.potentialProfit.delta.one": "הזמנה פתוחה אחת ממתינה לפנייה",
  "agency.metric.potentialProfit.delta.other": "{count} הזמנות פתוחות ממתינות לפנייה",
  "agency.leaderboard.eyebrow": "טבלת מובילים",
  "agency.leaderboard.title": "עמלה שנצברה ברבעון",
  "agency.leaderboard.tracked": "{count} הזמנות במעקב",
  "agency.leaderboard.row": "{upsold} נמכרו · {rate} המרה",
  "agency.mix.eyebrow": "פיזור צבר",
  "agency.mix.title": "סטטוס הזמנות",
  "agency.mix.upsold": "הומרו",
  "agency.mix.open": "פתוחות",
  "agency.mix.declined": "סורבו",
  "agency.mix.past": "מלון בתיק",
  "agency.mix.footer": "סגירת כל ההזמנות הפתוחות הנותרות תוסיף {amount} לעמלת הרבעון.",
};

export const DICTIONARIES: Record<Lang, Dict> = { en: EN, he: HE };

export function tr(dict: Dict, key: string, vars: Record<string, string | number> = {}) {
  let s = dict[key] ?? key;
  for (const [k, v] of Object.entries(vars)) {
    s = s.replaceAll(`{${k}}`, String(v));
  }
  return s;
}
