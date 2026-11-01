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

  #video reactor
    obs-studio

  # Art
    pureref
    blender
    aseprite
    gimp
    blockbench
    # 26.2.0 из nixpkgs падает при старте (renderer SIGSEGV), 26.1.4 работает.
    # Убрать override, когда в nixpkgs выйдет рабочая версия.
    (plasticity.overrideAttrs (old: rec {
      version = "26.1.4";
      src = fetchurl {
        url = "https://github.com/nkallen/plasticity/releases/download/v${version}/Plasticity-${version}-1.x86_64.rpm";
        sha256 = "1ic885yff5iabknl8difjjqqaxirwzzfdrarwacgpbiwb794b855";
      };
    }))

  #Soc Media
    google-chrome
    telegram-desktop

  #Game Engine
    godot
    #unityhub

  #code editor
    zed-editor
    obsidian
    claude-code
    python3 # Obsidian-плагин Claude Sidebar: терминал через python pty

  #Git and remote safe
    git
    lazygit
    openssh

  #terminal
   alacritty

  #Other
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
    delta
    nixd
    nixfmt
  ];
}
