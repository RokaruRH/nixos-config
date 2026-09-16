{
  pkgs,
  lib,
  inputs,
  ...
}:
let
  armorpaint = pkgs.stdenv.mkDerivation (finalAttrs: {
    pname = "armorpaint";
    version = "1.0-unstable-2026-09-14";

    src = lib.cleanSourceWith {
      src = inputs.armorpaint;
      filter =
        path: type:
        (lib.cleanSourceFilter path type) && (baseNameOf (toString path)) != "build";
    };

    nativeBuildInputs = with pkgs; [
      clang
      gnumake
      git
      pkg-config
      patchelf
      wrapGAppsHook3
      makeWrapper
      copyDesktopItems
    ];

    buildInputs = with pkgs; [
      gtk3
      gdk-pixbuf
      gsettings-desktop-schemas
      xorg.libX11
      xorg.libXi
      xorg.libXcursor
      xorg.libXrandr
      openssl
      vulkan-loader
      vulkan-headers
      alsa-lib
    ];

    dontConfigure = true;

    preBuild = ''
      patchelf \
        --set-interpreter "${pkgs.glibc}/lib/ld-linux-x86-64.so.2" \
        --set-rpath "${pkgs.glibc}/lib" \
        base/tools/bin/linux_x64/amake

      export NIX_CFLAGS_COMPILE="$NIX_CFLAGS_COMPILE $(pkg-config --cflags gtk+-3.0)"
    '';

    buildPhase = ''
      runHook preBuild
      cd paint
      bash ../base/make --compile
      cd ..
      runHook postBuild
    '';

    installPhase = ''
      runHook preInstall
      mkdir -p $out/bin
      cp -r paint/build/out/. $out/bin/
      rm -f $out/bin/readme.txt
      ln -sf ArmorPaint $out/bin/armorpaint

      mkdir -p $out/share/icons/hicolor/256x256/apps
      cp paint/icon.png $out/share/icons/hicolor/256x256/apps/armorpaint.png
      runHook postInstall
    '';

    desktopItems = [
      (pkgs.makeDesktopItem {
        name = "armorpaint";
        desktopName = "ArmorPaint";
        exec = "armorpaint %F";
        icon = "armorpaint";
        comment = "3D PBR texture painting software";
        categories = [
          "Graphics"
          "3DGraphics"
        ];
        mimeTypes = [
          "model/gltf-binary"
          "model/gltf+json"
          "model/obj"
          "model/fbx"
        ];
      })
    ];

    meta = {
      description = "3D PBR texture painting software";
      homepage = "https://armorpaint.org";
      license = lib.licenses.zlib;
      platforms = [ "x86_64-linux" ];
      mainProgram = "armorpaint";
    };
  });
in
{
  environment.systemPackages = [ armorpaint ];
}
