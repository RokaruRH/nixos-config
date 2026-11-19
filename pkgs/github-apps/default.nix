# AppImage-приложения из GitHub Releases. Версии и хэши — в sources.json,
# обновляются ./update.sh (только стабильные релизы).
{ pkgs, lib }:
let
  sources = lib.importJSON ./sources.json;

  mkApp =
    pname: s:
    let
      inherit (s) version;
      src = pkgs.fetchurl {
        url = "https://github.com/${s.repo}/releases/download/${s.tag}/${
          builtins.replaceStrings [ "{version}" ] [ version ] s.asset
        }";
        inherit (s) hash;
      };
      contents = pkgs.appimageTools.extract { inherit pname version src; };
    in
    pkgs.appimageTools.wrapType2 {
      inherit pname version src;

      # .desktop и иконки из AppImage; Exec= → обёртка из /nix/store
      extraInstallCommands = ''
        install -Dm644 -t $out/share/applications ${contents}/*.desktop
        sed -i -E 's|^Exec=[^ ]+|Exec=${pname}|' $out/share/applications/*.desktop
        if [ -d ${contents}/usr/share/icons ]; then
          cp -r ${contents}/usr/share/icons $out/share/
        fi
      '';

      meta = {
        homepage = "https://github.com/${s.repo}";
        platforms = [ "x86_64-linux" ];
        mainProgram = pname;
      };
    };
in
lib.mapAttrs mkApp sources
