{ lib, pkgs, ... }:
{
  # options picker
  # `bat $(nix-build --no-out-link '<nixpkgs>' -A xkeyboard_config)/share/X11/xkb/rules/base.lst | fzf`
  services.xserver.xkb = {
    layout = "us,ru";
    options = "ctrl:grouptoggle_capscontrol";
  };
  console.useXkbConfig = lib.mkForce true;

  services.displayManager.sddm.enable = true;
  services.desktopManager.plasma6.enable = true;

  # unused KDE apps
  environment.plasma6.excludePackages = with pkgs.kdePackages; [
    konsole
    kate
    okular
    gwenview
    khelpcenter
    qrca
    discover
  ];

  # KMail, Kontact, Merkuro, Akonadi
  programs.kde-pim.enable = false;

  services.xserver.excludePackages = [ pkgs.xterm ];
  documentation.nixos.enable = false;
}
