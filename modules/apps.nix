{ pkgs, ... }:
{

  programs.nix-ld = {
    enable = true;
    # libraries = pkgs.steam-run.args.multiPkgs pkgs;
    libraries = [ ];
  };

  nixpkgs.config.permittedInsecurePackages = [
    "ventoy-1.1.12"
  ];

  environment.systemPackages = with pkgs; [
    google-chrome
    obs-studio
    telegram-desktop

    neovim

    pureref


    zed-editor
    opencode

    #Game Engine
    godot

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
    dust


    rustup
    gcc

    git
    delta
    lazygit

    blender


    obsidian
    gimp
    aseprite


    openssh
    devenv

    nixd
    nixfmt
    #music
    lmms

  ];
}
