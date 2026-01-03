
import { Device } from '@twilio/voice-sdk';

const API = "http://localhost:5000";
let device = null;
let activeConnection = null;

// Fetch Twilio Access Token from backend
export const fetchTwilioToken = async (identity = undefined) => {
  const res = await fetch(`${API}/twilio/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity })
  });
  if (!res.ok) throw new Error('Failed to fetch Twilio token');
  return res.json();
};

// Initialize Twilio.Device and start call to SIP domain
export const startWebCall = async () => {
  const { token } = await fetchTwilioToken();

  if (!device) {
    device = new Device(token, {
      codecPreferences: ["opus", "pcmu"],
      enableRingingState: true,
      debug: true,
    });

    device.on("ready", () => console.log("✅ Device ready"));
    device.on("connect", () => console.log("📞 Call connected"));
    device.on("disconnect", () => console.log("📴 Call disconnected"));
    device.on("error", (e) => console.error("❌ Twilio error", e));

    await device.register(); // 🔥 REQUIRED
  } else {
    await device.updateToken(token);
  }

  console.log("📡 Connecting to SIP...");

  activeConnection = await device.connect({
    To: "sip:ai-dco-assistant@ai-dco-assistant.sip.twilio.com",
  });

  return activeConnection;
};



// End the current call and disconnect device
export const endWebCall = async () => {
  if (activeConnection) {
    activeConnection.disconnect();
    activeConnection = null;
  }
  if (device) {
    device.disconnectAll();
    device.destroy();
    device = null;
  }
  // Optionally notify backend
  await fetch(`${API}/sip/call/end`, { method: 'POST' });
};

// Toggle microphone
export const toggleMic = (on) => {
  if (activeConnection) {
    activeConnection.mute(!on);
  }
};

// Toggle speaker (browser output)
export const toggleSpeaker = (on) => {
  if (device) {
    device.audio.speakerDevices.set(on ? 'default' : null);
  }
};
