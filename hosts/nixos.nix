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
    ../modules/unreal.nix
    ../modules/armorpaint.nix

    ./hardware-configuration.nix
  ];
}
