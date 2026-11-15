# Подключает vault к эталонным плагинам Obsidian через симлинки.
# Эталон: ~/nixos-config/home/obsidian (plugins/ + community-plugins.json)
function obsidian-vault --description 'Create or attach an Obsidian vault to the shared plugin base'
    if test (count $argv) -ne 1
        echo "usage: obsidian-vault <vault-dir>" >&2
        return 1
    end
    set -l base ~/nixos-config/home/obsidian
    set -l cfg (path resolve -- $argv[1])/.obsidian
    mkdir -p $cfg; or return 1

    for item in plugins community-plugins.json
        set -l dst $cfg/$item
        if test -L $dst
            echo "ok:   $dst -> "(readlink $dst)
        else if test -e $dst
            echo "skip: $dst уже есть (не симлинк) — перенеси/удали его и запусти снова" >&2
        else
            ln -s $base/$item $dst; and echo "link: $dst -> $base/$item"
        end
    end
end
