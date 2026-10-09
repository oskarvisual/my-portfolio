#!/usr/bin/env bash

# ==============================================================================
# Sync Local Videos to DigitalOcean Spaces with Global CDN & 1-Year Cache
# ==============================================================================

set -e

# Load .env file if it exists locally
if [ -f .env ]; then
  # Export variables from .env ignoring comments and empty lines
  export $(grep -v '^#' .env | grep -v '^$' | xargs)
fi

# Validation of required variables
if [ -z "$DO_SPACES_KEY" ] || [ -z "$DO_SPACES_SECRET" ] || [ -z "$DO_SPACES_BUCKET" ]; then
  echo "❌ Error: Missing DigitalOcean Spaces credentials."
  echo "Please make sure DO_SPACES_KEY, DO_SPACES_SECRET, and DO_SPACES_BUCKET are defined in your .env file or environment."
  exit 1
fi

DO_SPACES_REGION="${DO_SPACES_REGION:-nyc3}"
DO_SPACES_DEST_DIR="${DO_SPACES_DEST_DIR:-my-portfolio/videos}"

# Strip leading and trailing slashes from destination directory
DO_SPACES_DEST_DIR=$(echo "$DO_SPACES_DEST_DIR" | sed -e 's/^\///' -e 's/\/$//')

ENDPOINT_URL="https://${DO_SPACES_REGION}.digitaloceanspaces.com"
DEST_URI="s3://${DO_SPACES_BUCKET}/${DO_SPACES_DEST_DIR}"
CDN_URL="https://${DO_SPACES_BUCKET}.${DO_SPACES_REGION}.cdn.digitaloceanspaces.com/${DO_SPACES_DEST_DIR}"

echo "🚀 Starting DigitalOcean Spaces Sync..."
echo "  • Bucket:      ${DO_SPACES_BUCKET}"
echo "  • Region:      ${DO_SPACES_REGION}"
echo "  • Destination: ${DO_SPACES_DEST_DIR}"
echo "  • Endpoint:    ${ENDPOINT_URL}"
echo "  • CDN Base:    ${CDN_URL}"
echo "  • Cache:       public, max-age=31536000, immutable"
echo "--------------------------------------------------------"

# Sync only new or updated files
AWS_ACCESS_KEY_ID="${DO_SPACES_KEY}" \
AWS_SECRET_ACCESS_KEY="${DO_SPACES_SECRET}" \
aws s3 sync src/assets/videos "${DEST_URI}" \
  --endpoint-url "${ENDPOINT_URL}" \
  --acl public-read \
  --cache-control "public, max-age=31536000, immutable"

echo "--------------------------------------------------------"
echo "✅ Videos successfully synced to DigitalOcean Spaces!"
echo "📡 Public CDN Base URL:"
echo "   ${CDN_URL}"
