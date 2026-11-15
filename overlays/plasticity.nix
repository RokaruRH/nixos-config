# Plasticity 26.2.6 из официального RPM, без правок бинарника.
#
# Пакет из nixpkgs (26.2.x) падает на старте: renderer SIGSEGV в V8.
# Проверено локально: падает и с patchelf'нутым бинарником, и с оригинальным
# вне FHS; работает только оригинальный бинарник внутри steam-run.
# Поэтому: RPM распаковывается как есть (dontFixup — без patchelf/strip),
# запуск через steam-run + библиотеки, которых нет в steam-run (nss, nspr…).
# libglvnd — чтобы ANGLE нашёл libEGL.so.1 (nixpkgs issue #564093).
final: prev:
let
  libs = with final; [
    systemdLibs
    libglvnd
    vulkan-loader
    libx11
    libxcb
    libxcomposite
    libxdamage
    libxext
    libxfixes
    libxrandr
    libxtst
    glib
    nspr
    nss
    at-spi2-core
    cups
    dbus
    cairo
    gtk3
    pango
    libgbm
    expat
    libxkbcommon
    alsa-lib
  ];
in
{
  plasticity = final.stdenvNoCC.mkDerivation rec {
    pname = "plasticity";
    version = "26.2.6";

    src = final.fetchurl {
      url = "https://github.com/nkallen/plasticity/releases/download/v${version}/Plasticity-${version}-1.x86_64.rpm";
      hash = "sha256-MWW00vmOoKdooYOSTK0ZpuWfFDORxcBk8tKa2wzG1qw=";
    };

    nativeBuildInputs = [ final.rpmextract ];
    dontUnpack = true;
    dontFixup = true;

    installPhase = ''
      runHook preInstall

      mkdir -p $out/opt
      cd $out/opt
      rpmextract $src
      mv usr/lib/Plasticity $out/lib-plasticity
      mkdir -p $out/share
      mv usr/share/applications usr/share/pixmaps $out/share/
      rm -rf $out/opt
      mkdir -p $out/lib && mv $out/lib-plasticity $out/lib/Plasticity

      mkdir -p $out/bin
      cat > $out/bin/Plasticity <<EOF
      #!${final.runtimeShell}
      export LD_LIBRARY_PATH="${final.lib.makeLibraryPath libs}\''${LD_LIBRARY_PATH:+:\$LD_LIBRARY_PATH}"
      exec ${final.steam-run}/bin/steam-run $out/lib/Plasticity/Plasticity "\$@"
      EOF
      chmod +x $out/bin/Plasticity

      runHook postInstall
    '';

    meta = prev.plasticity.meta // {
      mainProgram = "Plasticity";
    };
  };
}
