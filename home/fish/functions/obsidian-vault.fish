# Создаёт или подключает vault: копирует настройки и плагины из образца.
# Образец: ~/.config/obsidian-template/.obsidian (вне vault-ов, чтобы не удалить случайно).
# Копия независимая: правки в vault не меняют образец, и наоборот.
function obsidian-vault --description 'Copy Obsidian settings and plugins from the template vault'
    if test (count $argv) -ne 1
        echo "usage: obsidian-vault <vault-dir>" >&2
        return 1
    end
    set -l src ~/.config/obsidian-template/.obsidian
    if not test -d $src
        echo "нет образца: $src" >&2
        return 1
    end
    set -l cfg (path resolve -- $argv[1])/.obsidian
    mkdir -p $cfg; or return 1

    for item in $src/*
        set -l name (path basename -- $item)
        # раскладка окон своя у каждого vault
        test $name = workspace.json; and continue
        set -l dst $cfg/$name
        if test -L $dst
            # старый симлинк (на ~/nixos-config) — заменяем копией
            rm $dst; or return 1
        else if test -e $dst
            echo "skip: $dst уже есть" >&2
            continue
        end
        cp -r $item $dst; and echo "copy: $dst"
    end
end
