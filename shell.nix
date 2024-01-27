{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell rec {
  buildInputs = with pkgs; [nodejs_21];
  LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath buildInputs;
}
