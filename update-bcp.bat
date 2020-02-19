@echo off
git remote add bcp https://github.com/boxcritters/boxcritters-coder-pack.git
git fetch bcp
git merge --no-ff --allow-unrelated-histories bcp/dev
pause