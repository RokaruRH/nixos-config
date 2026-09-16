{
  pkgs,
  ...
}:
let
  ueRoot = "/home/rokaru/Unreal/UE_5.7.4";

  # FHS-окружение для prebuilt-редактора Epic (набор Steam + недостающие libs).
  unrealFHS = (pkgs.steam.override {
    extraLibraries =
      p:
      (with p; [
        nss
        nspr
        at-spi2-core
        xorg.libXcomposite
      ]);
  }).run;

  unrealEditor = pkgs.writeShellScriptBin "unreal-editor" ''
    exec ${unrealFHS}/bin/steam-run ${ueRoot}/Engine/Binaries/Linux/UnrealEditor "$@"
  '';

  unrealDesktop = pkgs.makeDesktopItem {
    name = "unreal-editor";
    desktopName = "Unreal Engine 5.7.4";
    genericName = "Unreal Editor";
    comment = "Unreal Engine 5.7.4 Editor";
    exec = "unreal-editor %F";
    icon = "${ueRoot}/Engine/Source/Runtime/Launch/Resources/Linux/UnrealEngine.png";
    terminal = false;
    categories = [
      "Development"
      "IDE"
      "Graphics"
    ];
    startupNotify = true;
    startupWMClass = "UnrealEditor";
  };
in
{
  environment.systemPackages = [
    unrealEditor
    unrealDesktop
  ];
}
