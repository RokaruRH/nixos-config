if status is-interactive
  # Commands to run in interactive sessions can go here
end

alias ls="eza --all --icons -l --no-user -o"

alias zed="zeditor"
set -gx EDITOR "zeditor --wait"

starship init fish | source
zoxide init fish | source
