{ pkgs, ... }:
{
  programs.nix-ld = {
    enable = true;
    # libraries = pkgs.steam-run.args.multiPkgs pkgs;
    libraries = [ ];
  };

  environment.systemPackages = with pkgs; [
    google-chrome
    obs-studio

    neovim
    zed-editor

    alacritty
    zellij
    starship

    git
    lazygit

    blender
    godot

    openssh
    devenv

    nixd
    nixfmt
  ];
}
