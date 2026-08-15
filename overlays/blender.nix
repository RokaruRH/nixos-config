final: prev: {
  blender = prev.blender.overrideAttrs (_: {
    version = "5.2.0";

    src = prev.fetchurl {
      url = "https://download.blender.org/release/Blender5.2/blender-5.2.0-linux-x64.tar.xz";
      hash = "sha256-lvbBgaMPSVBgeDnchNQqNUslDYoCMbCYtZt7xpw1HEg=";
    };
  });
}
