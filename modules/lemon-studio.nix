{ pkgs, lib, ... }:
let
  # Lemon Studio — DAW на Rust, сборка из исходников (бинарников upstream не публикует).
  lemon-studio = pkgs.rustPlatform.buildRustPackage {
    pname = "lemon-studio";
    version = "0.0.1-unstable-e7581d5";

    src = pkgs.fetchFromGitHub {
      owner = "ItsAlphaNeon";
      repo = "Lemon-Studio";
      rev = "e7581d545f0a1e6d7b02da289564d88b73cc0ef0";
      hash = "sha256-ZROcwSFhxwFel0AsoBDtQBg8sDLIogT5yvlzIbMRqLE=";
    };

    cargoHash = "sha256-QGlajXUqi1uOwa0ReLmwcKO/mWglvWY2DBCA03mJOx8=";

    # Только само приложение (плагины встроены в него).
    cargoBuildFlags = [ "-p" "os-app" ];
    doCheck = false;

    nativeBuildInputs = with pkgs; [
      pkg-config
      rustPlatform.bindgenHook
      patchelf
    ];

    buildInputs = with pkgs; [
      alsa-lib
      libjack2
      wayland
      libxkbcommon
      libx11
    ];

    # winit/softbuffer подгружают X11/Wayland/xkbcommon через dlopen.
    postFixup = ''
      patchelf --add-rpath ${
        lib.makeLibraryPath (
          with pkgs;
          [
            libx11
            libxcursor
            libxrandr
            libxi
            libxext
            libxkbcommon
            wayland
            libjack2
          ]
        )
      } $out/bin/lemonstudio
    '';

    postInstall = ''
      install -Dm644 crates/os-app/assets/lemonstudio.png $out/share/icons/hicolor/256x256/apps/lemonstudio.png
      install -Dm644 crates/os-app/assets/lemonstudio.desktop $out/share/applications/lemonstudio.desktop
    '';

    meta = {
      description = "Pattern-based digital audio workstation written in Rust";
      homepage = "https://github.com/ItsAlphaNeon/Lemon-Studio";
      license = lib.licenses.gpl3Plus;
      mainProgram = "lemonstudio";
      platforms = [ "x86_64-linux" ];
    };
  };
in
{
  environment.systemPackages = [ lemon-studio ];
}
