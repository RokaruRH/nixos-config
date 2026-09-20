final: prev: {
  opencode = prev.opencode.overrideAttrs (finalAttrs: previousAttrs: {
    version = "1.18.29";

    src = final.fetchFromGitHub {
      owner = "anomalyco";
      repo = "opencode";
      tag = "v${finalAttrs.version}";
      hash = final.lib.fakeHash;
    };

    passthru = previousAttrs.passthru // {
      node_modules = previousAttrs.passthru.node_modules.overrideAttrs (_: {
        inherit (finalAttrs) version src;
        outputHash = final.lib.fakeHash;
      });
    };
  });
}
