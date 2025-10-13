#!/usr/bin/env bash
set -euo pipefail

# check-auth-appcheck.sh
# Usage:
#   ./check-auth-appcheck.sh
# Optional env overrides:
#   API_KEY, EMAIL, PASSWORD, APP_CHECK_TOKEN
#
# Purpose:
#   - Try to create a user via the public Auth REST endpoint WITHOUT App Check header.
#   - If you provide APP_CHECK_TOKEN, retry WITH the header and report results.

API_KEY="${API_KEY:-AIzaSyBOtM0OkuE-PPueNeidkfBHh0a-pYR255k}"
EMAIL="${EMAIL:-testing15687683@gmail.com}"
PASSWORD="${PASSWORD:-TESTING}"
APP_CHECK_TOKEN="${APP_CHECK_TOKEN:-}"   # paste appcheck token here
TIMEOUT=15

# helper: pretty print result & cleanup
do_signup() {
  local token_header="$1"   # empty => no header, else the token
  local out
  out="$(mktemp)"
  local curl_cmd=(curl -sS -o "$out" -w "%{http_code}" -X POST
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}"
    -H "Content-Type: application/json"
    --max-time "$TIMEOUT"
    -d "{\"email\":\"${EMAIL}\",\"password\":\"${PASSWORD}\",\"returnSecureToken\":true}"
  )

  if [[ -n "$token_header" ]]; then
    curl_cmd+=( -H "X-Firebase-AppCheck: ${token_header}" )
  fi

  local http
  http="$("${curl_cmd[@]}")" || http="$?"   # capture exit on failure
  printf "%s %s\n" "$http" "$out"
}

print_response_snippet() {
  local code="$1"; local file="$2"
  echo "HTTP $code"
  if [[ -s "$file" ]]; then
    echo "---- response (first 800 chars) ----"
    head -c 800 "$file" || true
    echo
    echo "-------------------------------------"
  else
    echo "(empty response)"
  fi
}

# Test 1: without App Check header
echo
printf '=%.0s' {1..60}; echo
echo "Test A: sign-up WITHOUT App Check header (attacker-like request)"
read -r HTTP OUTFILE < <(do_signup "")
print_response_snippet "$HTTP" "$OUTFILE"

# Analyze response for evidence of App Check enforcement
if [[ "$HTTP" == "401" ]]; then
  if grep -qi "app check" "$OUTFILE" || grep -qi "Firebase App Check token is invalid" "$OUTFILE" || grep -qi "UNAUTHENTICATED" "$OUTFILE"; then
    echo
    echo "RESULT: DETECTED — Auth endpoint is rejecting unauthenticated requests with an App Check-related 401."
    echo "Interpretation: App Check enforcement for Authentication is likely ENABLED for this project."
  else
    echo
    echo "RESULT: 401 returned but response did not clearly reference App Check."
    echo "Inspect the response above — it may be a different auth-related block (API key invalid, project disabled, etc.)."
  fi
elif [[ "$HTTP" == "200" || "$HTTP" == "201" ]]; then
  echo
  echo "RESULT: SIGN-UP SUCCEEDED WITHOUT APP CHECK."
  echo "Interpretation: App Check is NOT blocking public sign-up in this project (attacker could create accounts with just the API key)."
else
  echo
  echo "RESULT: HTTP $HTTP (not 200/201/401)."
  echo "Interpretation: Could be rate-limiting, API key invalid, project settings, or other issue. Inspect response above."
fi

# Clean up
rm -f "$OUTFILE"

# Test 2: with App Check token (optional)
if [[ -n "${APP_CHECK_TOKEN}" ]]; then
  echo
  printf '=%.0s' {1..60}; echo
  echo "Test B: sign-up WITH provided App Check token (will attempt to use it)"
  read -r HTTP2 OUTFILE2 < <(do_signup "$APP_CHECK_TOKEN")
  print_response_snippet "$HTTP2" "$OUTFILE2"

  if [[ "$HTTP2" == "200" || "$HTTP2" == "201" ]]; then
    echo
    echo "RESULT: SIGN-UP SUCCEEDED WITH APP CHECK token."
    echo "Interpretation: Provided token was accepted by Auth endpoint (positive test)."
  elif [[ "$HTTP2" == "401" ]]; then
    echo
    echo "RESULT: 401 even with provided token — token likely invalid/expired/not registered for this project."
    echo "If you used a debug token, ensure it was registered in the Firebase Console for this app. If you used a real token, fetch a fresh one from the running client via getToken(appCheck, true)."
  else
    echo
    echo "RESULT: HTTP $HTTP2 (unexpected). Inspect the response above for clues."
  fi

  rm -f "$OUTFILE2"
else
  echo
  printf '=%.0s' {1..60}; echo
  echo "Skipping Test B: No APP_CHECK_TOKEN provided. To confirm positive path, set APP_CHECK_TOKEN to a fresh token and re-run:"
  echo "  APP_CHECK_TOKEN=\"<paste-token-here>\" ./check-auth-appcheck.sh"
  echo "To get a fresh token from your app, run getToken(appCheck, true) in the browser client and copy the printed token."
fi

echo
echo "DONE. Notes:"
echo " - If Test A returned 401 with 'Firebase App Check token is invalid', then App Check enforcement for Auth is enabled — your previous curl behavior matches that."
echo " - If Test A returned success (200/201), App Check is not blocking public sign-up; you should implement server-side gating as discussed earlier."

