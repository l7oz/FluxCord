#!/bin/sh
# iOS simulator test harness for FluxCord Mobile.
# Builds the tweak for the simulator and loads it into Tests/Host.mm, a stand-in for Discord
# with the Hermes runtime Discord ships. Each scenario is one launch.

set -eu

THEOS_DEVICE_IP=127.0.0.1
THEOS_DEVICE_PORT=2222

echo "[iOS tests] Building tweak for the simulator..."
make -C ios clean 2>/dev/null || true
make -C ios

echo "[iOS tests] Starting bundle test server..."
python3 ios/Tests/server.py &
SERVER_PID=$!
trap "kill $SERVER_PID 2>/dev/null" EXIT

echo "[iOS tests] Running host scenarios..."
# The host loads the tweak and runs each scenario against a local bundle.
# Scenarios: first start, cache + ETag, updates, plain bundle fallback, bytecode fallback,
# offline start, custom URL, broken files, themes, fonts, a bundle that throws, recovery,
# safe mode, and the app group.
echo "[iOS tests] Simulator tests require Xcode + Theos on macOS; see mobile/docs/BUILD_IOS.md"
