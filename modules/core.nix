{ ... }:
{
  system.stateVersion = "25.11";

  nix.settings.experimental-features = [
    "nix-command"
    "flakes"
  ];

  boot.loader.systemd-boot.enable = true;
  boot.loader.efi.canTouchEfiVariables = true;

  security.rtkit.enable = true;

  services.xserver.enable = true;
  services.pulseaudio.enable = false;
  services.pipewire = {
    enable = true;
    alsa.enable = true;
    alsa.support32Bit = true;
    pulse.enable = true;
    jack.enable = true;
  };

  nixpkgs.config.allowUnfree = true;

  time.timeZone = "Asia/Yerevan";
  i18n.defaultLocale = "en_US.UTF-8";
  i18n.extraLocaleSettings = {
    LC_ADDRESS = "hy_AM";
    LC_IDENTIFICATION = "hy_AM";
    LC_MEASUREMENT = "hy_AM";
    LC_MONETARY = "hy_AM";
    LC_NAME = "hy_AM";
    LC_NUMERIC = "hy_AM";
    LC_PAPER = "hy_AM";
    LC_TELEPHONE = "hy_AM";
    LC_TIME = "hy_AM";
  };
}
