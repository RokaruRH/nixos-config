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
    plasticity

  #Soc Media
    google-chrome
    telegram-desktop

  #Game Engine
    #unityhub


  #code editor
    zed-editor
    agent-browser
    obsidian
    claude-code

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
