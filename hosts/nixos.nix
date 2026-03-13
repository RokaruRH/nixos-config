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

    ./hardware-configuration.nix
  ];
}
