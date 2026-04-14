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
    telegram-desktop

    neovim

    pureref

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
    aseprite
    obsidian
    krita
    unityhub
    lmms

    openssh
    devenv

    nixd
    nixfmt
  ];
}
