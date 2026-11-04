{ pkgs, lib, ... }:
let
  # Prebuilt release binary (Rust, parametric CAD): no compilation, only patchelf.
  solidcraft = pkgs.stdenv.mkDerivation (finalAttrs: {
    pname = "solidcraft";
    version = "0.30.1";

    src = pkgs.fetchurl {
      url = "https://github.com/tangency-labs/solidcraft/releases/download/v${finalAttrs.version}/solidcraft-${finalAttrs.version}-linux-x86_64.tar.gz";
      hash = "sha256-K+FjxhjnzNlSPZl+vZ9QlMMQ6WioBWCyhA2x4ajA1II=";
    };

    nativeBuildInputs = [ pkgs.autoPatchelfHook ];

    # Linked at build time: libgcc_s, libc, libm.
    buildInputs = [ pkgs.stdenv.cc.cc.lib ];

    # Loaded via dlopen at runtime: added to the binaries' RUNPATH.
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
      mkdir -p $out
      cp -r bin share $out/
      runHook postInstall
    '';

    meta = {
      description = "Parametric 3D CAD";
      homepage = "https://github.com/tangency-labs/solidcraft";
      license = with lib.licenses; [
        mit
        asl20
      ];
      sourceProvenance = [ lib.sourceTypes.binaryNativeCode ];
      platforms = [ "x86_64-linux" ];
      mainProgram = "solidcraft";
    };
  });
in
{
  environment.systemPackages = [ solidcraft ];
}
