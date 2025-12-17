const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

class GoogleAuth {
  constructor() {
    this.oauth2Client = null;
    this.gmail = null;
    this.calendar = null;
  }

  async initialize() {
    this.oauth2Client = new OAuth2Client({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: 'urn:ietf:wg:oauth:2.0:oob'
    });

    // Set refresh token
    this.oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN
    });

    // Initialize services
    this.gmail = google.gmail({ version: 'v1', auth: this.oauth2Client });
    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });

    console.log('✅ Google Auth initialized');
  }

  async refreshAccessToken() {
    const { credentials } = await this.oauth2Client.refreshAccessToken();
    this.oauth2Client.setCredentials(credentials);
    return credentials.access_token;
  }

  getGmailClient() {
    if (!this.gmail) throw new Error('Gmail not initialized');
    return this.gmail;
  }

  getCalendarClient() {
    if (!this.calendar) throw new Error('Calendar not initialized');
    return this.calendar;
  }
}

module.exports = new GoogleAuth();
