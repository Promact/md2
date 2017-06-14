#!/usr/bin/env bash

is_lint() {
  [[ "$MODE" = lint ]]
}

is_aot() {
  [[ "$MODE" = aot ]]
}

is_payload() {
  [[ "$MODE" = payload ]]
}
