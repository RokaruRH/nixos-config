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

  programs.appimage = {
    enable = true;
    binfmt = true;
  };

  environment.systemPackages = with pkgs; [

  #video reactor
    obs-studio

  # Art
    pureref
    blender
    aseprite
    gimp

  #Soc Media
    google-chrome
    telegram-desktop

  #Game Engine
    #unityhub


  #code editor
    zed-editor
    obsidian
    claude-code
    python3 # Obsidian-плагин Claude Sidebar: терминал через python pty

  #Git and remote safe
    git
    git-lfs # большие бинарные файлы (ассеты UE) в git
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
