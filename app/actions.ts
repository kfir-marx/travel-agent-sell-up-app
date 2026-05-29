"use server";

export type UpsellInput = {
  flightId: string;
  bookingRef: string;
  passengerName: string;
  customerEmail: string;
  customerPhone: string;
  destinationCity: string;
  departureDate: string;
  returnDate: string;
};

export type UpsellResult =
  | { ok: true; sid: string }
  | { ok: false; error: string };

const TWILIO_ACCOUNT_SID = "AC0fda4ccfc5b7b6b642edfa4b6e8b9804";
const TWILIO_FROM = "whatsapp:+14155238886";
const LANDING_PAGE_BASE = "https://atlas-travel.example.com/hotels";

export async function sendUpsellWhatsApp(input: UpsellInput): Promise<UpsellResult> {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const agentPhoneNumber = process.env.AGENT_PHONE_NUMBER;

  if (!authToken) {
    return { ok: false, error: "Missing TWILIO_AUTH_TOKEN environment variable." };
  }
  if (!agentPhoneNumber) {
    return { ok: false, error: "Missing AGENT_PHONE_NUMBER environment variable." };
  }

  // const landingUrl = `${LANDING_PAGE_BASE}/${input.bookingRef}`;
  const landingUrl = `https://auth.letstay.co.il/login?state=hKFo2SBvYWJrWWJQbnBxRGVwazdzeGgybmVydnRmVFRNd1dPZ6FupWxvZ2luo3RpZNkgT1JkOXNIc1U2RUdySXNsVmJjR0tKWmtIYzdXSGFDNGujY2lk2SBkV1JnR0FMN1V6OHdaVFpEVEJvcGNLTTBLUUJiY1BMUw&client=dWRgGAL7Uz8wZTZDTBopcKM0KQBbcPLS&protocol=oauth2&prompt=login&scope=openid%20email%20profile&response_type=code&redirect_uri=https%3A%2F%2Fapi.letstay.co.il%2Fcallback%2Fletstay%3Freferrer%3Dletstay%26ref_url%3Dhttps%253A%252F%252Fapp.letstay.co.il%252Fresults%253Fplace_id%253DChIJXQNBzXCJwokRuEHYXzmN73E%2526check_in%253D260701%2526check_out%253D260715%2526guests%253D2%2526rooms%253D1%2526private_travel%253Dtrue%2526utm_source%253Dletstay%26place_id%3DChIJXQNBzXCJwokRuEHYXzmN73E%26check_in%3D260701%26check_out%3D260715%26guests%3D2%26rooms%3D1%26private_travel%3Dtrue%26utm_source%3Dletstay&text=%D7%94%D7%99%D7%99!%20%D7%A7%D7%99%D7%91%D7%9C%D7%AA%D7%9D%20%D7%92%D7%99%D7%A9%D7%94%20%D7%99%D7%A9%D7%99%D7%A8%D7%94%20%D7%9C%D7%90%D7%AA%D7%A8%20%D7%94%D7%96%D7%9E%D7%A0%D7%AA%20%D7%91%D7%AA%D7%99%20%D7%94%D7%9E%D7%9C%D7%95%D7%9F%20%D7%94%D7%9E%D7%A9%D7%AA%D7%9C%D7%9D%20%D7%91%D7%99%D7%A9%D7%A8%D7%90%D7%9C!%3Cbr%2F%3E%20%D7%94%D7%AA%D7%97%D7%91%D7%A8%D7%95%20%D7%91%D7%A7%D7%9C%D7%95%D7%AA%20%D7%95%D7%AA%D7%AA%D7%97%D7%99%D7%9C%D7%95%20%D7%9C%D7%97%D7%A1%D7%95%D7%9A.&bg=https%3A%2F%2Fassets.letstay.co.il%2Flogin%2Fbg-default.png&bgMobile=https%3A%2F%2Fassets.letstay.co.il%2Flogin%2Fbg-mobile-default.png&logo=https%3A%2F%2Fassets.letstay.co.il%2Flogin%2Flogo-pink.png&stars=https%3A%2F%2Fassets.letstay.co.il%2Flogin%2Fstars.png&primaryColor=%23DC366A&continueText=%D7%94%D7%9E%D7%A9%D7%9A`;
  const messageBody =
    `Hi ${input.passengerName.split(/[&,]/)[0].trim()}! ✈️\n\n` +
    `Your Atlas Travel trip to ${input.destinationCity} (${input.departureDate} → ${input.returnDate}) is confirmed.\n\n` +
    `We secured 3 partner hotels at unpublished rates for your dates. ` +
    `Hold any of them with one tap — no charge until check-in:\n\n` +
    `👉 ${landingUrl}\n\n` +
    `Reply STOP to opt out.`;

  const body = new URLSearchParams({
    To: `whatsapp:${agentPhoneNumber}`,
    From: TWILIO_FROM,
    Body: messageBody,
  });

  const credentials = Buffer.from(`${TWILIO_ACCOUNT_SID}:${authToken}`).toString("base64");

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return {
        ok: false,
        error: `Twilio responded with ${response.status}: ${errorText}`,
      };
    }

    const data = (await response.json()) as { sid: string };
    return { ok: true, sid: data.sid };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { ok: false, error: `Failed to reach Twilio: ${message}` };
  }
}
