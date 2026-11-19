#!/usr/bin/env bash
# Подтягивает в sources.json последние СТАБИЛЬНЫЕ релизы с GitHub.
# /releases/latest отдаёт последний релиз без draft и prerelease.
# Новый релиз → новые version/tag/hash → у деривации новый хэш в /nix/store.
# После запуска: sudo nixos-rebuild switch --flake ~/nixos-config#nixos
set -euo pipefail

json="$(cd "$(dirname "$0")" && pwd)/sources.json"
tmp=$(mktemp)
trap 'rm -f "$tmp"' EXIT

for name in $(jq -r 'keys[]' "$json"); do
  repo=$(jq -r --arg n "$name" '.[$n].repo' "$json")
  asset=$(jq -r --arg n "$name" '.[$n].asset' "$json")
  cur=$(jq -r --arg n "$name" '.[$n].version' "$json")

  tag=$(curl -fsSL "https://api.github.com/repos/$repo/releases/latest" | jq -r .tag_name)
  ver=${tag#v}

  if [[ "$ver" == "$cur" ]]; then
    echo "$name: $cur — актуально"
    continue
  fi

  url="https://github.com/$repo/releases/download/$tag/${asset//\{version\}/$ver}"
  hash=$(nix store prefetch-file --json --hash-type sha256 "$url" | jq -r .hash)

  jq --arg n "$name" --arg v "$ver" --arg t "$tag" --arg h "$hash" \
    '.[$n] += {version: $v, tag: $t, hash: $h}' "$json" >"$tmp"
  cp "$tmp" "$json"
  echo "$name: $cur → $ver"
done
