{ pkgs, lib, ... }:
let
  # Prebuilt release binary (Rust, egui + wgpu): no compilation, only patchelf.
  subcraft = pkgs.stdenv.mkDerivation (finalAttrs: {
    pname = "subcraft";
    version = "0.2.0";

    src = pkgs.fetchurl {
      url = "https://github.com/Aalzard/subcraft/releases/download/v${finalAttrs.version}/SubCraft-${finalAttrs.version}-linux-x86_64.tar.gz";
      hash = "sha256-zaV7l3WQhh4/RodZnh+Q7UU/bnST97UN7yZaN2tH5Og=";
    };

    nativeBuildInputs = [ pkgs.autoPatchelfHook ];

    # Linked at build time: libgcc_s, libc, libm.
    buildInputs = [ pkgs.stdenv.cc.cc.lib ];

    # Loaded via dlopen at runtime: added to the binary's RUNPATH.
    runtimeDependencies = with pkgs; [
      vulkan-loader
      wayland
      libxkbcommon
      libGL
      dbus
      libX11
      libXcursor
      libXi
      libxcb
    ];

    dontConfigure = true;
    dontBuild = true;
    dontStrip = true;

    installPhase = ''
      runHook preInstall
      install -Dm755 subcraft $out/bin/subcraft
      install -Dm644 subcraft.png $out/share/icons/hicolor/256x256/apps/subcraft.png
      install -Dm644 subcraft.desktop $out/share/applications/subcraft.desktop
      runHook postInstall
    '';

    meta = {
      description = "Paint PBR textures directly on 3D models";
      homepage = "https://github.com/Aalzard/subcraft";
      license = with lib.licenses; [
        mit
        asl20
      ];
      sourceProvenance = [ lib.sourceTypes.binaryNativeCode ];
      platforms = [ "x86_64-linux" ];
      mainProgram = "subcraft";
    };
  });
in
{
  environment.systemPackages = [ subcraft ];
}
