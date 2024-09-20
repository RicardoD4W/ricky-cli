#!/bin/bash

REMOTE_NAME="${1:-origin}"

COLOR_ERROR='\033[0;31m'
COLOR_SUCCESS='\033[0;32m'
COLOR_WARM='\033[1;33m'
COLOR_RESET='\033[0m'

count_created=0
count_existing=0

if ! git remote get-url "$REMOTE_NAME" &>/dev/null; then
    echo -e "${COLOR_ERROR}[-]${COLOR_RESET} Remote '$REMOTE_NAME' does not exist."
    echo -e "\nPress any key to exit..."
    read -n1 -s
    exit 1
fi

for branch in $(git branch -r | grep "$REMOTE_NAME" | grep -v '\->'); do
    
    local_branch=${branch#"$REMOTE_NAME/"}
    
    if git show-ref --verify --quiet refs/heads/$local_branch; then
        echo -e "${COLOR_ERROR}[-]${COLOR_RESET} The local branch '$local_branch' alredy exists, skipping..."
        ((count_existing++))
    else
        echo -e "${COLOR_SUCCESS}[+]${COLOR_RESET} Creating local branch '$local_branch' from remote branch '$branch'"
        git branch --track $local_branch $branch
        ((count_created++))
    fi
done

echo -e "\n\nSummary:"
echo -e "Total branches: ${COLOR_WARM}$((count_created + count_existing))${COLOR_RESET}"
echo -e "Total existing branches: ${COLOR_ERROR}$count_existing${COLOR_RESET}"
echo -e "Total branch created: ${COLOR_SUCCESS}$count_created${COLOR_RESET}"

echo -e "\nPress any key to exit..."
read -n1 -s