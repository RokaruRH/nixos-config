#!/usr/bin/env bash
# NixOS has /usr/bin/env, but no /bin/bash. Preserve vendor script bodies.
set -euo pipefail
engine=${1:?Expected Unreal Engine directory}
backup=${2:?Expected backup directory}
batch_files="$engine/Engine/Build/BatchFiles"
[[ -d "$batch_files" ]] || exit 0
while IFS= read -r -d '' script; do
    IFS= read -r first_line < "$script" || continue
    [[ "$first_line" == '#!/bin/bash' ]] || continue
    relative=${script#"$batch_files/"}
    original="$backup/$relative"
    mkdir -p -- "$(dirname -- "$original")"
    [[ -e "$original" ]] || cp -p -- "$script" "$original"
    # Replace atomically, without changing any other hard-linked copy.
    temporary=$(mktemp "$(dirname -- "$script")/.nixos-shebang.XXXXXX")
    trap '[[ -z "${temporary:-}" ]] || rm -f -- "$temporary"' EXIT
    sed '1s|^#!/bin/bash$|#!/usr/bin/env bash|' "$script" > "$temporary"
    chmod --reference="$script" "$temporary"
    mv -f -- "$temporary" "$script"
    temporary=''
    printf 'NixOS shell compatibility: %s\n' "$relative"
done < <(find "$batch_files" -type f -name '*.sh' -print0)
