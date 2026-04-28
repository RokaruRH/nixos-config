{ pkgs, ... }:
{
  programs.nix-ld = {
    enable = true;
    # libraries = pkgs.steam-run.args.multiPkgs pkgs;
    libraries = [ ];
  };

  environment.systemPackages = with pkgs; [
    # ...

    # support both 32-bit and 64-bit applications
    wineWow64Packages.stable
    # winetricks (all versions)
    winetricks
    # native wayland support (unstable)
    wineWow64Packages.waylandFull
  ];
}
