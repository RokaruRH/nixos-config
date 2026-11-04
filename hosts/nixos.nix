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
    ../modules/subcraft.nix

    ./hardware-configuration.nix
  ];
}
