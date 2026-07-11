{ pkgs, ... }:
{
  environment.systemPackages =
    with pkgs;
    [
      # Зависимости для сборки UE5
      clang
      cmake
      ninja
      python3
      mono
      dotnet-sdk_8
      git
      lld
      libunwind
      libxml2
      openssl
      SDL2

      libGL
      vulkan-loader
      vulkan-headers
      mesa
      zlib
      curl
      icu

    ]
    ++ (with pkgs.xorg; [
      libX11
      libXext
      libXcursor
      libXrandr
      libXinerama
      libXi
      libXfixes
      libxcb
    ]);
}
