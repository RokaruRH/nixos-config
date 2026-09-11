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
    obsidian
    gimp
    aseprite


    openssh
    devenv

    nixd
    nixfmt

    #music
    lmms
    # support both 32-bit and 64-bit applications
    #wineWow64Packages.stable
    # winetricks (all versions)
    #winetricks
    # native wayland support (unstable)
    #wineWow64Packages.waylandFull

    # support 64-bit only
    #wine64

  ];
}
