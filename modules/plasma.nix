{ lib, ... }:
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
}
