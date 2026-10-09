# Unreal Engine 5.7.4

`../Unreal.nix` is imported by `../main.nix`. It manages the existing
installation's launcher, native library environment, `unreal-editor` command
and KDE desktop entry. The engine and projects remain outside the Nix store.

The launcher uses XWayland (`SDL_VIDEO_DRIVER=x11` and
`SDL_VIDEODRIVER=x11`) only for Unreal. Slate tooltips are disabled to avoid
the UE 5.7 Linux focus/click issue. The editor is capped at 30 FPS, with Low
scalability enabled by default. `UE_LOW_SPEC=0 unreal-editor` removes the
scalability and integrated-GPU overrides while retaining XWayland, the tooltip workaround and
the FPS cap. Shader compilation and C++ build limits are retained.

For the Ryzen 5 5600G's integrated Radeon, the default profile explicitly
requests Vulkan SM5 and disables Lumen GI/reflections, ray tracing/proxies,
virtual shadow maps, Nanite and mesh distance-field generation before the
renderer starts. These launch overrides do not change a project's saved
rendering settings or packaging targets. Projects intended for this hardware
should also target `SF_VULKAN_SM5` in their Linux project settings for packaging.

Launch from the existing KDE entry or run:

```sh
~/.local/bin/unreal-editor
~/.local/bin/unreal-editor '/absolute/path/My Game/My Game.uproject'
```

Library paths are declared in `Unreal.nix`; they no longer depend on the
Chrome wrapper. The AMD Vulkan driver comes from `/run/opengl-driver`.
The existing system `programs.nix-ld.enable` remains required.

Apply future changes with the usual NixOS rebuild. For an unstaged checkout,
use the path flake to include new files:

```sh
sudo nixos-rebuild switch --flake path:/home/rokaru/nixos-config#nixos
```

The initial setup installed only the four Unreal launcher files from a
successfully built Home Manager generation. It did not switch the full
system or activate other Home Manager changes. That generation is rooted at
`~/.local/state/unreal-launcher-generation`. Previous launcher files are in
`~/.local/share/UnrealEngine/unreal-tools/launcher-backup-20261010-002759/`.

Startup log:
`~/.local/share/UnrealEngine/unreal-tools/logs/UnrealEditor.log`.
Look for `Using SDL video driver 'x11'`, `Slate.EnableTooltips = "false"`
and `t.MaxFPS = "30"` to verify the settings were used.

Before launch or build, `fix-shell-shebangs.sh` changes only the first line
of Epic's Bash scripts under `Engine/Build/BatchFiles` from `#!/bin/bash`
to `#!/usr/bin/env bash`. This fixes Unreal's direct spawning of Build.sh
and RunUAT.sh on NixOS. Originals are retained under
`unreal-tools/shell-script-backups`; script bodies and binary libraries are
not changed. The helper also handles scripts restored by a future reinstall.

Epic documents the native Wayland input limitation:
https://dev.epicgames.com/documentation/en-us/unreal-engine/updating-unreal-engine-on-linux-to-sdl3
