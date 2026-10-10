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
    pkgs.opencode

    #Game Engine

    obsidian
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

    git
    delta
    lazygit

    blender

    gimp
    aseprite

    openssh

    nixd
    nixfmt
  ];
}
