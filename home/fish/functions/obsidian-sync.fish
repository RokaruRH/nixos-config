# Синхронизирует плагины из образца во все vault'ы из ~/.config/obsidian/obsidian.json.
# Образец: ~/.config/obsidian-template/.obsidian
# Копирует только код плагинов; data.json (настройки плагина) в vault не трогает.
# Ставит недостающие плагины, обновляет устаревшие (по version в manifest.json),
# дописывает их в community-plugins.json. Ничего не удаляет и не понижает версии.
# Запускается из ярлыка Obsidian перед стартом (~/.local/share/applications/md.obsidian.Obsidian.desktop).
function obsidian-sync --description 'Sync Obsidian plugins from the template into all vaults'
    set -l tpl ~/.config/obsidian-template/.obsidian
    set -l reg ~/.config/obsidian/obsidian.json
    if not test -d $tpl/plugins; or not test -f $reg
        echo "obsidian-sync: нет $tpl/plugins или $reg" >&2
        return 1
    end
    # Obsidian уже открыт — не трогаем файлы под работающей программой
    if pgrep -f 'obsidian/app.asar' >/dev/null
        echo "obsidian-sync: Obsidian запущен, пропуск" >&2
        return 0
    end

    for vault in (jq -r '.vaults[].path' $reg)
        set -l cfg $vault/.obsidian
        test -d $cfg; or continue

        # старые симлинки на ~/nixos-config/home/obsidian → обычные копии, чтобы не писать в nixos-config
        for item in plugins community-plugins.json
            if test -L $cfg/$item
                set -l target (readlink -f $cfg/$item)
                rm $cfg/$item; or return 1
                test -e "$target"; and cp -r $target $cfg/$item
                echo "unlink: $cfg/$item"
            end
        end
        mkdir -p $cfg/plugins

        for src in $tpl/plugins/*/
            set -l id (path basename -- $src)
            set -l dst $cfg/plugins/$id
            test -f $src/manifest.json; or continue

            if test -d $dst
                set -l new (jq -r .version $src/manifest.json)
                set -l old (jq -r .version $dst/manifest.json 2>/dev/null)
                # одинаковая версия или в vault новее — пропуск
                test "$new" = "$old"; and continue
                test -n "$old"; and test (printf '%s\n' $old $new | sort -V | tail -n1) = "$old"; and continue
                for f in $src/*
                    test -f $f; or continue
                    test (path basename -- $f) = data.json; and continue
                    cp $f $dst/
                end
                echo "update: $id $old -> $new ($vault)"
            else
                # новый плагин: целиком, вместе с настройками образца
                cp -r $src $dst
                echo "install: $id ($vault)"
            end
        end

        # включить плагины образца, сохранив порядок и лишние плагины vault'а
        set -l list $cfg/community-plugins.json
        test -f $list; or echo '[]' >$list
        set -l merged (jq -c --slurpfile t $tpl/community-plugins.json '. + ($t[0] - .)' $list)
        or continue
        if test "$merged" != (jq -c . $list)
            echo $merged | jq . >$list.tmp; and mv $list.tmp $list
            echo "enable: $list"
        end
    end
end
