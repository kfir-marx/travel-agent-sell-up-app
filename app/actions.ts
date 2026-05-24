"use server";

export type BookingInput = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  destination: string;
  departureDate: string;
  returnDate: string;
};

export type BookingResult =
  | { ok: true; sid: string }
  | { ok: false; error: string };

const TWILIO_ACCOUNT_SID = "AC0fda4ccfc5b7b6b642edfa4b6e8b9804";
const TWILIO_FROM = "whatsapp:+14155238886";

export async function bookFlight(input: BookingInput): Promise<BookingResult> {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const agentPhoneNumber = process.env.AGENT_PHONE_NUMBER;

  if (!authToken) {
    return { ok: false, error: "Missing TWILIO_AUTH_TOKEN environment variable." };
  }
  if (!agentPhoneNumber) {
    return { ok: false, error: "Missing AGENT_PHONE_NUMBER environment variable." };
  }

  const messageBody =
    `Flight confirmed for ${input.customerName} to ${input.destination}! ✈️ ` +
    `Want to increase your margin? We found 3 bulk-rate hotels available for these dates. \n\n` +
    `👉 Click here to book instantly: https://example.com/book \n` +
    `👉 Click here to forward options to ${input.customerName}: https://example.com/forward`;

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
