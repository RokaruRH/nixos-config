final: prev: {
  opencode = prev.opencode.overrideAttrs (finalAttrs: previousAttrs: rec {
    version = "1.18.29";

    src = prev.fetchFromGitHub {
      owner = "anomalyco";
      repo = "opencode";
      tag = "v${version}";
      hash = ""; # <-- сюда впишешь хеш после первого прогона (см. ниже)
    };

    # node_modules внутри opencode — это своя fixed-output derivation
    # (bun install), её тоже нужно пересобрать под новую версию/src
    node_modules = previousAttrs.node_modules.overrideAttrs (_: {
      inherit version src;
      outputHash = ""; # <-- аналогично, второй хеш
    });
  });
}
