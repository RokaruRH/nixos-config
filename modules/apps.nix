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
    lmms-full
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
