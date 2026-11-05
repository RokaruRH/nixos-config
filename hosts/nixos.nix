{ ... }:
{
  imports = [
    ../modules/core.nix
    ../modules/networking.nix
    ../modules/users.nix
    ../modules/plasma.nix
    ../modules/gaming.nix
    ../modules/fonts.nix
    ../modules/apps.nix
    ../modules/optfine.nix
    ../modules/armorpaint.nix
    ../modules/lemon-studio.nix

    ./hardware-configuration.nix
  ];
}
