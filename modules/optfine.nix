{ pkgs, ... }:
let
  blender-gamemode = pkgs.symlinkJoin {
    name = "blender-gamemode";
    paths = [ pkgs.blender ];
    nativeBuildInputs = [ pkgs.makeWrapper ];
    postBuild = ''
      rm $out/bin/blender
      makeWrapper ${pkgs.gamemode}/bin/gamemoderun $out/bin/blender \
        --add-flags ${pkgs.blender}/bin/blender
    '';
  };
in
{
  environment.systemPackages = [ blender-gamemode ];
}
