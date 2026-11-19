# Приложения из GitHub Releases (pkgs/github-apps).
# Обновить до свежих стабильных релизов: ~/nixos-config/pkgs/github-apps/update.sh
{ pkgs, lib, ... }:
let
  apps = import ../pkgs/github-apps { inherit pkgs lib; };
in
{
  environment.systemPackages = builtins.attrValues apps;
}
