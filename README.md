
# Passos para configurar o servidor

1. ssh -i tutorial-cd firminodefaria@34.68.183.215\
2. npm install -g pm2 \
3. mkdir projeto-teste\
4. git init --bare ~/projeto-teste.git\
5. Configure projeto-teste.git/hooks/post-receive

```bash

TARGET="/home/firminodefaria/projeto-teste"
GIT_DIR="/home/firminodefaria/projeto-teste.git"
BRANCH="dev"

cd $TARGET
git --work-tree=$TARGET --git-dir=$GIT_DIR checkout -f $BRANCH

echo 'post-receive: npm install�~@�'
npm -v\
npm install \
&& echo 'pm2 deleting projeto-teste' \
&& (pm2 delete 'projeto-teste' || true) \
&& echo 'pm2 starting projeto-teste' \
&& pm2 start npm --name 'projeto-teste' -- start \
&& echo �~@~Xpost-receive: app started successfully with pm2.


6. Adicione sua chave caso não seja a default `ssh-add tutorial-cd`
7. Adicioner o servidor como remote `git remote add deploy firminodefaria@34.68.183.215:/home/firminodefaria/projeto-teste.git`
8. Faça o deploy no servidor `git push deploy dev`



```

# Passos para configurar o github actions
