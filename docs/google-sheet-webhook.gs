/**
 * Texiri website → Google Sheet log
 *
 * Appends one row per form submission to a tab named after the form
 * ("enquiry", "community" or "shambhavi"). The tab and its header row are
 * created automatically the first time that form is submitted.
 *
 * SETUP
 * 1. Create a Google Sheet with a company Google account.
 * 2. Extensions → Apps Script. Delete the sample code and paste this file.
 * 3. Project Settings (gear icon) → Script Properties → Add property:
 *      Name:  WEBHOOK_SECRET
 *      Value: a long random string (e.g. from `openssl rand -hex 32`)
 * 4. Deploy → New deployment → type "Web app".
 *      Execute as:      Me
 *      Who has access:  Anyone
 *    Authorise when asked, then copy the web-app URL.
 * 5. In Vercel, set SHEETS_WEBHOOK_URL to that URL and SHEETS_WEBHOOK_SECRET
 *    to the same secret as step 3.
 *
 * "Anyone" access is needed so the website can post without a Google login.
 * Requests without the correct secret are rejected and nothing is written.
 * After editing this script, use Deploy → Manage deployments → Edit → New
 * version, so the URL stays the same.
 */

const ALLOWED_FORMS = ["enquiry", "community", "shambhavi"];

function doPost(e) {
  let body;
  try {
    body = JSON.parse(e.postData.contents);
  } catch (err) {
    return reply({ ok: false, error: "invalid-json" });
  }

  const secret = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
  if (!secret || body.secret !== secret) return reply({ ok: false, error: "unauthorised" });
  if (ALLOWED_FORMS.indexOf(body.form) === -1) return reply({ ok: false, error: "unknown-form" });

  const fields = body.fields || {};
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = book.getSheetByName(body.form) || book.insertSheet(body.form);

    // Header row: "receivedAt" first, then field names in the order first seen.
    let headers = sheet.getLastRow() > 0 ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    if (headers.length === 0) headers = ["receivedAt"];
    Object.keys(fields).forEach(function (k) {
      if (headers.indexOf(k) === -1) headers.push(k);
    });
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sheet.setFrozenRows(1);

    const row = headers.map(function (h) {
      if (h === "receivedAt") return new Date();
      const v = fields[h];
      if (v === undefined || v === null) return "";
      // Stop spreadsheet formula injection (values starting with = + - @).
      const s = String(v);
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    });
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
  return reply({ ok: true });
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
