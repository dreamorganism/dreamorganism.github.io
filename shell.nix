let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs {};

  neovim-remote = pkgs.vimUtils.buildVimPluginFrom2Nix rec {
    pname = "scattered";
    version = "38a550b";
    src = pkgs.fetchFromGitHub {
      owner = "carlmjohnson";
      repo = pname;
      rev = version;
      sha256 = "0nd8xh9lhfwg2f1lm436bryk8g2frifk2p7qcci2s5bnyvg5am9b";
    };
  };

in

pkgs.mkShell {
  buildInputs = [
    pkgs.hugo
    pkgs.go-task
    pkgs.yarn
  ];
}
