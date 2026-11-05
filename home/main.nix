{
  config,
  lib,
  username,
  ...
}:
let
  home_dots = "${config.home.homeDirectory}/nixos-config/home";

  home_dots_symlinks = {
    "fish/config.fish" = ".config/fish/config.fish";
    "fish/functions" = ".config/fish/functions";

    "zed" = ".config/zed";
    "lazygit" = ".config/lazygit";
    "git/.gitconfig" = ".gitconfig";

    "claude/CLAUDE.md" = ".claude/CLAUDE.md";
    "Agents/skills/context7-mcp" = ".claude/skills/context7-mcp";
    "Agents/skills/plan-task" = ".claude/skills/plan-task";
    "Agents/skills/find-references" = ".claude/skills/find-references";
  };

  mkHomeDotsLinks = lib.mapAttrs' (src: target: {
    name = target;
    value.source = config.lib.file.mkOutOfStoreSymlink "${home_dots}/${src}";
  }) home_dots_symlinks;
in
{
  imports = [
    ./alacritty.nix
    ./btop.nix
  ];

  home.username = username;
  home.homeDirectory = "/home/${username}";
  home.stateVersion = "26.05";

  home.file = mkHomeDotsLinks;
}
