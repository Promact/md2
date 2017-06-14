#!/usr/bin/env bash
source ./scripts/ci/sources/tunnel.sh

is_lint() {
  [[ "$MODE" = lint ]]
}

is_aot() {
  [[ "$MODE" = aot ]]
}

is_closure_compiler() {
  [[ "$MODE" = closure-compiler ]]
}

is_payload() {
  [[ "$MODE" = payload ]]
}
