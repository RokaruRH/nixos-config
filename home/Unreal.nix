{
  config,
  lib,
  pkgs,
  ...
}:
let
  workspace = "${config.home.homeDirectory}/.local/share/UnrealEngine";
  tools = "${workspace}/unreal-tools";
  engine = "${workspace}/UE-5.7.4";
  # Explicit dependencies: launching UE must not depend on Chrome's wrapper.
  runtimeLibraries = with pkgs; [
    stdenv.cc.cc.lib
    glibc
    zlib
    openssl
    icu
    glib
    nss
    nspr
    gtk3
    gtk4
    pango
    gdk-pixbuf
    cairo
    atk
    at-spi2-atk
    at-spi2-core
    alsa-lib
    libpulseaudio
    pipewire
    libva
    libdrm
    libglvnd
    libgbm
    vulkan-loader
    wayland
    libxkbcommon
    libX11
    libXext
    libXi
    libXrandr
    libXcursor
    libXfixes
    libXrender
    libXinerama
    libXcomposite
    libXdamage
    libXtst
    libXScrnSaver
    libxcb
    libxshmfence
    libICE
    libSM
    fontconfig
    freetype
    dbus
    expat
    libpng
    libjpeg
    libuuid
    systemd
  ];
  nativeRuntime = pkgs.writeShellScript "unreal-native-runtime" ''
    set -euo pipefail
    export PATH="${
      lib.makeBinPath [
        pkgs.bash
        pkgs.coreutils
        pkgs.gawk
        pkgs.procps
      ]
    }:$PATH"
    export LD_LIBRARY_PATH="/run/opengl-driver/lib:${lib.makeLibraryPath runtimeLibraries}''${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
    export UnrealBuildTool_BuildConfiguration__bAllowUBAExecutor=false
    export UnrealBuildTool_BuildConfiguration__MaxParallelActions=2
    amd_icd=/run/opengl-driver/share/vulkan/icd.d/radeon_icd.x86_64.json
    if [[ -z "''${VK_DRIVER_FILES:-}" && -z "''${VK_ICD_FILENAMES:-}" && -f "$amd_icd" ]]; then
      export VK_DRIVER_FILES="$amd_icd"
    fi
    exec "$@"
  '';
in
{
  home.file = {
    ".local/share/UnrealEngine/unreal-tools/ue.sh" = {
      source = ./unreal/ue.sh;
      executable = true;
    };
    ".local/share/UnrealEngine/unreal-tools/native-runtime.sh".source = nativeRuntime;
    ".local/share/UnrealEngine/unreal-tools/fix-shell-shebangs.sh" = {
      source = ./unreal/fix-shell-shebangs.sh;
      executable = true;
    };
    ".local/bin/unreal-editor" = {
      executable = true;
      text = ''
        #!${pkgs.bash}/bin/bash
        exec "${tools}/ue.sh" launch "$@"
      '';
    };
  };
  xdg.desktopEntries."unreal-engine-5.7.4" = {
    name = "Unreal Engine 5.7.4";
    comment = "Unreal Editor — XWayland, Blueprint, C++ and Zed";
    exec = ''"${tools}/ue.sh" launch %f'';
    icon = "${engine}/Engine/Source/Runtime/Launch/Resources/Linux/UnrealEngine.png";
    terminal = false;
    startupNotify = false;
    categories = [
      "Development"
      "IDE"
      "Graphics"
    ];
    settings = {
      Path = workspace;
      Keywords = "Unreal;UE;Blueprint;Zed;";
    };
  };
}
