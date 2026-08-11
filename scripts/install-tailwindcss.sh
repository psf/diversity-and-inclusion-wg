#!/usr/bin/env bash
# Downloads the pinned Tailwind CSS standalone CLI (no Node/npm needed) into .bin/,
# verifying it against a checksum pinned below. Bump VERSION and the checksums together
# from https://github.com/tailwindlabs/tailwindcss/releases/download/<VERSION>/sha256sums.txt.
set -euo pipefail

VERSION="v4.3.3"
BIN_DIR=".bin"
BIN_PATH="$BIN_DIR/tailwindcss"

case "$(uname -s)" in
  Linux) OS=linux ;;
  Darwin) OS=macos ;;
  *)
    echo "Unsupported OS: $(uname -s). Download tailwindcss manually: https://github.com/tailwindlabs/tailwindcss/releases/tag/${VERSION}" >&2
    exit 1
    ;;
esac

case "$(uname -m)" in
  x86_64 | amd64) ARCH=x64 ;;
  arm64 | aarch64) ARCH=arm64 ;;
  *)
    echo "Unsupported architecture: $(uname -m)" >&2
    exit 1
    ;;
esac

ASSET="tailwindcss-${OS}-${ARCH}"

case "$ASSET" in
  tailwindcss-linux-arm64) EXPECTED_SHA256=55fd0b241214eff3de1e8ee4f22796662f2d2e7a49bcfca7477cfd0bac398195 ;;
  tailwindcss-linux-x64) EXPECTED_SHA256=dc61b3ac6b8c9ca874c0cc4c57b2409791a64c5540404ca5f5367360babc313a ;;
  tailwindcss-macos-arm64) EXPECTED_SHA256=cdf646702987a743464dff4d9c60fd4480d1c1e73dd819a9a67f1078815dce9d ;;
  tailwindcss-macos-x64) EXPECTED_SHA256=7922e0953f2110c05976e3bf58f14e643d90427575e766b7d433f5f80cbee7e1 ;;
  *)
    echo "No pinned checksum for $ASSET" >&2
    exit 1
    ;;
esac

mkdir -p "$BIN_DIR"
curl -sLo "$BIN_PATH" "https://github.com/tailwindlabs/tailwindcss/releases/download/${VERSION}/${ASSET}"

if command -v sha256sum > /dev/null 2>&1; then
  ACTUAL_SHA256=$(sha256sum "$BIN_PATH" | awk '{print $1}')
else
  ACTUAL_SHA256=$(shasum -a 256 "$BIN_PATH" | awk '{print $1}')
fi

if [ "$ACTUAL_SHA256" != "$EXPECTED_SHA256" ]; then
  echo "Checksum mismatch for $ASSET: expected $EXPECTED_SHA256, got $ACTUAL_SHA256" >&2
  rm -f "$BIN_PATH"
  exit 1
fi

chmod +x "$BIN_PATH"
echo "Installed tailwindcss $VERSION to $BIN_PATH"
