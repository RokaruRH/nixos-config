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

    fzf
    jq
    ripgrep
    zoxide
    eza
    fd
    bat

    git
    delta
    lazygit

    blender
    godot

    openssh
    devenv

    nixd
    nixfmt
  ];
}
