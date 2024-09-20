#!/bin/bash

REMOTE_NAME="${1:-origin}"

COLOR_ERROR='\033[0;31m'
COLOR_SUCCESS='\033[0;32m'
COLOR_WARM='\033[1;33m'
COLOR_RESET='\033[0m'

count_deleted=0
count_skipped=0

# Obtener la rama actual
current_branch=$(git branch --show-current)

if ! git remote get-url "$REMOTE_NAME" &>/dev/null; then
    echo -e "${COLOR_ERROR}[-]${COLOR_RESET} Remote '$REMOTE_NAME' does not exist."
    echo -e "\nPress any key to exit..."
    read -n1 -s
    exit 1
fi

# Listar todas las ramas locales que coincidan con el remoto
for local_branch in $(git branch --format="%(refname:short)"); do
    # Verificar si la rama local está en el remoto
    if git show-ref --verify --quiet "refs/remotes/$REMOTE_NAME/$local_branch"; then
        # No eliminar la rama actual
        if [[ "$local_branch" == "$current_branch" ]]; then
            echo -e "${COLOR_ERROR}[-]${COLOR_RESET} Skipping current branch '$local_branch'..."
            ((count_skipped++))
        else
            echo -e "${COLOR_SUCCESS}[+]${COLOR_RESET} Deleting local branch '$local_branch'..."
            git branch -D "$local_branch"
            ((count_deleted++))
        fi
    fi
done

echo -e "\n\nSummary:"
echo -e "Total branches processed: ${COLOR_WARM}$((count_deleted + count_skipped))${COLOR_RESET}"
echo -e "Total branches skipped (current branch): ${COLOR_ERROR}$count_skipped${COLOR_RESET}"
echo -e "Total branches deleted: ${COLOR_SUCCESS}$count_deleted${COLOR_RESET}"

echo -e "\nPress any key to exit..."
read -n1 -s