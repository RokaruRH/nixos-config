{
  config,
  lib,
  username,
  ...
}:
let
  home_dots = "${config.home.homeDirectory}/nixos-config/home";

  home_dots_symlinks = {
    "fish/config.fish" = ".config/fish/config.fish";
    "fish/functions" = ".config/fish/functions";
  };

  mkHomeDotsLinks = lib.mapAttrs' (src: target: {
    name = target;
    value.source = config.lib.file.mkOutOfStoreSymlink "${home_dots}/${src}";
  }) home_dots_symlinks;
in
{
  imports = [
    ./alacritty.nix
    ./btop.nix
  ];

  home.username = username;
  home.homeDirectory = "/home/${username}";
  home.stateVersion = "25.11";

  home.file = mkHomeDotsLinks;
}
