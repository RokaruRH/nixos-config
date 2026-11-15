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

  # Политики Chrome → /etc/opt/chrome/policies/managed/extra.json
  programs.chromium = {
    enable = true;
    extraOpts = {
      # 1 = не скачивать локальную ИИ-модель (OptGuideOnDeviceModel, ~4 ГБ) и удалить уже скачанную
      GenAILocalFoundationalModelSettings = 1;
    };
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
    devenv # dev-окружения проектов (Techno-Studio-Lite)
    obsidian
    glib # даёт `gio` — им Electron (Obsidian) переносит файлы в корзину
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
