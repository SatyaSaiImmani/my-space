"use server"

interface ContactPayload {
  name: string
  email: string
  message: string
}

interface ContactResult {
  success: boolean
  error?: string
}

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  const { name, email, message } = payload

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  // Log submission (replace with Resend or similar when RESEND_API_KEY is set)
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "portfolio@saiimmani.dev",
          to: ["srisatyasaiimmani@gmail.com"],
          subject: `Portfolio contact from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        }),
      })

      if (!res.ok) {
        return { success: false, error: "Failed to send message. Please try again." }
      }
    } catch {
      return { success: false, error: "Network error. Please try again." }
    }
  } else {
    // Development fallback
    console.log("[Contact Form]", { name, email, message })
  }

  return { success: true }
}
