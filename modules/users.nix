{ pkgs, username, ... }:
{
  users.users.${username} = {
    isNormalUser = true;
    description = "Mher";
    extraGroups = [
      "networkmanager"
      "wheel"
    ];
    shell = pkgs.fish;
  };

  programs.fish.enable = true;
}
