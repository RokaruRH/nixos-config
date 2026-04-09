{ pkgs, ... }:
{
  programs.steam = {
    enable = true;
    extraCompatPackages = with pkgs; [
      proton-ge-bin
    ];
  };

  # -------------- windows support
  # winetricks
  # wineWow64Packages.stable
  # wineWow64Packages.waylandFull
  # bottles
  # ----------------------------------

  # https://github.com/ElyPrismLauncher/ElyPrismLauncher

}
