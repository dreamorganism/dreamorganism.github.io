let
  sources = import ./nix/sources.nix;
  pkgs = import sources.nixpkgs {};
in

pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs-14_x
    pkgs.yarn
    pkgs.sass
  ];
}
