#!/usr/bin/env bash
set -euo pipefail
TOOLS_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
UE_WORKSPACE=$(dirname -- "$TOOLS_DIR")
UE_ROOT="$UE_WORKSPACE/UE-5.7.4"
UE_CACHE="$UE_WORKSPACE/UE-cache"
UE_LOGS="$TOOLS_DIR/logs"
UE_RUNTIME=${UE_RUNTIME:-native}
MIN_FREE_KIB=20971520
run_ue() {
    "$TOOLS_DIR/fix-shell-shebangs.sh" "$UE_ROOT" "$TOOLS_DIR/shell-script-backups"
    case "$UE_RUNTIME" in
        native) exec "$TOOLS_DIR/native-runtime.sh" "$@" ;;
        steam) exec "$TOOLS_DIR/native-runtime.sh" steam-run "$@" ;;
        *) echo 'UE_RUNTIME должен быть native или steam.' >&2; exit 2 ;;
    esac
}
check_space() {
    local available
    available=$(df -Pk "$UE_WORKSPACE" | awk 'NR==2 {print $4}')
    if (( available < MIN_FREE_KIB )); then
        echo 'Недостаточно места: требуется минимум 20 ГиБ свободного пространства.' >&2
        exit 1
    fi
}
usage() {
    echo 'Использование: ue.sh doctor | launch [Project.uproject] | build Project.uproject EditorTarget | clangdb Project.uproject EditorTarget | zed Project.uproject'
}
mode=${1:-doctor}
shift || true
case "$mode" in
    doctor)
        df -h "$UE_WORKSPACE"
        free -h
        for file in Engine/Binaries/Linux/UnrealEditor Engine/Build/InstalledBuild.txt Engine/Build/BatchFiles/Linux/Build.sh; do
            if [[ -f "$UE_ROOT/$file" ]]; then echo "OK: $file"; else echo "Отсутствует: $file"; fi
        done
        command -v steam-run || true
        command -v zeditor || true
        ;;
    launch)
        check_space
        [[ -f "$UE_ROOT/.extraction-complete" ]] || { echo 'Распаковка ещё не завершена.' >&2; exit 1; }
        [[ -x "$UE_ROOT/Engine/Binaries/Linux/UnrealEditor" ]] || { echo 'Распаковка не завершена или UnrealEditor отсутствует.' >&2; exit 1; }
        mkdir -p "$UE_CACHE" "$UE_LOGS"
        export UE_LocalDataCachePath="$UE_CACHE"
        # UE 5.7's native Wayland backend loses mouse clicks. Scope X11 to UE.
        export SDL_VIDEO_DRIVER=x11
        export SDL_VIDEODRIVER=x11
        ulimit -c 0
        graphics_args=()
        startup_commands='Slate.EnableTooltips 0,t.MaxFPS 30'
        if [[ "${UE_LOW_SPEC:-1}" == 1 ]]; then
            # Ryzen 5 5600G / integrated Vega: use the lighter desktop renderer.
            graphics_args+=('-sm5')
            graphics_args+=('-ini:Engine:[/Script/Engine.RendererSettings]:r.DynamicGlobalIlluminationMethod=0,r.ReflectionMethod=0,r.RayTracing=False,r.RayTracing.RayTracingProxies.ProjectEnabled=False,r.Shadow.Virtual.Enable=0,r.Nanite.ProjectEnabled=False,r.GenerateMeshDistanceFields=False')
            startup_commands+=',sg.ViewDistanceQuality 0,sg.AntiAliasingQuality 0,sg.ShadowQuality 0,sg.GlobalIlluminationQuality 0,sg.ReflectionQuality 0,sg.PostProcessQuality 0,sg.TextureQuality 0,sg.EffectsQuality 0,sg.FoliageQuality 0,sg.ShadingQuality 0'
        fi
        graphics_args+=("-ExecCmds=$startup_commands")
        run_ue "$UE_ROOT/Engine/Binaries/Linux/UnrealEditor" "$@" \
            "${graphics_args[@]}" \
            "-LocalDataCachePath=$UE_CACHE" \
            "-ini:Engine:[VirtualTextureChunkDDCCache]:Path=$UE_CACHE/VT" \
            "-abslog=$UE_LOGS/UnrealEditor.log" \
            '-ini:Engine:[DevOptions.Shaders]:NumUnusedShaderCompilingThreads=10,NumUnusedShaderCompilingThreadsDuringGame=10,ShaderCompilerCoreCountThreshold=128' \
            '-ini:EditorSettings:[/Script/SourceCodeAccess.SourceCodeAccessSettings]:PreferredAccessor=Zed'
        ;;
    build|clangdb)
        [[ $# -eq 2 ]] || { usage; exit 2; }
        project=$(realpath -e -- "$1")
        target=$2
        [[ "$project" == *.uproject ]] || { echo 'Нужен файл .uproject.' >&2; exit 2; }
        [[ "$target" =~ ^[A-Za-z0-9_]+Editor$ ]] || { echo 'Укажи Editor target из Source/*.Target.cs.' >&2; exit 2; }
        check_space
        ulimit -c 0
        if [[ "$mode" == build ]]; then
            run_ue bash "$UE_ROOT/Engine/Build/BatchFiles/Linux/Build.sh" \
                "$target" Linux Development "-Project=$project" -MaxParallelActions=2
        else
            run_ue bash "$UE_ROOT/Engine/Build/BatchFiles/RunUBT.sh" \
                -Mode=GenerateClangDatabase "$target" Linux Development \
                "-Project=$project" "-OutputDir=$(dirname -- "$project")"
        fi
        ;;
    zed)
        [[ $# -eq 1 ]] || { usage; exit 2; }
        project=$(realpath -e -- "$1")
        exec zeditor "$(dirname -- "$project")"
        ;;
    *) usage; exit 2 ;;
esac
